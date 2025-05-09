"use client";

import React from "react";
import { usePathname } from "next/navigation";

type SideBarItemProps = {
  link: string;
  title: string;
  icon: React.ReactNode;
};

const SideBarItem = ({ link, title, icon }: SideBarItemProps) => {
  const pathname = usePathname();

  const handleNavigation = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (link !== pathname) {
      // Trigger a full page reload for a new link
      window.location.href = link;
    }
  };

  return (
    <div
      onClick={handleNavigation}
      className={`group transition-fx flex items-center w-full p-2 py-4 pl-4 gap-2 cursor-pointer rounded-r-3xl font-geistsans font-normal text-sm hover:pl-8 hover:text-brand-white hover:bg-brand-main ${
        link === pathname &&
        `pl-8 border-l-4 border-white border-main text-brand-white bg-brand-main`
      }`}
    >
      <span>{icon}</span>
      {title}
    </div>
  );
};

export default SideBarItem;

// "use client";

// import React, { useEffect, useState } from "react";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// type SideBarItemProps = {
//   link: string;
//   title: string;
//   icon: React.ReactNode;
// };

// const SideBarItem = ({ link, title, icon }: SideBarItemProps) => {
//   const pathname = usePathname();

//   return (
//     <Link href={link}>
//       <div
//         className={`group transition-fx flex items-center w-full p-2 py-4 pl-4 gap-2 cursor-pointer rounded-r-3xl font-geistsans font-normal text-sm hover:pl-8 hover:text-brand-white hover:bg-brand-main ${
//           link === pathname && `pl-8 border-main text-brand-white bg-brand-main`
//         }`}
//       >
//         <span>{icon}</span>
//         {title}
//       </div>
//     </Link>
//   );
// };

// export default SideBarItem;
