import type { TextareaHTMLAttributes } from "react";

// Figma TextareaField (2168:1067): 여러 줄 입력 박스
// focus(입력 중)는 CSS :focus, active(값이 채워짐)는 입력한 글자색으로 표현한다.
type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

// className을 주지 않으면 Figma 기본 높이(45px)를 쓴다. Textarea는 rows에 맞는 높이를 넘긴다.
export default function TextareaField({
  className = "h-45",
  ...props
}: TextareaFieldProps) {
  return (
    <textarea
      className={[
        "w-full resize-none rounded-control border border-border-subtle bg-surface-default px-stack-md py-control-x",
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
