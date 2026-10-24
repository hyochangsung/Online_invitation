import type { Rsvp } from "@/lib/data";

// 응답 현황 집계
// - 참석·불참 수: 각 상태로 응답한 사람 수
// - 참석 인원 합계: 참석 응답만 "본인 1명 + 동반 인원"을 더한다. 불참은 빼고 센다.
// 예: 참석 응답자의 동반 인원이 2명이면 참석 수는 1, 참석 인원은 3이다.
export function summarizeRsvps(rsvps: Rsvp[]) {
  let attending = 0;
  let notAttending = 0;
  let headcount = 0;

  for (const rsvp of rsvps) {
    if (rsvp.status === "yes") {
      attending += 1;
      // 동반 인원이 0 이상의 정수가 아니면 잘못된 값이라 0명으로 본다.
      const companions = Number.isInteger(rsvp.companions) && rsvp.companions > 0 ? rsvp.companions : 0;
      headcount += 1 + companions;
    } else if (rsvp.status === "no") {
      notAttending += 1;
    }
  }

  return { attending, notAttending, headcount };
}
