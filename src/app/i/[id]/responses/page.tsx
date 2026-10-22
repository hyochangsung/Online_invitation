import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import ResponseRow from "@/components/ResponseRow";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { formatDateTime, formatShortDateTime } from "@/lib/format";
import { findMockInvitation, mockRsvps } from "@/lib/mock";
import { summarizeRsvps } from "@/lib/rsvp";
import CopyInviteButton from "./CopyInviteButton";

export const metadata: Metadata = {
  title: "응답 현황",
};

// Figma /i/[id]/responses (2168:871): 호스트가 보는 응답 현황
// 아직 Supabase가 연결되지 않아 src/lib/mock.ts의 가짜 응답을 보여준다.
// ⚠️ 임시로 접근 제한이 없다. 실제 데이터를 연결할 때는 반드시
//    서버에서 호스트 비밀 관리 링크를 검증한 뒤에만 응답을 보여줘야 한다.
export default async function ResponsesPage({ params }: PageProps<"/i/[id]/responses">) {
  const { id } = await params;
  const invitation = findMockInvitation(id);

  if (!invitation) {
    notFound();
  }

  const rsvps = mockRsvps
    .filter((rsvp) => rsvp.invitationId === id)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const { attending, notAttending, headcount } = summarizeRsvps(rsvps);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-375 flex-col gap-page-horizontal bg-surface-default">
      <NavBar title="응답 현황" />

      <main className="flex flex-col gap-section-lg px-page-horizontal pb-cover-inset">
        <SectionHeader
          subtitle="Responses"
          title={invitation.title}
          description={`${formatDateTime(invitation.startsAt)} · ${invitation.place}`}
        />

        <div className="flex gap-inline-md">
          <StatCard className="min-w-0 flex-1" label="참석" value={`${attending}명`} />
          <StatCard className="min-w-0 flex-1" label="불참" value={`${notAttending}명`} />
          <StatCard
            className="min-w-0 flex-1"
            label="참석 인원 합계"
            value={`${headcount}명`}
            highlight
          />
        </div>

        <p className="text-caption-md text-text-tertiary">
          참석 인원 합계 = 참석한 사람 + 동반 인원
        </p>

        <section className="flex flex-col gap-inline-md">
          <h2 className="text-heading-md text-text-strong">응답 목록</h2>
          {rsvps.length === 0 ? (
            <EmptyState
              title="아직 응답이 없어요"
              description="초대장 링크를 공유하면 응답이 여기에 쌓여요."
            />
          ) : (
            <ul className="flex flex-col gap-inline-md">
              {rsvps.map((rsvp) => (
                <ResponseRow
                  key={rsvp.id}
                  name={rsvp.name}
                  status={rsvp.status}
                  companions={rsvp.companions}
                  respondedAt={formatShortDateTime(rsvp.createdAt)}
                />
              ))}
            </ul>
          )}
        </section>

        <CopyInviteButton invitationId={id} />
      </main>
    </div>
  );
}
