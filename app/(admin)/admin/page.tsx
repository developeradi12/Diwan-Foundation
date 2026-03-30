import { getSession } from "@/utils/sesion";
import { redirect } from "next/navigation";

export default async function AdminPage() {


  const session = await getSession()
  if (!session || session.role !== "admin") redirect("/login");

  redirect("/admin/dashboard");
}
