import type { InputHTMLAttributes } from "react";

// Figma InputField (2168:1108): 한 줄 입력 박스
// focus(입력 중)는 CSS :focus, active(값이 채워짐)는 입력한 글자색으로 표현한다.
type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  type = "text",
  className,
  ...props
}: InputFieldProps) {
  return (
    <input
      type={type}
      className={[
        "h-45 w-full rounded-control border border-border-subtle bg-surface-default px-stack-md py-control-x",
        "text-body-lg text-text-primary placeholder:text-text-disabled",
        "focus:border-action-primary focus:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
