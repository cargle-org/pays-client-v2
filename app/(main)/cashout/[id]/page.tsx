"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/imgs/auth/pays_logo.png";
import right_img from "@/assets/imgs/redeem/redeem_img.png";
import Airtime from "./airtime/Airtime";
import Cash from "./cash/Cash";
import { Coins, Phone } from "lucide-react";
import { useGeneralContext } from "@/context/GenralContext";
import FlippingVoucherPreview from "@/components/FlippingVoucherPreview";

const Redeem = ({ params }: { params: { id: string } }) => {
  const [display, setDisplay] = useState("");
  const { oneVoucher }: any = useGeneralContext();
  console.log("🚀 ~ Redeem ~ oneVoucher:", oneVoucher);

  return (
    <>
      {display === "airtime" && (
        <Airtime voucherCode={params?.id} setDisplay={setDisplay} />
      )}
      {display === "cash" && (
        <Cash voucherCode={params?.id} setDisplay={setDisplay} />
      )}
      {display === "" && (
        <div className="max-w-md lg:max-w-[2560px] mx-auto w-full min-h-screen flex items-center justify-center py-16 lg:pt-32">
          {/* content */}
          <div className="min-h-[60%] w-[85%] flex flex-col items-center lg:min-h-[80%]">
            {/* divider */}
            <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish/30"></div>
            <div className="w-full flex flex-col-reverse justify-between items-start gap-6 h-[100%] lg:flex-row lg:space-x-5">
              {/* left */}
              <div className="w-full h-[100%] flex flex-col justify-between gap-4 lg:h-[600px] lg:w-[50%]">
                {/* left top */}
                <div className="flex flex-col gap-6 justify-start">
                  {/* logo */}
                  <div className="mb-8 w-[87px]">
                    <Image
                      src={logo}
                      alt="logo"
                      priority
                      className="w-[87px] h-[31px]"
                    />
                  </div>
                  {/* title-bytext */}
                  <div className="flex flex-col justify-start font-geistsans mb-4 gap-2">
                    <span className="font-bold text-4xl text-brand-dark">
                      {/* Cashout Your Voucher */}
                      {oneVoucher?.title}{" "}
                      <span className="text-gray-600 text-base">
                        ₦{oneVoucher?.amount}
                      </span>
                    </span>
                    <span className="font-normal text-xs text-brand-dark">
                      Please select your preferred method of voucher redemption
                    </span>
                  </div>
                  {/* input fields */}
                  <div className="flex flex-col items-center justify-start gap-5 md:flex-row">
                    <div
                      onClick={() => setDisplay("cash")}
                      className="transition-fx group w-full max-w-[240px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                    >
                      <Coins className="font-bold w-[40px] h-[40px] p-1 gont-geistsans" />
                      <span className="font-bold text-2xl gont-geistsans">
                        Cash
                      </span>
                      <div className="font-normal text-xs text-brand-grayish font-geistsans">
                        Withdraw voucher as cash directly to your bank
                      </div>
                    </div>
                    <div
                      onClick={() => setDisplay("airtime")}
                      className="transition-fx group w-full max-w-[240px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                    >
                      <Phone className="font-bold w-[40px] h-[40px] p-1 gont-geistsans" />
                      <span className="font-bold text-2xl gont-geistsans">
                        Airtime
                      </span>
                      <div className="font-normal text-xs text-brand-grayish font-geistsans">
                        Withdraw voucher as airtime from your service provider
                      </div>
                    </div>
                  </div>
                </div>
                {/* left bottom */}
                <div className="flex flex-col gap-4 pt-auto justify-start">
                  {/* divider */}
                  <div className="w-full h-[0.1px] mt-4 bg-brand-grayish"></div>
                  <span className="font-Manrope text-[#262626] text-base font-normal flex justify-around items-center gap-3 w-auto xl:w-[353px] tracking-tighter leading-5">
                    Want to use another coupon instead?{" "}
                    <Link
                      href={"/cashout"}
                      className="flex items-center text-[#3B82F6] text-base"
                    >
                      Go Back{" "}
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.263225 12.2368C0.431987 12.4053 0.660751 12.5 0.899267 12.5C1.13778 12.5 1.36655 12.4053 1.53531 12.2368L10.1999 3.5722V10.4007C10.1999 10.6394 10.2947 10.8683 10.4635 11.0371C10.6323 11.2059 10.8612 11.3007 11.0999 11.3007C11.3387 11.3007 11.5676 11.2059 11.7364 11.0371C11.9052 10.8683 12 10.6394 12 10.4007V1.40006C12 1.16135 11.9052 0.932415 11.7364 0.763621C11.5676 0.594827 11.3387 0.5 11.0999 0.5H2.09935C1.86064 0.5 1.6317 0.594827 1.46291 0.763621C1.29411 0.932415 1.19929 1.16135 1.19929 1.40006C1.19929 1.63877 1.29411 1.8677 1.46291 2.0365C1.6317 2.20529 1.86064 2.30012 2.09935 2.30012H8.9278L0.263225 10.9647C0.0946735 11.1335 0 11.3622 0 11.6007C0 11.8392 0.0946735 12.068 0.263225 12.2368Z"
                          fill="#3B82F6"
                        />
                      </svg>{" "}
                    </Link>
                  </span>
                </div>
              </div>
              {/* right */}
              <div className="flex w-full justify-end gap-4 lg:h-[600px] lg:w-[50%]">
                <div className="w-full relative rounded-lg lg:w-[508px] lg:h-[600px]">
                  {oneVoucher && (
                    <FlippingVoucherPreview
                      voucherDetails={oneVoucher}
                      couponCode={oneVoucher?.coupon.couponCode}
                      amount={oneVoucher?.amount}
                    />
                  )}
                  {/* <Image src={right_img} alt="Redeem" priority />
                  <div className="glass-fx hidden absolute w-[90%] bottom-6 left-6 rounded-lg p-4 font-medium text-xl font-geistsans lg:block">
                    Claim your vouchers fast and easily with pays.
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Redeem;
