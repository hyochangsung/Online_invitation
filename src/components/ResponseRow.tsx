import AttendanceBadge from "@/components/AttendanceBadge";

// Figma ResponseRow/true (2168:977): 응답 현황 목록 한 줄
// name + meta(동반 인원 · 응답 시각) + 참석 여부 배지
// 불참이면 meta에 동반 인원을 넣지 않는다.
type ResponseRowProps = {
  name: string;
  status: "yes" | "no";
  companions: number;
  respondedAt: string; // 화면에 보여줄 응답 시각 글자
};

export default function ResponseRow({
  name,
  status,
  companions,
  respondedAt,
}: ResponseRowProps) {
  const meta = status === "yes" ? `동반 ${companions}명 · ${respondedAt}` : respondedAt;

  return (
    <li className="flex min-h-78 items-center gap-stack-sm rounded-card border border-border-subtle bg-surface-default p-stack-md">
      <div className="flex min-w-0 flex-1 flex-col gap-inline-sm">
        <p className="truncate text-label-lg text-text-primary">{name}</p>
        <p className="text-caption-md text-text-tertiary">{meta}</p>
      </div>
      <AttendanceBadge status={status} />
    </li>
  );
}
