import Image from "next/image";

// Figma SuccessIcon (2168:1006): 발행 완료·참석 신청 완료 상태에서 쓴다.
export default function SuccessIcon() {
  return (
    <div className="flex size-64 items-center justify-center rounded-pill bg-info-subtle">
      <Image
        src="/icons/success-check.svg"
        alt=""
        width={32}
        height={32}
        className="size-32"
      />
    </div>
  );
}
