import AttendanceBadge from "@/components/AttendanceBadge";
import Button from "@/components/Button";
import IconCheck from "@/components/IconCheck";
import IconMinus from "@/components/IconMinus";
import IconNone from "@/components/IconNone";
import IconPlus from "@/components/IconPlus";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InputField from "@/components/InputField";
import Label from "@/components/Label";
import Radio from "@/components/Radio";
import StatCard from "@/components/StatCard";
import StepButton from "@/components/StepButton";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";
import TextareaField from "@/components/TextareaField";

// 실습용 임시 페이지: 컴포넌트의 모든 종류와 상태를 한눈에 확인한다.
const sizes = ["sm", "md", "lg"] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-stack-sm">
      <h2 className="text-label-lg text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

export default function TestPage() {
  return (
    <main className="flex flex-col gap-section px-page-horizontal py-section">
      <h1 className="text-heading-lg text-text-primary">컴포넌트 테스트</h1>
      <p className="text-body-md text-text-secondary">
        hover·focus 상태는 마우스를 올리거나 입력 칸을 눌러서 볼 수 있어요.
      </p>

      {sizes.map((size) => (
        <Section key={size} title={`Button · size = ${size}`}>
          <div className="flex flex-wrap items-center gap-stack-md">
            <Button size={size}>Button</Button>
            <Button size={size} disabled>
              Button
            </Button>
          </div>
        </Section>
      ))}

      <Section title="icon/check · plus · minus · none">
        <div className="flex items-center gap-stack-md">
          <IconCheck />
          <IconPlus />
          <IconMinus />
          <IconMinus disabled />
          <IconNone className="size-24 bg-surface-subtle" />
        </div>
      </Section>

      <Section title="SuccessIcon">
        <SuccessIcon />
      </Section>

      <Section title="Label">
        <div className="flex gap-stack-md">
          <Label>Label</Label>
          <Label required>Label</Label>
        </div>
      </Section>

      <Section title="Radio · default / selected / disabled">
        <div className="flex">
          <Radio name="demo" aria-label="기본" />
          <Radio name="demo" aria-label="선택됨" defaultChecked />
          <Radio name="demo-disabled" aria-label="비활성" disabled />
        </div>
      </Section>

      <Section title="AttendanceBadge">
        <div className="flex gap-stack-md">
          <AttendanceBadge status="yes" />
          <AttendanceBadge status="no" />
        </div>
      </Section>

      <Section title="InfoRow · inline / spread">
        <InfoRow label="일시" value="2026년 11월 14일 (토) 09:00" />
        <InfoRow type="spread" label="일시" value="2026년 11월 14일 (토) 09:00" />
      </Section>

      <Section title="StatCard">
        <div className="flex gap-stack-md">
          <StatCard className="flex-1" label="참석" value="2명" />
          <StatCard className="flex-1" label="불참" value="1명" />
          <StatCard className="flex-1" label="참석 인원" value="5명" highlight />
        </div>
      </Section>

      <Section title="StepButton · default / disabled">
        <div className="flex gap-stack-md">
          <StepButton icon="minus" aria-label="줄이기" />
          <StepButton icon="minus" aria-label="줄이기" disabled />
          <StepButton icon="plus" aria-label="늘리기" />
        </div>
      </Section>

      <Section title="Stepper">
        <Stepper defaultValue={1} />
      </Section>

      <Section title="InputField · 빈 칸 / 값 채움">
        <InputField aria-label="빈 칸" placeholder="placeholder" />
        <InputField aria-label="값 채움" defaultValue="입력한 값" />
      </Section>

      <Section title="Input">
        <Input id="demo-input" label="장소" required placeholder="장소를 입력해주세요" />
        <Input
          id="demo-input-helper"
          label="이름"
          placeholder="이름을 입력해주세요"
          helper="안내 문구"
        />
      </Section>

      <Section title="TextareaField">
        <TextareaField
          aria-label="여러 줄 입력"
          placeholder="게스트에게 전할 초대 글을 적어주세요"
        />
      </Section>

      <Section title="Textarea · rows = 4 / 2">
        <Textarea
          id="demo-body"
          label="본문"
          required
          placeholder="게스트에게 전할 초대 글을 적어주세요"
          helper="엔터로 줄을 나눌 수 있어요"
        />
        <Textarea id="demo-title" label="제목" rows={2} required placeholder="제목" />
      </Section>
    </main>
  );
}
