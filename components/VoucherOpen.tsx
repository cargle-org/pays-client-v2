"use client";

import React, { useEffect, useState } from "react";

const VoucherOpen: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // When the component mounts, trigger the animation.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative">
      <div className="relative w-64 h-64">
        {/* Envelope (background image or SVG) */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
            isMounted ? "envelope-open" : ""
          }`}
          style={{ backgroundImage: "url('/envelope.jpg')" }}
        ></div>

        {/* Voucher Card sliding out */}
        <div
          className={`absolute inset-0 flex justify-center items-end ${
            isMounted ? "card-slide-out" : "card-hidden"
          }`}
        >
          <div className="w-56 h-36 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-bold">Your Voucher</h2>
            <p className="text-sm">Voucher details here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherOpen;
