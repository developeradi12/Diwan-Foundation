import Header from "../../../../_components/header"
import CreateMember from "./Create"


export default function CreateMemberPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/members"
        pageName="Members"
        currentPage="Create Member"
      />
      <div className="p-6 max-w-screen-xl mx-auto">
        <CreateMember />
      </div>
    </div>
  )
}