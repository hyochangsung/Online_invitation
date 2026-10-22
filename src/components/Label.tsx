import type { LabelHTMLAttributes } from "react";

// Figma Label (2168:1076): 입력 필드 위 라벨. required면 "필수" 표시가 붙는다.
type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export default function Label({
  required = false,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={["flex items-center gap-inline-sm", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="text-label-lg text-text-strong">{children}</span>
      {required && (
        <span className="text-caption-md text-feedback-error">필수</span>
      )}
    </label>
  );
}
