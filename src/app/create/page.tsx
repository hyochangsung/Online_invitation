import type { Metadata } from "next";
import CreateForm from "./CreateForm";

export const metadata: Metadata = {
  title: "초대장 만들기",
};

export default function CreatePage() {
  return <CreateForm />;
}
