"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ServiceTable from "./_components/table";
import api from "@/lib/axios";
import Header from "@/app/(admin)/_components/header";

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true); // 🔥 add this
      const res = await api.get("/admin/services");
      setServices(res.data?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Services"
      />

      <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Services</h1>

          <Button className="button cursor-pointer" onClick={() => router.push("/admin/services/create")}>
            + Add Service
          </Button>
        </div>

        {/* Table */}
        <ServiceTable
          services={services}
          loading={loading}
          refetch={fetchServices}
        />
      </div>
    </div>
  );
}