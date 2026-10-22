import type { ReactNode } from "react";
import IconNone from "@/components/IconNone";

// Figma NavBar (2168:968): 화면 상단 바
// 가운데 title, 양옆 left/right는 아이콘 자리(기본은 빈 자리 icon/none).
type NavBarProps = {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
};

export default function NavBar({ title, left, right }: NavBarProps) {
  return (
    <header className="flex h-65 w-full items-center gap-section p-page-horizontal">
      {left ?? <IconNone />}
      <h1 className="min-w-0 flex-1 text-center text-heading-md text-text-primary">
        {title}
      </h1>
      {right ?? <IconNone />}
    </header>
  );
}
