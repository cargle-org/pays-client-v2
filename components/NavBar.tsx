"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { User, Wallet, Menu } from "lucide-react";

import MobileSideNavBar from "./MobileSideBar";
import { useGeneralContext } from "@/context/GenralContext";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
  const { user }: any = useGeneralContext();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close Sidebar
  const closeSidebar = () => setIsSidebarOpen(false);

  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClickOutside = (event: any) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  //to handle Click Outside the sidebar
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent | MouseEventInit) => {
      handleClickOutside(event);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleDocumentClick);
    } else {
      document.removeEventListener("mousedown", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      className="md:ml-[198px] lg:ml-[208px] py-4 fixed inset-x-0 border-b-[0.3px] z-50 bg-brand-ash"
    >
      <div className="flex px-4 items-center h-full w-full justify-between">
        <div className="flex items-center space-x-4 md:space-x-0">
          <button
            className="flex md:hidden rounded"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <Menu />
          </button>
          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="w-3/4 sm:3/4 fixed inset-0 z-5"
              onClick={closeSidebar}
            >
              <MobileSideNavBar
                onClose={closeSidebar}
                isSidebarOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
              />
            </div>
          )}
          <h1 className="text-lg sm:text-xl text-brand-main font-semibold">
            WELCOME
          </h1>
          {/* <h1 className="text-lg text-brand-main font-geistsans font-medium">
            {" "}
            {user?.name}
          </h1> */}
        </div>
        <div className="flex items-center gap-2.5 sm:gap-2">
          <div className="flex gap-2 items-end p-1 sm:p-1.5 px-2.5 sm:px-3 font-geistsans rounded-3xl bg-brand-white text-brand-main">
            <Wallet className="size-5 md:size-6" />
            <span className="text-sm font-normal md:text-base">
              ₦{(user?.walletBalance || 0).toLocaleString("en-NG")}
            </span>
          </div>
          <div className="flex gap-1 md:gap-2 items-end p-1 sm:p-1.5 px-2.5 sm:px-3 font-geistsans rounded-3xl bg-brand-white text-brand-main cursor-pointer">
            <UserAvatar userData={user} />
            <span className="hidden sm:flex text-sm font-normal md:text-base">
              {user?.name.split(" ")[0]}
            </span>
          </div>
          {/* <div className="flex flex-col items-end">
            <h1 className="font-semibold">{user?.email}</h1>
            <h1>{user?.role}</h1>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 border border-gray-400">
            <User />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
