// Figma icon/none (2168:967)
// 아이콘이 없을 때 자리만 차지하는 빈 칸이다.
type IconNoneProps = {
  className?: string;
};

export default function IconNone({ className = "size-24" }: IconNoneProps) {
  return <span aria-hidden="true" className={`block ${className}`} />;
}
