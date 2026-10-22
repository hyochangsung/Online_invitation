import type { TextareaHTMLAttributes } from "react";
import Label from "@/components/Label";
import TextareaField from "@/components/TextareaField";

// Figma Textarea (2168:1058): 라벨 + 여러 줄 입력 박스 + 안내 문구
// rows=2는 제목(최대 2줄), rows=4는 본문에 쓴다.
type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
  id: string;
  label: string;
  rows?: 2 | 4;
  helper?: string;
};

const heightClasses = {
  2: "h-72",
  4: "h-120",
};

export default function Textarea({
  id,
  label,
  rows = 4,
  helper,
  required,
  ...props
}: TextareaProps) {
  const helperId = helper ? `${id}-helper` : undefined;

  return (
    <div className="flex w-full flex-col gap-inline-compact">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <TextareaField
        id={id}
        rows={rows}
        required={required}
        aria-describedby={helperId}
        className={heightClasses[rows]}
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
