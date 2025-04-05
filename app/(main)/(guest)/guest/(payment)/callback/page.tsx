"use client";

import { Dot, Loader } from "lucide-react";
import React, { useEffect } from "react";

const page = () => {
  //Close window on redirect
  useEffect(() => {
    window.close();
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <Loader className="sm:size-10 size-24 animate-spin stroke-brand-main" />
      <div className="flex items-end justify-center sm:text-xl text-2xl font-semibold">
        <span>Verifying Payment</span>
        <Dot className="animate-ping size-6" />
      </div>
      <div className="flex flex-col sm:gap-1 gap-2 justify-center text-center">
        <span className="font-medium sm:text-base text-lg text-slate-500">
          Please wait while we verify your payment.
        </span>
        <span>Transaction Initiated</span>
        <span className="text-red-500">Payment not verified yet!</span>
      </div>
    </div>
  );
};

export default page;
