// Figma InfoRow (2168:1008): 초대장의 일시·장소 같은 라벨-값 한 줄
// type=inline은 붙여서, spread는 양끝 정렬로 보여준다.
type InfoRowProps = {
  label: string;
  value: string;
  type?: "inline" | "spread";
};

export default function InfoRow({ label, value, type = "inline" }: InfoRowProps) {
  if (type === "spread") {
    return (
      <div className="flex items-center gap-control-compact">
        <span className="whitespace-nowrap text-body-md text-text-secondary">
          {label}
        </span>
        <span className="min-w-0 flex-1 text-right text-label-md text-text-strong">
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-control-compact">
      <span className="whitespace-nowrap text-label-lg text-text-secondary">
        {label}
      </span>
      <span aria-hidden="true" className="h-14 w-1 shrink-0 bg-border-default" />
      <span className="text-label-lg text-text-strong">{value}</span>
    </div>
  );
}
