"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { User, UserCircle } from "lucide-react";

const UserAvatar = ({
  userData,
}: {
  userData: {
    email: string;
    name: string;
    isCompany: boolean;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = () => {
    // If a close timeout is set, cancel it
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const closeDropdown = () => {
    // Set a timeout to close the dropdown after 200ms
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // You can adjust the delay as needed
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={openDropdown}
      onMouseLeave={closeDropdown}
    >
      {/* Avatar Icon */}
      <div className="cursor-pointer">
        <User className="size-5 md:size-6" />
      </div>

      {/* Dropdown Card */}
      {isOpen && (
        <div
          className="absolute md:right-0 sm:-right-10 sm:mt-2.5 md:mt-2 w-64 bg-white rounded-md shadow-lg z-50"
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className="flex flex-col p-3 gap-2">
            <div className="flex items-center gap-2">
              <span>
                <UserCircle />
              </span>
              <p className="text-sm font-semibold text-gray-800">
                {userData.name}
              </p>
            </div>
            <div className="flex border-b-[0.5px] border-gray-200" />
            <div className="">
              <p className="text-xs font-semibold">Email</p>
              <p className="text-xs text-gray-600">{userData.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold">Account Type</p>
              <p className="text-xs text-gray-600">
                {userData.isCompany ? "Business Account" : "Personal Account"}
              </p>
            </div>
            <Link
              href="/change-password"
              className="block mt-3 text-blue-600 text-xs hover:underline"
            >
              Change Password
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
