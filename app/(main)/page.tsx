"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center gap-8">
        <span>Main</span>
        <Link
          href={"/auth/login"}
          className="text-lg font-geistsans font-medium cursor-pointer"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default Page;
