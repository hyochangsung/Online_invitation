"use client";

import { useState, useTransition } from "react";
import Button from "@/components/Button";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import Label from "@/components/Label";
import RadioOption from "@/components/RadioOption";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";
import { submitRsvp } from "@/lib/actions";

// Figma RSVPCard (2168:1029): /i/[id]의 참석 신청 카드
// 제출 전 form, Supabase에 저장되면 같은 자리에서 done 상태로 바뀐다.
// 저장 중·실패 표시는 디자인이 없어 임시로 최소한만 보여준다.
type Status = "yes" | "no";

export default function RSVPCard({ invitationId }: { invitationId: string }) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status | null>(null);
  const [companions, setCompanions] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");
  // isPending: 저장 요청을 보내고 결과를 기다리는 중이면 true
  const [isPending, startTransition] = useTransition();

  const canSubmit = name.trim() !== "" && status !== null && !isPending;

  if (isDone) {
    return (
      <div className="flex w-full flex-col gap-stack-lg rounded-card bg-surface-default px-page-horizontal py-stack-lg">
        <div className="flex flex-col items-center gap-stack-sm py-section-lg" role="status">
          <SuccessIcon />
          <p className="text-center text-title-lg text-text-strong">참석 여부를 보냈어요</p>
          <p className="text-center text-body-md text-text-secondary">
            호스트에게 응답이 전달됐어요.
          </p>
        </div>
        <div className="flex flex-col gap-inline-md rounded-card bg-surface-subtle p-stack-md">
          <InfoRow type="spread" label="이름" value={name.trim()} />
          <InfoRow type="spread" label="참석 여부" value={status === "yes" ? "참석" : "불참"} />
          <InfoRow type="spread" label="동반 인원" value={`${companions}명`} />
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-stack-lg rounded-card bg-surface-default px-page-horizontal py-stack-lg"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit) return;
        setError("");
        startTransition(async () => {
          const result = await submitRsvp({ invitationId, name, status, companions });
          if (!result.ok) {
            setError(result.message);
            return;
          }
          // 불참이면 동반 인원은 0명으로 본다. (서버도 0명으로 저장한다)
          if (status === "no") setCompanions(0);
          setIsDone(true);
        });
      }}
    >
      <div className="flex flex-col items-center gap-inline-compact text-center">
        <h2 className="text-heading-lg text-text-strong">참석 여부 알려주기</h2>
        <p className="text-body-md text-text-secondary">이름과 참석 여부를 남겨주세요.</p>
      </div>

      <div className="flex flex-col gap-stack-lg">
        <Input
          id="rsvp-name"
          label="이름"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="이름을 입력해주세요"
          autoComplete="name"
        />

        <div className="flex flex-col gap-inline-md">
          <Label id="rsvp-status-label" required>
            참석 여부
          </Label>
          <div role="radiogroup" aria-labelledby="rsvp-status-label" className="flex">
            <RadioOption
              className="flex-1"
              name="status"
              value="yes"
              label="참석"
              checked={status === "yes"}
              onChange={() => setStatus("yes")}
            />
            <RadioOption
              className="flex-1"
              name="status"
              value="no"
              label="불참"
              checked={status === "no"}
              onChange={() => setStatus("no")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-inline-md">
          <Label id="rsvp-companions-label" required>
            동반 인원
          </Label>
          <Stepper defaultValue={companions} onChange={setCompanions} />
          <p className="text-caption-md text-text-tertiary">
            본인을 제외하고 함께 오는 인원이에요.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-center text-caption-md text-feedback-error">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={!canSubmit}>
        {isPending ? "보내는 중…" : "참석 여부 보내기"}
      </Button>
    </form>
  );
}
