"use client";

import Button from "@/components/Button";

// 게스트용 초대장 링크(/i/[id])를 클립보드에 복사한다.
export default function CopyInviteButton({ invitationId }: { invitationId: string }) {
  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() =>
        navigator.clipboard.writeText(`${window.location.origin}/i/${invitationId}`)
      }
    >
      초대장 링크 복사하기
    </Button>
  );
}
