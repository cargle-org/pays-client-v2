import "@/app/globals.css";

import Header from "./Header";
import Footer from "@/components/Landing/Footer";

export default async function MainLayout({ children }: any) {
  return (
    <div className='flex flex-col'>
      <Header />
      <div className='bg-white w-full min-h-screen'>{children}</div>
      <Footer />
      {/* <ScrollToTopButton /> */}
    </div>
  );
}
