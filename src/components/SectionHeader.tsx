// Figma SectionHeader (2168:1122): subtitle · title · description 묶음
// 값을 넘기지 않은 줄은 보이지 않는다.
// tone=inverse는 어두운 배경(InvitationCover) 위에서 쓰는 흰 글자다.
type SectionHeaderProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  tone?: "default" | "inverse";
};

export default function SectionHeader({
  subtitle,
  title,
  description,
  tone = "default",
}: SectionHeaderProps) {
  const isInverse = tone === "inverse";

  return (
    <div className="flex w-full flex-col items-center gap-stack-md text-center">
      {subtitle && (
        <p
          className={[
            "w-full text-label-md",
            isInverse ? "text-text-inverse opacity-60" : "text-action-secondary",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
      {title && (
        // 입력한 줄바꿈을 그대로 보여주고, 자동 줄바꿈은 단어 단위(break-keep)로 한다.
        <h2
          className={[
            "w-full whitespace-pre-line break-words break-keep text-title-lg",
            isInverse ? "text-text-inverse" : "text-text-primary",
          ].join(" ")}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className={[
            "w-full break-keep text-body-md",
            isInverse ? "text-text-inverse" : "text-text-primary",
          ].join(" ")}
        >
          {description}
        </p>
      )}
    </div>
  );
}
