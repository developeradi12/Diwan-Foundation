import Header from "@/app/(admin)/_components/header";
import User from "@/models/User";
import { notFound } from "next/navigation";
import EditMemberP from "./Edit";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const member = await User.findById(id).lean();

  if (!member) return notFound(); 

  const serializedData = JSON.parse(JSON.stringify(member));

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/members"
        pageName="Members"
        currentPage="Edit Member" 
      />
      <div className="p-6 max-w-screen-xl mx-auto">
        <EditMemberP initialData={serializedData} />
      </div>
    </div>
  );
}