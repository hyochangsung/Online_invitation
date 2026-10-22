import type { InputHTMLAttributes } from "react";
import InputField from "@/components/InputField";
import Label from "@/components/Label";

// Figma Input (2168:1115): 라벨 + 한 줄 입력 박스 + 안내 문구
// 일시·장소·이름처럼 한 줄 값에 쓴다. 여러 줄은 Textarea를 쓴다.
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  helper?: string;
};

export default function Input({ id, label, helper, required, ...props }: InputProps) {
  const helperId = helper ? `${id}-helper` : undefined;

  return (
    <div className="flex w-full flex-col gap-inline-compact">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <InputField
        id={id}
        required={required}
        aria-describedby={helperId}
        {...props}
      />
      {helper && (
        <p id={helperId} className="text-caption-md text-text-tertiary">
          {helper}
        </p>
      )}
    </div>
  );
}
