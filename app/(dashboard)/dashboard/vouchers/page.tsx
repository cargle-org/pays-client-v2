"use client";

import MainLayout from "@/app/(main)/layout";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/imgs/vouchers/voucher_img.png";
import { useGeneralContext } from "@/context/GenralContext";
import Link from "next/link";
import Spinner from "@/components/spinner/Spinner";

const Page = () => {
  const { allUserVouchers, fetchVouchersLoading }: any = useGeneralContext();
  console.log("🚀 ~ Page ~ allUserVouchers:", allUserVouchers);
  const router = useRouter();
  const checkToken = async () => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.push(`/auth/login`);
      return <MainLayout />;
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center pb-2 border-b-[0.3px]">
          <div className="flex flex-col justify-start gap-2 font-geistsans mb-4">
            <span className="font-bold text-4xl text-brand-dark">
              My Vouchers
            </span>
            <span className="font-normal text-sm text-brand-grayish">
              Unlock Exclusive Savings with Your Personal Voucher Collection
            </span>
          </div>
          <Link
            href={"/dashboard/vouchers/create"}
            className="transition-fx flex items-center gap-2 p-2 px-4 rounded-3xl bg-brand-main text-brand-white font-geistsans text-base font-normal cursor-pointer hover:bg-brand-main/50"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0C6.12902 0 6.25276 0.0512546 6.344 0.142489C6.43523 0.233722 6.48649 0.357462 6.48649 0.486486V5.51351H11.5135C11.6425 5.51351 11.7663 5.56477 11.8575 5.656C11.9487 5.74724 12 5.87098 12 6C12 6.12902 11.9487 6.25276 11.8575 6.344C11.7663 6.43523 11.6425 6.48649 11.5135 6.48649H6.48649V11.5135C6.48649 11.6425 6.43523 11.7663 6.344 11.8575C6.25276 11.9487 6.12902 12 6 12C5.87098 12 5.74724 11.9487 5.656 11.8575C5.56477 11.7663 5.51351 11.6425 5.51351 11.5135V6.48649H0.486486C0.357462 6.48649 0.233722 6.43523 0.142489 6.344C0.0512546 6.25276 0 6.12902 0 6C0 5.87098 0.0512546 5.74724 0.142489 5.656C0.233722 5.56477 0.357462 5.51351 0.486486 5.51351H5.51351V0.486486C5.51351 0.357462 5.56477 0.233722 5.656 0.142489C5.74724 0.0512546 5.87098 0 6 0Z"
                fill="white"
              />
            </svg>
            Create Voucher
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 my-6">
        <div className="w-full flex justify-between items-center">
          <span className="font-geistmono font-normal text-2xl">
            Vouchers you created
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 px-4 font-geistsans font-normal text-sm rounded-3xl bg-brand-white text-brand-main">
              ₦ Amount{" "}
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.67188 1.00586L4.67187 4.00586L1.67187 1.00586"
                  stroke="#61666B"
                  strokeWidth="1.49937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 p-2 px-4 font-geistsans font-normal text-sm rounded-3xl bg-brand-white text-brand-main">
              Status{" "}
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.67188 1.00586L4.67187 4.00586L1.67187 1.00586"
                  stroke="#61666B"
                  strokeWidth="1.49937"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-brand-white rounded-lg p-8 flex flex-col gap-6 justify-start">
          {/* voucher */}
          {allUserVouchers?.length > 0 ? (
            allUserVouchers.map((item: any, i: number) => (
              <div key={i} className="border-[0.3px] rounded-xl p-4 w-full">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4 w-[70%]">
                    {/* left */}
                    <div className="flex gap-4 pr-4 w-[50%]">
                      {item.thumbnail ? (
                        <Image
                          src={item?.thumbnail}
                          alt="Login"
                          width={80}
                          height={80}
                          priority
                          className="rounded-lg"
                        />
                      ) : (
                        <Image
                          src={logo}
                          alt="Login"
                          width={80}
                          height={80}
                          priority
                          className="rounded-lg"
                        />
                      )}
                      <div className="flex flex-col justify-center gap-2">
                        <span className="font-geistsans text-2xl font-medium capitalize">
                          {item.title}
                        </span>
                        <span className="font-geistsans text-base font-normal">
                          {item.voucherKey}
                        </span>
                      </div>
                    </div>
                    {/* middle */}
                    <div className="flex justify-evenly gap-8 items-center px-4 border-l-[0.3px] min-w-[50%]">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-brand-grayish font-normal text-xs font-geistsans">
                          Amount
                        </span>
                        <span className="text-brand-grayish font-normal text-xs font-geistsans border-[0.3px] rounded-xl px-[6px] py-[2px]">
                          ₦{item.amountPerVoucher}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="w-max  text-brand-grayish font-normal text-xs font-geistsans">
                          Cashed Vouchers
                        </span>
                        <span className="text-brand-grayish font-normal text-xs w-max font-geistsans border-[0.3px] rounded-xl px-[6px] py-[2px]">
                          {item.vouchersCashed} / {item.totalNumberOfVouchers}{" "}
                          Vouchers
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="text-brand-grayish font-normal text-xs font-geistsans">
                          Description of Voucher
                        </span>
                        <span className="text-brand-grayish font-normal text-xs w-max font-geistsans border-[0.3px] rounded-xl px-[6px] py-[2px]">
                          {item.description.slice(0, 40)}{" "}
                          {item.description.length > 40 && "..."}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <Link
                    href={`/dashboard/vouchers/${item._id}`}
                    className="transition-fx p-4 px-6 rounded-lg flex items-center justify-center bg-brand-grayish cursor-pointer hover:bg-brand-main"
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.70637 6.29318C7.89384 6.48071 7.99915 6.73502 7.99915 7.00018C7.99915 7.26534 7.89384 7.51965 7.70637 7.70718L2.04937 13.3642C1.95712 13.4597 1.84678 13.5359 1.72477 13.5883C1.60277 13.6407 1.47155 13.6683 1.33877 13.6694C1.20599 13.6706 1.07431 13.6453 0.951413 13.595C0.828516 13.5447 0.716864 13.4705 0.622971 13.3766C0.529078 13.2827 0.454825 13.171 0.404544 13.0481C0.354264 12.9252 0.328962 12.7936 0.330116 12.6608C0.33127 12.528 0.358856 12.3968 0.411265 12.2748C0.463674 12.1528 0.539856 12.0424 0.635366 11.9502L5.58537 7.00018L0.635366 2.05018C0.453208 1.86158 0.352414 1.60898 0.354692 1.34678C0.35697 1.08458 0.462139 0.83377 0.647547 0.648362C0.832955 0.462954 1.08377 0.357785 1.34597 0.355507C1.60816 0.353228 1.86076 0.454022 2.04937 0.636181L7.70637 6.29318Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <>
              {fetchVouchersLoading ? (
                <div className="w-full flex items-center justify-center mx-auto">
                  <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                    <Spinner />
                  </span>
                </div>
              ) : (
                <span className="w-full flex items-center justify-center font-geistsans font-medium text-brand-main text-lg">
                  NO VOUCHER YET
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
