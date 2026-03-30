import connectToDatabase from "@/lib/mongodb";
import Header from "../../../../_components/header";
import EditUserForm from "./editform";
import User from "@/models/User";


export default async function EditUserPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    let userData = null;

    try {
        await connectToDatabase();
        const { id } = await params;
        const user = await User.findById(id).lean();

        if (user) {
            userData = {
                _id: user._id.toString(),
                fullName: user.fullName || "",
                email: user.email || "",
                role: user.role || "",
                phone: user.phone || "",
                amount: user.amount || undefined,
            };
        }
    } catch (err) {
        console.error(err);
    }
    if (!userData) {
        return <div className="p-6">User not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header
                backlink="/admin/users"
                pageName="Users"
                currentPage="Edit User"
            />

            <EditUserForm initialData={userData} />
        </div>
    );
}