"use client";

import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col gap-3 mt-10">
      <p className="text-3xl font-semibold">Hello Guest, Welcome to UsePays</p>
      <p className="text-base font-semibold">
        Click the button below to create a Gift Voucher.
      </p>
      <button
        className="border border-slate-400 px-2.5 py-2 text-base font-medium rounded-md hover:bg-brand-main hover:text-white"
        onClick={() => router.push("/guest/create-voucher")}
      >
        Create Voucher
      </button>
    </div>
  );
};

export default page;
