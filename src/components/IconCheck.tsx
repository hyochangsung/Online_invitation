import Image from "next/image";

// Figma icon/check (2168:1074)
type IconCheckProps = {
  className?: string;
};

export default function IconCheck({ className = "size-24" }: IconCheckProps) {
  return (
    <Image
      src="/icons/icon-check.svg"
      alt=""
      width={24}
      height={24}
      className={className}
    />
  );
}
