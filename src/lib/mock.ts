// 화면 확인용 가짜 데이터. 실제 저장소(Supabase)의 데이터가 아니다.
// 타입은 임시이며, Supabase 데이터 모델을 정할 때 다시 맞춘다.

export type Invitation = {
  id: string; // 실제 서비스에서는 추측하기 어려운 고유 ID를 쓴다.
  title: string;
  startsAt: string; // 일시. 시간대 기준이 미정이라 우선 한국 시간(+09:00)으로 적었다.
  place: string; // 주소를 글자로 표시
  body: string; // 줄바꿈(\n)은 화면에 그대로 보여준다.
};

export type Rsvp = {
  id: string;
  invitationId: string;
  name: string;
  status: "yes" | "no"; // yes = 참석, no = 불참 (AttendanceBadge와 같은 값)
  companions: number; // 동반 인원 (본인 제외)
  createdAt: string; // 응답한 시각
};

export const mockInvitation: Invitation = {
  id: "demo", // 확인하기 쉽게 정한 가짜 ID. 실제 발행 ID는 추측하기 어렵게 만든다.
  title: "민지와 서준의 집들이에 초대합니다",
  startsAt: "2026-11-14T18:00:00+09:00",
  place: "서울특별시 마포구 월드컵북로 12길 34, 501호",
  body: "새 집으로 이사했어요.\n맛있는 음식 준비해 둘 테니 편하게 놀러 오세요!\n\n주차 공간이 좁으니 대중교통을 이용해 주세요.",
};

// 응답이 0건인 초대장. 응답 현황의 빈 목록(EmptyState) 화면 확인용이다.
export const mockEmptyInvitation: Invitation = {
  id: "empty",
  title: "연말 보드게임 모임",
  startsAt: "2026-12-19T19:00:00+09:00",
  place: "서울특별시 성동구 왕십리로 56, 2층",
  body: "한 해 동안 수고 많았어요.\n좋아하는 보드게임이 있으면 가져와 주세요!",
};

export const mockInvitations: Invitation[] = [mockInvitation, mockEmptyInvitation];

// ID로 가짜 초대장을 찾는다. 없으면 undefined를 돌려준다.
export function findMockInvitation(id: string) {
  return mockInvitations.find((invitation) => invitation.id === id);
}

// 응답 현황 화면에서 기대하는 값
// 참석 2 · 불참 1 · 참석 인원 합계 4명 (김하늘 1+2, 이도윤 1+0)
export const mockRsvps: Rsvp[] = [
  {
    id: "r1",
    invitationId: mockInvitation.id,
    name: "김하늘",
    status: "yes",
    companions: 2,
    createdAt: "2026-10-12T14:03:00+09:00",
  },
  {
    id: "r2",
    invitationId: mockInvitation.id,
    name: "박지우",
    status: "no",
    companions: 0,
    createdAt: "2026-10-13T09:41:00+09:00",
  },
  {
    id: "r3",
    invitationId: mockInvitation.id,
    name: "이도윤",
    status: "yes",
    companions: 0,
    createdAt: "2026-10-12T15:20:00+09:00",
  },
];
