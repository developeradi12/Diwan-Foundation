import { Boxes, MoveRight, PopcornIcon, Spotlight, User2 } from "lucide-react";
import Header from "../../../_components/header";
import Link from "next/link";
import DashboardChart from "./_components/dashboard-chart";
import DashboardStats from "./_components/stats";

const AdminDashboard = () => {
    

  return (
    <div>
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Dashboard"
      />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">

        {/* Stat Cards Grid */}
        <DashboardStats />

        {/* Chart Area */}
        <div className="bg-white min-h-[400px] flex-1 rounded-xl mt-3 p-5">
          <DashboardChart />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;