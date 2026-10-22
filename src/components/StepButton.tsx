import type { ButtonHTMLAttributes } from "react";
import IconMinus from "@/components/IconMinus";
import IconPlus from "@/components/IconPlus";

// Figma StepButton (2168:1020): Stepper의 −/+ 버튼
// 더 못 줄이면 disabled로 바꾼다.
type StepButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: "minus" | "plus";
};

export default function StepButton({
  icon,
  disabled = false,
  type = "button",
  className,
  ...props
}: StepButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "flex size-44 shrink-0 items-center justify-center rounded-control border border-border-default bg-surface-default",
        "disabled:cursor-not-allowed",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon === "minus" ? (
        <IconMinus className="size-20" disabled={disabled} />
      ) : (
        <IconPlus className="size-20" />
      )}
    </button>
  );
}
