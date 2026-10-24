import { redirect } from "next/navigation";

// 첫 화면(/)으로 들어오면 초대장 만들기 화면(/create)으로 바로 보낸다.
export default function Home() {
  redirect("/create");
}
