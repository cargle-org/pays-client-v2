"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import right from "@/assets/imgs/redeem/redeem_img.png";
import bg from "@/assets/imgs/redeem/bg.png";
import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";
import SelectRedeemType from "./[id]/page";
import { formatVoucherKey } from "@/helpers/formatVoucherKey";

const Page = () => {
  const { getVoucherByKey, fetchVouchersLoading }: any = useGeneralContext();

  const [voucherCode, setVoucherCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get raw input (unformatted)
    const rawValue = e.target.value.replace(/-/g, "").replace(/\s+/g, "");
    const formatted = formatVoucherKey(rawValue);
    setVoucherCode(formatted);
  };

  const onchangeHandler = (e: any) => {
    // Format the input while removing any whitespace and auto-inserting hyphens.
    const formatted = formatVoucherKey(e.target.value);
    setVoucherCode(formatted);
    console.log(formatted);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const trimmedVoucherCode = voucherCode.trim(); // Trim the voucher code to remove extra spaces
    await getVoucherByKey(trimmedVoucherCode);
  };

  return (
    <>
      <div className="w-full min-h-screen pt-16 pb-12 flex items-start justify-center gap-8 lg:pt-32">
        <div
          className="w-[90%] min-h-[70vh] flex flex-col items-center justify-center gap-8 lg:w-[80%]"
          style={{
            backgroundImage: `url(${bg.src})`, // Use bg.src to set the background image from the imported file
            backgroundSize: "cover", // Ensures the background image covers the div
            backgroundPosition: "center", // Centers the background image
          }}
        >
          <div className="max-w-sm flex flex-col gap-8 justify-center">
            <span className="w-full text-3xl md:text-4xl text-center text-brand dark font-medium font-geistsans">
              Cashout your Voucher
            </span>
            <span className="font-medium text-center text-base text-brand-dark/70">
              Enter your unique voucher code to claim your exclusive discount.
            </span>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-8 justify-center"
            >
              {/* input fields */}
              <div className="flex flex-col justify-start w-full items-center">
                <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                  Voucher Code
                </span>
                <input
                  type="text"
                  name="voucherCode"
                  value={voucherCode}
                  id="voucherCode"
                  placeholder="Enter Voucher Code"
                  onChange={handleChange}
                  className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                />
              </div>
              {fetchVouchersLoading ? (
                <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                <button
                  type="submit"
                  className="transition-fx shadow-lg rounded-3xl cursor-pointer font-medium text-xl uppercase py-2 px-4 w-full sm:w-[353px] bg-brand-main/45 flex items-center justify-center gap-4 text-brand-main hover:bg-brand-main hover:text-brand-white"
                >
                  FIND VOUCHER
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.263225 12.2368C0.431987 12.4053 0.660751 12.5 0.899267 12.5C1.13778 12.5 1.36655 12.4053 1.53531 12.2368L10.1999 3.5722V10.4007C10.1999 10.6394 10.2947 10.8683 10.4635 11.0371C10.6323 11.2059 10.8612 11.3007 11.0999 11.3007C11.3387 11.3007 11.5676 11.2059 11.7364 11.0371C11.9052 10.8683 12 10.6394 12 10.4007V1.40006C12 1.16135 11.9052 0.932415 11.7364 0.763621C11.5676 0.594827 11.3387 0.5 11.0999 0.5H2.09935C1.86064 0.5 1.6317 0.594827 1.46291 0.763621C1.29411 0.932415 1.19929 1.16135 1.19929 1.40006C1.19929 1.63877 1.29411 1.8677 1.46291 2.0365C1.6317 2.20529 1.86064 2.30012 2.09935 2.30012H8.9278L0.263225 10.9647C0.0946735 11.1335 0 11.3622 0 11.6007C0 11.8392 0.0946735 12.068 0.263225 12.2368Z"
                      fill="#3B82F6"
                    />
                  </svg>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
