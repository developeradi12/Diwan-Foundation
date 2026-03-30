import Header from "@/app/(admin)/_components/header";
import MembershipForm from "../../create/membershipForm";
import Membership from "@/models/Membership";
import { notFound } from "next/navigation";

export default async function EditMembershipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const plan = await Membership.findById(id).lean();

  if (!plan) return notFound();

  const serialized = JSON.parse(JSON.stringify(plan));

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header backlink="/admin/memberships" pageName="Memberships" currentPage="Edit Plan" />
      <MembershipForm initialData={serialized} />
    </div>
  );
}