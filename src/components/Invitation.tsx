import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";

// 초대장 내용(커버 · 본문 · 일시/장소 카드)
// Figma /i/[id] (2168:923)와 /create 미리보기에서 같은 구성으로 쓴다.
type InvitationProps = {
  title: string;
  date: string;
  place: string;
  body: string;
};

export default function Invitation({ title, date, place, body }: InvitationProps) {
  return (
    <>
      <InvitationCover title={title} date={date} place={place} />
      <div className="flex flex-col items-center gap-stack-md bg-surface-default px-page-horizontal py-cover-inset">
        <Image type="flag" alt="" />
        {/* Figma의 빈 SectionHeader 자리(높이 20px)를 그대로 비워 둔다. */}
        <div aria-hidden="true" className="h-20" />
        {/* 입력한 줄바꿈을 그대로 보여준다. */}
        <p className="w-full whitespace-pre-wrap break-words text-center text-body-compact text-text-primary">
          {body}
        </p>
      </div>
      <div className="bg-surface-default px-page-horizontal pb-section-lg pt-stack-lg">
        <div className="flex flex-col gap-control-compact rounded-card bg-surface-subtle p-page-horizontal">
          <InfoRow label="일시" value={date} />
          <InfoRow label="장소" value={place} />
        </div>
      </div>
    </>
  );
}
