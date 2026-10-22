"use client";

import { useState } from "react";
import StepButton from "@/components/StepButton";

// Figma Stepper (2168:1025): 동반 인원 입력 (decrease · value · increase)
// 값이 최솟값이면 decrease 버튼을 비활성으로 바꾼다.
// name을 주면 숨은 input으로 폼 제출 값에 포함된다.
type StepperProps = {
  defaultValue?: number;
  min?: number;
  max?: number;
  name?: string;
  onChange?: (value: number) => void;
};

export default function Stepper({
  defaultValue = 0,
  min = 0,
  max,
  name,
  onChange,
}: StepperProps) {
  const [value, setValue] = useState(defaultValue);

  function update(next: number) {
    setValue(next);
    onChange?.(next);
  }

  const canIncrease = max === undefined || value < max;

  return (
    <div className="flex items-center gap-stack-sm">
      <StepButton
        icon="minus"
        aria-label="인원 줄이기"
        disabled={value <= min}
        onClick={() => update(value - 1)}
      />
      <span aria-live="polite" className="text-heading-md text-text-strong">
        {value}명
      </span>
      <StepButton
        icon="plus"
        aria-label="인원 늘리기"
        disabled={!canIncrease}
        onClick={() => update(value + 1)}
      />
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
}
