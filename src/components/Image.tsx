import NextImage from "next/image";

// Figma Image (2168:1126): 초대장에 쓰는 고정 이미지
// type=character는 커버의 펭귄 캐릭터, flag는 본문 위 깃발 아이콘이다.
// alt는 화면 읽기 프로그램용 설명이다. 꾸밈용이면 빈 문자열("")을 넘긴다.
type ImageProps = {
  type: "character" | "flag";
  alt: string;
};

export default function Image({ type, alt }: ImageProps) {
  if (type === "flag") {
    return (
      <NextImage
        src="/images/flag.png"
        alt={alt}
        width={48}
        height={48}
        className="size-48 rounded-scaled-media object-cover"
      />
    );
  }

  return (
    <NextImage
      src="/images/character.png"
      alt={alt}
      width={201}
      height={201}
      className="size-201 object-cover"
    />
  );
}
