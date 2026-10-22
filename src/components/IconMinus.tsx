import Image from "next/image";

// Figma icon/minus (2168:1018)
// disabled는 StepButton의 비활성 상태에서 쓰는 회색 아이콘이다.
type IconMinusProps = {
  className?: string;
  disabled?: boolean;
};

export default function IconMinus({
  className = "size-24",
  disabled = false,
}: IconMinusProps) {
  return (
    <Image
      src={disabled ? "/icons/icon-minus-disabled.svg" : "/icons/icon-minus.svg"}
      alt=""
      width={24}
      height={24}
      className={className}
    />
  );
}
