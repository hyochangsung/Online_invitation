// Figma StatCard (2168:993): 응답 현황 숫자 카드
// highlight는 강조할 합계(참석 인원 합계)에만 쓴다.
type StatCardProps = {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
};

export default function StatCard({
  label,
  value,
  highlight = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-inline-sm rounded-card px-control-x py-stack-md",
        highlight ? "bg-info-subtle" : "bg-surface-subtle",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-caption-md text-text-secondary">{label}</span>
      <span
        className={[
          "text-title-lg",
          highlight ? "text-info-strong" : "text-text-strong",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}
