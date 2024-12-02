"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import left from "@/assets/imgs/landing/hero_left1.png";
import right from "@/assets/imgs/landing/hero_right.png";
import hero_mid_top from "@/assets/imgs/landing/hero_mid_top.png";
import hero_mid_bottom from "@/assets/imgs/landing/hero_mid_bottom.png";
import hero_users from "@/assets/imgs/landing/hero_users.png";
import hero_gift_icon from "@/assets/imgs/landing/hero_gift_icon.png";
import hero_naira_icon from "@/assets/imgs/landing/hero_naira_icon.png";
import Image from "next/image";
import { useGeneralContext } from "@/context/GenralContext";

const Page = () => {
  const router = useRouter();
  const { homepageStats }: any = useGeneralContext();
  console.log("🚀 ~ Page ~ homepageStats:", homepageStats);

  function formatNumberToK(number: any) {
    console.log("🚀 ~ formatNumberToK ~ number:", number);
    const newNumber = parseInt(number) * 10;
    if (newNumber >= 1000) {
      return `${(newNumber / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return newNumber.toLocaleString("en-NG");
  }

  return (
    <>
      <div className="w-full min-h-screen pt-16 pb-12 flex items-center justify-center gap-8 lg:pt-32">
        <div className="w-[90%] flex flex-col gap-8 lg:w-[80%]">
          <div className="flex flex-col gap-4 items-center justify-center">
            <span className="w-full text-center text-brand dark font-medium text-3xl font-geistsans lg:w-[80%] lg:text-6xl">
              Gift, unwrap, and indulge in unforgettable adventures with our
              exclusive vouchers today.
            </span>
            <span className="font-medium text-center text-base text-brand-dark/70">
              Easily create and cashout vouchers, bringing smiles to your
              customers&apos; faces{" "}
            </span>
            <div className="flex flex-col items-center gap-4 justify-center lg:flex-row">
              <Link
                href={"/dashboard/vouchers/create"}
                className="transition-fx shadow-lg rounded-3xl cursor-pointer font-medium text-xl uppercase py-2 px-4 bg-brand-white flex items-center justify-center gap-4 text-brand-main hover:bg-brand-main hover:text-brand-white"
              >
                CREATE VOUCHER{" "}
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
              </Link>
              <Link
                href={"/cashout"}
                className="transition-fx shadow-lg rounded-3xl cursor-pointer font-medium text-xl uppercase py-2 px-4 bg-brand-main flex items-center justify-center gap-4 text-brand-white hover:bg-brand-white hover:text-brand-main"
              >
                CASHOUT VOUCHER{" "}
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
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-2 lg:flex-row lg:items-end lg:mt-8 lg:mb-8">
            {/* left */}
            <Image src={left} alt="left" width={320} height={380} priority />

            {/* mid */}
            <div className="flex flex-col gap-2">
              <Image
                src={hero_mid_top}
                alt="hero_mid_top"
                width={320}
                height={380}
                priority
              />{" "}
              <Image
                src={hero_mid_bottom}
                alt="hero_mid_bottom"
                width={320}
                height={380}
                priority
              />
            </div>
            {/* right */}
            {/* <Image src={right} alt="right" width={320} height={380} priority /> */}
            <div className="flex flex-col gap-2 w-[320px]">
              <div className="w-full rounded-lg border-brand-grayish/15 shadow border-[0.1px] flex flex-col gap-6 p-6 bg-brand-white">
                <Image
                  src={hero_users}
                  alt="hero_users"
                  width={201}
                  height={36}
                  priority
                />
                <div className="w-full flex flex-col gap-2 font-geistsans">
                  <span className="text-sm font-light">Active Users</span>
                  <span className="text-xl font-medium lg:text-3xl">
                    {formatNumberToK(homepageStats?.users || 3200)}
                  </span>
                </div>
              </div>
              <div className="w-full flex gap-2">
                <div className="w-1/2 rounded-lg border-brand-grayish/15 shadow border-[0.1px] flex flex-col gap-6 p-6 bg-brand-white">
                  <Image
                    src={hero_gift_icon}
                    alt="hero_gift_icon"
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="w-full flex flex-col gap-2 font-geistsans">
                    <span className="text-base font-light flex flex-col gap-1">
                      <span>Vouchers</span> Created
                    </span>
                    <span className="text-xl font-medium lg:text-3xl">
                      {formatNumberToK(homepageStats?.vouchersCreated || 15000)}
                    </span>
                  </div>
                </div>
                <div className="w-1/2 rounded-lg border-brand-grayish/15 shadow border-[0.1px] flex flex-col gap-6 p-6 bg-brand-white">
                  <Image
                    src={hero_naira_icon}
                    alt="hero_gift_icon"
                    width={40}
                    height={40}
                    priority
                  />
                  <div className="w-full flex flex-col gap-2 font-geistsans">
                    <span className="text-base font-light flex flex-col gap-1">
                      <span>Amount</span> Cashed
                    </span>
                    <span className="text-xl font-medium lg:text-3xl">
                      ₦{formatNumberToK(homepageStats?.amountCashed || 73420)}
                    </span>
                  </div>
                </div>
              </div>
              {/* <Image
                src={hero_mid_top}
                alt="hero_mid_top"
                width={320}
                height={380}
                priority
              />{" "}
              <Image
                src={hero_mid_bottom}
                alt="hero_mid_bottom"
                width={320}
                height={380}
                priority
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
