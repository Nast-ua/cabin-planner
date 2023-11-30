import NavHeader from "@/components/nav-header";
import SideBar from "@/components/side-bar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen flex relative">
      <SideBar />

      <div className="flex flex-1 flex-col md:ml-[200px]">
        <NavHeader />

        <div className="flex flex-1 flex-col overflow-scroll items-center md:items-stretch bg-slate-100/25 pt-6 px-4 md:px-6 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
