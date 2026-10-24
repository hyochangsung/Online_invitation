"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import Input from "@/components/Input";
import Invitation from "@/components/Invitation";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";
import { createInvitation } from "@/lib/actions";
import { formatDate, kstDateToIso } from "@/lib/format";

// Figma /create (2168:886) · 발행 완료 (2168:910)
// 입력한 값을 미리보기에 그대로 보여주고, 발행하면 Supabase에 저장한 뒤
// 같은 화면이 발행 완료 상태로 바뀐다.
// 저장 중·실패 표시는 디자인이 없어 임시로 최소한만 보여준다.
export default function CreateForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  // 날짜 선택 칸 값. 예: "2026-11-14"
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [body, setBody] = useState("");
  // 발행하면 링크 경로와 주소(사이트 주소 포함)를 담는다. 발행 전에는 null이다.
  const [links, setLinks] = useState<{ path: string; invitation: string; responses: string } | null>(null);
  const [error, setError] = useState("");
  // isPending: 저장 요청을 보내고 결과를 기다리는 중이면 true
  const [isPending, startTransition] = useTransition();

  const canPublish = [title, date, place, body].every((value) => value.trim() !== "") && !isPending;

  function publish() {
    if (!canPublish) return;
    setError("");
    startTransition(async () => {
      const result = await createInvitation({ title, date, place, body });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      const invitationPath = `/i/${result.data.id}`;
      setLinks({
        path: invitationPath,
        invitation: `${window.location.origin}${invitationPath}`,
        responses: `${window.location.origin}${invitationPath}/responses`,
      });
      window.scrollTo(0, 0);
    });
  }

  if (links) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-375 flex-col gap-page-horizontal bg-surface-default">
        <NavBar title="발행 완료" />
        <main className="flex flex-col gap-section-lg px-page-horizontal pb-cover-inset">
          <div className="flex flex-col items-center gap-stack-sm py-stack-lg text-center" role="status">
            <SuccessIcon />
            <p className="text-title-lg text-text-strong">초대장이 발행됐어요!</p>
            <p className="text-body-md text-text-secondary">아래 두 링크를 복사해 두세요.</p>
          </div>
          <CopyLinkField
            title="초대장 링크"
            url={links.invitation}
            description="게스트에게 공유하는 링크예요."
          />
          <CopyLinkField
            title="응답 현황 링크"
            url={links.responses}
            description="호스트용이에요. 이 링크를 아는 사람은 응답 목록을 볼 수 있어요."
          />
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push(links.path)}
          >
            내 초대장 보기
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-375 flex-col gap-control-compact bg-surface-default">
      <NavBar title="초대장 만들기" />

      {/* pb-120: 하단에 고정된 발행 버튼 영역에 내용이 가려지지 않도록 비워둔다. */}
      <main className="flex flex-col gap-section-lg px-page-horizontal pb-120">
        <form
          className="flex flex-col gap-stack-lg"
          onSubmit={(event) => event.preventDefault()}
        >
          <Textarea
            id="title"
            label="제목"
            rows={2}
            required
            value={title}
            // 제목은 최대 2줄까지만 받는다.
            onChange={(event) => setTitle(event.target.value.split("\n").slice(0, 2).join("\n"))}
            placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"}
            helper="엔터로 줄을 나눌 수 있어요 · 최대 2줄"
          />
          <Input
            id="date"
            label="일시"
            type="date"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Input
            id="place"
            label="장소"
            required
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            placeholder="예) 세종 남극 기지"
          />
          <Textarea
            id="body"
            label="본문"
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="게스트에게 전할 초대 글을 적어주세요"
          />
        </form>

        <section className="flex flex-col gap-inline-md" aria-labelledby="preview-label">
          <Label id="preview-label">미리보기</Label>
          {/* 미리보기는 정해진 높이 안에서 스크롤된다. */}
          <div className="h-460 overflow-y-auto rounded-control border border-border-subtle">
            <Invitation
              title={title}
              date={date ? formatDate(kstDateToIso(date)) : ""}
              place={place}
              body={body}
            />
          </div>
          <p className="text-caption-md text-text-tertiary">
            입력하는 내용이 바로 미리보기에 반영돼요.
          </p>
        </section>
      </main>

      {/* 발행하기 버튼은 화면 하단에 고정한다. */}
      <div className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-375 flex-col gap-inline-md bg-surface-default p-page-horizontal">
        {error && (
          <p role="alert" className="text-center text-caption-md text-feedback-error">
            {error}
          </p>
        )}
        <Button size="lg" className="w-full" disabled={!canPublish} onClick={publish}>
          {isPending ? "발행하는 중…" : "발행하기"}
        </Button>
      </div>
    </div>
  );
}
