import { notFound } from "next/navigation";
import Invitation from "@/components/Invitation";
import RSVPCard from "@/components/RSVPCard";
import { formatDate } from "@/lib/format";
import { getInvitation } from "@/lib/data";

// Figma /i/[id] (2168:923): 게스트가 보는 초대장 화면
// Supabase에서 초대장을 읽어 보여준다.
export default async function InvitationPage({ params }: PageProps<"/i/[id]">) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  if (!invitation) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-375 flex-col bg-surface-default">
      <Invitation
        title={invitation.title}
        date={formatDate(invitation.startsAt)}
        place={invitation.place}
        body={invitation.body}
      />
      <section className="bg-surface-subtle px-page-horizontal py-section-lg">
        <RSVPCard invitationId={invitation.id} />
      </section>
    </div>
  );
}
