// Figma AttendanceBadge (2168:972)
// status는 DB rsvps.status 값과 맞춘다. yes = 참석, no = 불참
type AttendanceBadgeProps = {
  status: "yes" | "no";
};

export default function AttendanceBadge({ status }: AttendanceBadgeProps) {
  const isYes = status === "yes";

  return (
    <span
      className={[
        "inline-flex rounded-pill px-control-compact py-inline-sm text-label-md",
        isYes
          ? "bg-info-subtle text-info-strong"
          : "bg-background-subtle text-text-secondary",
      ].join(" ")}
    >
      {isYes ? "참석" : "불참"}
    </span>
  );
}
