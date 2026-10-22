import { notFound } from "next/navigation";
import Invitation from "@/components/Invitation";
import RSVPCard from "@/components/RSVPCard";
import { formatDateTime } from "@/lib/format";
import { findMockInvitation } from "@/lib/mock";

// Figma /i/[id] (2168:923): 게스트가 보는 초대장 화면
// 아직 Supabase가 연결되지 않아 src/lib/mock.ts의 가짜 초대장을 보여준다.
export default async function InvitationPage({ params }: PageProps<"/i/[id]">) {
  const { id } = await params;
  const invitation = findMockInvitation(id);

  if (!invitation) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-375 flex-col bg-surface-default">
      <Invitation
        title={invitation.title}
        date={formatDateTime(invitation.startsAt)}
        place={invitation.place}
        body={invitation.body}
      />
      <section className="bg-surface-subtle px-page-horizontal py-section-lg">
        <RSVPCard />
      </section>
    </div>
  );
}
