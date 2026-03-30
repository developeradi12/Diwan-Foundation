import Service from "@/models/Services";
import ServiceForm from "../_components/form";
import Header from "@/app/(admin)/_components/header";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await Service.findById(id).lean()
  if (!service) {
    return (
      <div className="p-6 text-red-500 font-medium">
        Service not found
      </div>
    );
  }

  const serializedData = JSON.parse(JSON.stringify(service));
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Services"
      />
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Edit Service</h1>
        <ServiceForm initialData={serializedData} />
      </div>
      /</div>
  );
}