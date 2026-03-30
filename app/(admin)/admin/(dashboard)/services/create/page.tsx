import Header from "@/app/(admin)/_components/header";
import ServiceForm from "../_components/form";

export default function CreateServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Services"
      />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Add Service</h1>
        <ServiceForm />
      </div>
    </div>
  );
}