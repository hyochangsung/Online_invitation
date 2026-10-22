import type { InputHTMLAttributes } from "react";
import Radio from "@/components/Radio";

// Figma RadioOption (2168:1119): 라디오 + 라벨 한 줄. 참석/불참 선택에 쓴다.
// label로 감싸서 글자를 눌러도 선택된다.
type RadioOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export default function RadioOption({ label, className, ...props }: RadioOptionProps) {
  return (
    <label
      className={["flex cursor-pointer items-center", className].filter(Boolean).join(" ")}
    >
      <Radio {...props} />
      <span className="text-label-lg text-text-strong">{label}</span>
    </label>
  );
}
