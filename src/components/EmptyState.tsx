// Figma EmptyState (2168:1055): 목록이 비었을 때 보여주는 안내
// 예: 응답 현황 0건
type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center gap-inline-md rounded-card bg-surface-subtle px-page-horizontal py-section-lg text-center">
      <p className="text-heading-md text-text-strong">{title}</p>
      <p className="break-keep text-body-md text-text-tertiary">{description}</p>
    </div>
  );
}
