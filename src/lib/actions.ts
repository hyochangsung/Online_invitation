"use server";

import { isUuid } from "@/lib/data";
import { kstDateToIso } from "@/lib/format";
import { supabase } from "@/lib/supabase";

// 서버에서 실행되는 저장 함수(Server Action).
// 화면에서 검사했더라도 누구나 이 함수에 직접 요청할 수 있으므로 서버에서 다시 검사한다.
// 개인정보가 로그에 남지 않도록 오류는 코드만 기록한다.

type ActionResult<T> = { ok: true; data: T } | { ok: false; message: string };

const SAVE_FAILED = "저장하지 못했어요. 다시 시도해 주세요.";

// 날짜 선택 칸 값 형식. 예: "2026-11-14"
const DATE_INPUT_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// 초대장을 발행(저장)하고 새 초대장 ID를 돌려준다.
export async function createInvitation(input: {
  title: string;
  date: string;
  place: string;
  body: string;
}): Promise<ActionResult<{ id: string }>> {
  const title = input.title.trim();
  const place = input.place.trim();
  const body = input.body.trim();

  if (!title || !place || !body || !input.date) {
    return { ok: false, message: "모든 항목을 입력해 주세요." };
  }
  // 제목은 최대 2줄까지만 받는다. (만들기 화면과 같은 규칙)
  if (title.split("\n").length > 2) {
    return { ok: false, message: "제목은 2줄까지 쓸 수 있어요." };
  }
  if (!DATE_INPUT_PATTERN.test(input.date) || Number.isNaN(Date.parse(kstDateToIso(input.date)))) {
    return { ok: false, message: "날짜를 다시 선택해 주세요." };
  }

  const { data, error } = await supabase
    .from("invitations")
    .insert({ title, starts_at: kstDateToIso(input.date), place, body })
    .select("id")
    .single();

  if (error) {
    console.error("createInvitation 실패:", error.code);
    return { ok: false, message: SAVE_FAILED };
  }

  return { ok: true, data: { id: data.id } };
}

// 게스트의 참석 응답을 저장한다.
export async function submitRsvp(input: {
  invitationId: string;
  name: string;
  status: string;
  companions: number;
}): Promise<ActionResult<null>> {
  const name = input.name.trim();

  if (!isUuid(input.invitationId)) {
    return { ok: false, message: "초대장을 찾을 수 없어요." };
  }
  if (!name) {
    return { ok: false, message: "이름을 입력해 주세요." };
  }
  if (input.status !== "yes" && input.status !== "no") {
    return { ok: false, message: "참석 여부를 선택해 주세요." };
  }
  if (!Number.isInteger(input.companions) || input.companions < 0) {
    return { ok: false, message: "동반 인원을 다시 확인해 주세요." };
  }

  const { error } = await supabase.from("rsvps").insert({
    invitation_id: input.invitationId,
    name,
    status: input.status,
    // 불참이면 동반 인원은 0명으로 저장한다.
    companions: input.status === "no" ? 0 : input.companions,
  });

  if (error) {
    console.error("submitRsvp 실패:", error.code);
    return { ok: false, message: SAVE_FAILED };
  }

  return { ok: true, data: null };
}
