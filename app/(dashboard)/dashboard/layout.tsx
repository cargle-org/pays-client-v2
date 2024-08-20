import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import SideNavBar from "@/components/SideNavBar";

export default async function DashboardLayout({ children }: any) {
  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      <SideNavBar />
      <div className="flex flex-col w-full relative h-screen bg-brand-ash  overflow-y-scroll">
        <NavBar />
        <div className="mt-[80px] w-full p-4 h-[calc(100vh-80px)] ">
          {children}
        </div>
      </div>
    </div>
  );
}
