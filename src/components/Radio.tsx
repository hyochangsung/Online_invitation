import type { InputHTMLAttributes } from "react";

// Figma Radio (2168:1079)
// selected는 HTML checked, disabled는 HTML disabled 속성으로 표현한다.
// 바깥 48px 영역은 손가락으로 누르기 쉬운 크기다.
type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Radio({ className, ...props }: RadioProps) {
  return (
    <span className="inline-flex size-48 shrink-0 items-center justify-center">
      <input
        type="radio"
        className={[
          "size-20 appearance-none rounded-pill border-2 border-text-tertiary bg-surface-default",
          "checked:border-6 checked:border-action-primary",
          "disabled:cursor-not-allowed disabled:border-text-disabled",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </span>
  );
}
