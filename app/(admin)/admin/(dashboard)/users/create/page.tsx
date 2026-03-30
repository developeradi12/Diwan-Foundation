import Header from "../../../../_components/header"
import CreateUserForm from "./createuserForm"

export default function CreateUserPage() {
  return (
    <div className="min-h-screen  bg-gray-50/50">
      <Header
        backlink="/admin/users"
        pageName="Users"
        currentPage="Create User"
      />
      <CreateUserForm />
    </div>
  )
}