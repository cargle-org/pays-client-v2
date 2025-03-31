import SideNavBar from "@/components/Shared/SideNavBar";

export default async function GuestLayout({
  children,
  isGuest = true,
}: {
  children: React.ReactNode;
  isGuest?: boolean;
}) {
  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      <SideNavBar isGuest={isGuest} />
      <div className="flex flex-col w-full relative h-screen bg-brand-ash  overflow-y-scroll">
        <div className="lg:mt-14 w-full p-4 h-[calc(100vh-80px)] ">
          {children}
        </div>
      </div>
    </div>
  );
}
