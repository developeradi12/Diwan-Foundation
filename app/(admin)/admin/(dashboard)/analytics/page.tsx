import { ChartNoAxesCombined } from "lucide-react";
import Header from "../../../_components/header";

const Analytics = () => {
  return (
    <div>
      <Header
        backlink="/admin/dashboard"
        pageName="Dashboard"
        currentPage="Analytics"
      />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
        <div className="bg-white px-5 pt-6 shadow-sm rounded-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-black font-semibold text-lg flex gap-2 items-center">
              <ChartNoAxesCombined className="bg-blue-100 text-blue-400 rounded-md p-1 text-lg" />
              Analytics
            </h2>            
          </div>

          <div className="blog__tables mt-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
