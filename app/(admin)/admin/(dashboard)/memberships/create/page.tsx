import Header from "../../../../_components/header"
import MembershipForm from "./membershipForm"


export default function CreateMembershipPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header
        backlink="/admin/memberships"
        pageName="Memberships"
        currentPage="Create Plan"
      />
      <MembershipForm />
    </div>
  )
}
