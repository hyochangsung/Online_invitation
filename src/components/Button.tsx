import type { ButtonHTMLAttributes } from "react";

// Figma Button (2168:1089)
// hover는 CSS :hover, disabled는 HTML disabled 속성으로 표현한다.
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "py-inline-sm gap-control-compact text-label-md bg-action-primary",
  // Figma 디자인대로 md만 기본 배경이 회색이다.
  md: "h-48 py-control-x gap-inline-compact text-label-md bg-text-secondary",
  lg: "h-52 py-inline-sm gap-control-compact text-label-lg bg-action-primary",
};

export default function Button({
  size = "sm",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center whitespace-nowrap rounded-control px-control-y text-center text-text-inverse",
        "enabled:hover:bg-action-hover-overlay",
        "disabled:cursor-not-allowed disabled:bg-border-subtle",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-accent",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
