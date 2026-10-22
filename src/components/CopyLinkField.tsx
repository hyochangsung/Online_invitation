"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";

// Figma CopyLinkField (2168:1000): 발행 후 공유할 링크 한 줄
// 초대장 링크와 응답 현황 링크에 각각 한 번씩 쓴다.
type CopyLinkFieldProps = {
  title: string;
  url: string;
  description: string;
};

// 칸이 좁아 전체 주소가 잘리므로, Figma처럼 사이트 주소를 "…"로 줄여 경로만 보여준다.
// 예: http://localhost:3000/i/demo → …/i/demo (복사는 전체 주소로 한다)
function shortenUrl(url: string) {
  try {
    return `…${new URL(url).pathname}`;
  } catch {
    return url;
  }
}

export default function CopyLinkField({ title, url, description }: CopyLinkFieldProps) {
  return (
    <div className="flex w-full flex-col gap-inline-md rounded-card bg-surface-subtle p-stack-md">
      <p className="text-label-lg text-text-strong">{title}</p>
      <div className="flex items-center gap-inline-md">
        <InputField
          readOnly
          value={shortenUrl(url)}
          aria-label={title}
          className="min-w-0 flex-1"
        />
        <Button onClick={() => navigator.clipboard.writeText(url)}>복사</Button>
      </div>
      <p className="text-caption-md text-text-tertiary">{description}</p>
    </div>
  );
}
