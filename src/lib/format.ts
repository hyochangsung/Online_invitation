// 날짜를 화면용 글자로 바꾼다.
// 시간대 기준이 미정이라 우선 한국 시간(Asia/Seoul)으로 보여준다.
const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// 초대장 일시는 날짜만 받으므로 시간 없이 보여준다. 예: "2026년 11월 14일 (토)"
export function formatDate(isoString: string) {
  // formatToParts는 연·월·일 등을 조각으로 나눠 돌려준다.
  const parts = Object.fromEntries(
    dateTimeFormat
      .formatToParts(new Date(isoString))
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}년 ${parts.month} ${parts.day}일 (${parts.weekday})`;
}

// 날짜 선택 칸 값("2026-11-14")을 한국 시간 0시 기준 날짜 글자로 바꾼다.
// 예: "2026-11-14" → "2026-11-14T00:00:00+09:00"
export function kstDateToIso(value: string) {
  return `${value}T00:00:00+09:00`;
}

// 응답 시각처럼 짧게 보여줄 때 쓴다. 예: "10월 12일 14:03"
export function formatShortDateTime(isoString: string) {
  const parts = Object.fromEntries(
    dateTimeFormat
      .formatToParts(new Date(isoString))
      .map((part) => [part.type, part.value]),
  );

  return `${parts.month} ${parts.day}일 ${parts.hour}:${parts.minute}`;
}
