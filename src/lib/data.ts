import { supabase } from "@/lib/supabase";

// 화면에서 쓰는 초대장·응답 모양. Supabase 테이블(invitations, rsvps)과 칸이 같다.
// DB는 starts_at처럼 밑줄 이름을 쓰고, 코드에서는 startsAt처럼 바꿔 쓴다.
export type Invitation = {
  id: string;
  title: string;
  startsAt: string; // 일시. 날짜만 받아 한국 시간 0시로 저장한다. (예: "2026-11-14T00:00:00+09:00")
  place: string; // 주소를 글자로 표시
  body: string; // 줄바꿈(\n)은 화면에 그대로 보여준다.
};

export type Rsvp = {
  id: string;
  invitationId: string;
  name: string;
  status: "yes" | "no"; // yes = 참석, no = 불참
  companions: number; // 동반 인원 (본인 제외)
  createdAt: string; // 응답한 시각
};

// 초대장·응답 ID는 Supabase가 만든 uuid다. 형식이 다르면 DB에 묻지 않고 바로 "없음"으로 본다.
// 예: "3f2a9c1e-5b7d-4e8a-9c1f-2d3e4f5a6b7c"
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string) {
  return UUID_PATTERN.test(value);
}

// ID로 초대장 하나를 읽는다. 없으면 null을 돌려준다.
export async function getInvitation(id: string): Promise<Invitation | null> {
  if (!isUuid(id)) return null;

  const { data, error } = await supabase
    .from("invitations")
    .select("id, title, starts_at, place, body")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`초대장을 불러오지 못했어요. (${error.code})`);
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    startsAt: data.starts_at,
    place: data.place,
    body: data.body,
  };
}

// 초대장에 달린 응답을 응답한 순서대로 읽는다.
export async function getRsvps(invitationId: string): Promise<Rsvp[]> {
  const { data, error } = await supabase
    .from("rsvps")
    .select("id, invitation_id, name, status, companions, created_at")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(`응답을 불러오지 못했어요. (${error.code})`);

  return data.map((row) => ({
    id: row.id,
    invitationId: row.invitation_id,
    name: row.name,
    status: row.status,
    companions: row.companions,
    createdAt: row.created_at,
  }));
}
