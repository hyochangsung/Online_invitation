import Image from "next/image";

// Figma icon/plus (2168:1016)
type IconPlusProps = {
  className?: string;
};

export default function IconPlus({ className = "size-24" }: IconPlusProps) {
  return (
    <Image
      src="/icons/icon-plus.svg"
      alt=""
      width={24}
      height={24}
      className={className}
    />
  );
}
