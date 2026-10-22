import Image from "@/components/Image";
import SectionHeader from "@/components/SectionHeader";

// Figma InvitationCover (2168:982): 초대장 상단 커버(대표 이미지 + 제목)
// /create 미리보기와 /i/[id]에서 같은 컴포넌트를 쓴다.
type InvitationCoverProps = {
  title: string;
  date: string;
  place: string;
};

// Figma 디자인의 고정 문구 (입력 칸 없음)
const SUBTITLE = "Huddling Club 2nd Meetup";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-inline-md">
      <span className="rounded-control bg-info-subtle px-inline-compact py-inline-xs text-caption-md font-semibold text-info-strong">
        {label}
      </span>
      <p className="w-full break-words text-center text-label-md text-text-inverse">
        {value}
      </p>
    </div>
  );
}

export default function InvitationCover({ title, date, place }: InvitationCoverProps) {
  return (
    <div className="flex w-full flex-col items-center gap-page-horizontal bg-linear-to-b from-cover-gradient-start to-cover-gradient-end px-page-horizontal py-cover-inset">
      <SectionHeader subtitle={SUBTITLE} title={title} tone="inverse" />
      <Image type="character" alt="" />
      <Detail label="일시" value={date} />
      <Detail label="장소" value={place} />
    </div>
  );
}
