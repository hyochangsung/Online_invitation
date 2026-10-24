import { createClient } from "@supabase/supabase-js";

// Supabase 연결 도구. .env.local의 주소와 공개 키(publishable key)를 쓴다.
// 공개 키는 브라우저에 노출돼도 되는 키이며, 실제 권한은 Supabase의 RLS 정책이 정한다.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error(".env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY를 넣어주세요.");
}

// 로그인 기능이 없으므로 로그인 정보(session)는 저장하지 않는다.
export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
