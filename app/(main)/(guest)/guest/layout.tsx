import "@/app/globals.css";
import GuestLayout from "@/components/Provider/GuestLayout";

function GuestLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <GuestLayout children={children} />;
}

export default GuestLayoutWrapper;
