"use client";

import { useGeneralContext } from "@/context/GenralContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { oneVoucher, setOneVoucherId }: any = useGeneralContext();
  console.log("🚀 ~ Page ~ oneVoucher:", oneVoucher);
  const [display, setDisplay] = useState("vouchers");

  useEffect(() => {
    if (params?.id) {
      setOneVoucherId(params?.id);
    }
  }, [params?.id]);

  return (
    <>
      <div className="flex flex-col gap-4 justify-start w-full mx-auto">
        {/* breadcumb */}
        <div className="flex items-center gap-2 font-geistsans font-normal text-[10px] text-brand-grayish">
          <Link
            href={"/dashboaard/vouchers"}
            className="transition-fx cursor-pointer hover:text-brand-main"
          >
            Voucher
          </Link>{" "}
          <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.61018 3.71009C4.72735 3.8273 4.79317 3.98624 4.79317 4.15197C4.79317 4.3177 4.72735 4.47664 4.61018 4.59384L1.07456 8.12947C1.0169 8.18916 0.947936 8.23678 0.871683 8.26953C0.795431 8.30229 0.713418 8.31953 0.630431 8.32025C0.547444 8.32097 0.465144 8.30516 0.388334 8.27373C0.311524 8.24231 0.241741 8.1959 0.183058 8.13721C0.124375 8.07853 0.077967 8.00875 0.0465414 7.93194C0.0151159 7.85513 -0.000697537 7.77283 2.35982e-05 7.68984C0.000744733 7.60686 0.0179862 7.52484 0.0507418 7.44859C0.0834974 7.37234 0.131111 7.30337 0.190805 7.24572L3.28456 4.15197L0.190805 1.05822C0.0769562 0.940342 0.0139597 0.782465 0.0153837 0.618592C0.0168077 0.454719 0.0825382 0.297962 0.198418 0.182082C0.314298 0.0662015 0.471056 0.000471076 0.634929 -0.000952936C0.798802 -0.00237695 0.956679 0.0606195 1.07456 0.174468L4.61018 3.71009Z"
              fill="#C4C4C4"
            />
          </svg>
          View Voucher
        </div>
        <div className="flex gap-2 items-start justify-between">
          {/* body */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-2 border-b-[0.3px]">
                {/* title/by-text */}
                <div className="flex flex-col justify-start gap-2 font-geistsans mb-4">
                  <span className="font-bold text-4xl text-brand-dark">
                    Voucher Preview
                  </span>
                  <span className="font-normal text-sm text-brand-grayish">
                    This is a preview of the created voucher for shares.
                  </span>
                </div>
                {/* share/message */}
                <div className="flex items-center gap-2">
                  <span className="cursor-pointer">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="17.5"
                        fill="white"
                        stroke="#E9E9E9"
                      />
                      <path
                        d="M10.5 13.8337C10.5 13.3916 10.6756 12.9677 10.9882 12.6551C11.3007 12.3426 11.7246 12.167 12.1667 12.167H23.8333C24.2754 12.167 24.6993 12.3426 25.0118 12.6551C25.3244 12.9677 25.5 13.3916 25.5 13.8337V22.167C25.5 22.609 25.3244 23.0329 25.0118 23.3455C24.6993 23.6581 24.2754 23.8337 23.8333 23.8337H12.1667C11.7246 23.8337 11.3007 23.6581 10.9882 23.3455C10.6756 23.0329 10.5 22.609 10.5 22.167V13.8337Z"
                        stroke="#1F0047"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.5 13.834L18 18.834L25.5 13.834"
                        stroke="#1F0047"
                        stroke-width="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="cursor-pointer">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="17.5"
                        fill="white"
                        stroke="#E9E9E9"
                      />
                      <path
                        d="M23 21.4003C22.3667 21.4003 21.8 21.6503 21.3667 22.042L15.425 18.5837C15.4667 18.392 15.5 18.2003 15.5 18.0003C15.5 17.8003 15.4667 17.6087 15.425 17.417L21.3 13.992C21.75 14.4087 22.3417 14.667 23 14.667C24.3833 14.667 25.5 13.5503 25.5 12.167C25.5 10.7837 24.3833 9.66699 23 9.66699C21.6167 9.66699 20.5 10.7837 20.5 12.167C20.5 12.367 20.5333 12.5587 20.575 12.7503L14.7 16.1753C14.25 15.7587 13.6583 15.5003 13 15.5003C11.6167 15.5003 10.5 16.617 10.5 18.0003C10.5 19.3837 11.6167 20.5003 13 20.5003C13.6583 20.5003 14.25 20.242 14.7 19.8253L20.6333 23.292C20.5917 23.467 20.5667 23.6503 20.5667 23.8337C20.5667 25.1753 21.6583 26.267 23 26.267C24.3417 26.267 25.4333 25.1753 25.4333 23.8337C25.4333 22.492 24.3417 21.4003 23 21.4003Z"
                        fill="#1F0047"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-t-xl bg-brand-white p-4 flex flex-col gap-4 justify-between items-center">
              <div className="flex w-full justify-between items-start">
                <div className="w-[50%] min-h-[40vh] rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 flex flex-col gap-4 items-start">
                  <div className="w-full flex justify-end">
                    <Image
                      src={oneVoucher?.thumbnail}
                      width={180}
                      height={180}
                      alt={"thumbnail"}
                    />
                  </div>
                  <div className="w-[60%] flex flex-col items-start justify-between">
                    <span className="text-lg font-bold text-brand-white lg:text-3xl">
                      {oneVoucher?.title}
                    </span>
                    <span className="text-lg font-semibold font-geistmono text-brand-white/50 mb-2 lg:text-2xl">
                      {oneVoucher?.voucherKey}
                    </span>
                    <span className="w-[60%] text-lg font-medium font-geistmono text-brand-white/60 lg:text-lg">
                      ₦{oneVoucher?.amountPerVoucher} voucher
                    </span>
                    <span className="w-[60%] text-lg font-medium font-geistmono text-brand-white/60 lg:text-lg">
                      {oneVoucher?.cashedPercentage}% cashed
                    </span>
                  </div>
                </div>
                <div className="flex flex-col w-max lg:w-[50%]">
                  <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start">
                    <div className="flex items-center gap-4">
                      <span
                        onClick={() => setDisplay("vouchers")}
                        className={`transition-fx font-bold text-base text-brand-main p-2 rounded-lg cursor-pointer ${
                          display === "vouchers" &&
                          "bg-brand-main text-brand-white hover:bg-brand-main"
                        } hover:bg-brand-main/30`}
                      >
                        Vouchers
                      </span>
                      <span
                        onClick={() => setDisplay("recipients")}
                        className={`transition-fx font-bold text-base text-brand-main p-2 rounded-lg cursor-pointer ${
                          display === "recipients" &&
                          "bg-brand-main text-brand-white hover:bg-brand-main"
                        } hover:bg-brand-main/30 `}
                      >
                        Recipients
                      </span>
                      <span
                        onClick={() => setDisplay("description")}
                        className={`transition-fx font-bold text-base text-brand-main p-2 rounded-lg cursor-pointer ${
                          display === "description" &&
                          "bg-brand-main text-brand-white hover:bg-brand-main"
                        } hover:bg-brand-main/30 `}
                      >
                        Description
                      </span>
                    </div>
                    {display === "vouchers" && (
                      <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
                        <thead className="divide-y divide-gray-200 font-bold text-sm text-brand-grayish p-4 mb-2">
                          <tr className="rounded-lg">
                            <th className="py-2">S/N</th>
                            <th className="py-2">Coupons</th>
                            <th className="py-2">Status</th>
                            <th className="py-2">Cashed Date</th>
                          </tr>
                        </thead>
                        <tbody className="font-normal text-sm text-brand-grayish/80">
                          {oneVoucher?.voucherCoupons?.length > 0 ? (
                            oneVoucher?.voucherCoupons?.map(
                              (item: any, i: number) => (
                                <tr key={i} className="mb-4 rounded-lg">
                                  <td className="py-2">{i + 1}</td>
                                  <td className="py-2">{item.couponCode}</td>
                                  <td className="py-2 capitalize">
                                    {item.status}
                                  </td>
                                  <td className="py-2 capitalize">
                                    {item.cashedDate}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr className="mb-4 rounded-lg">
                              <td className="py-2" colSpan={4}>
                                No Coupons available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                    {display === "recipients" && (
                      <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
                        <thead className="divide-y divide-gray-200 font-bold text-sm text-brand-grayish p-4 mb-2">
                          <tr className="rounded-lg">
                            <th className="py-2">S/N</th>
                            {/* <th className="py-2">Name</th>
                            <th className="py-2">Number</th> */}
                            <th className="py-2">Email Address</th>
                          </tr>
                        </thead>
                        <tbody className="font-normal text-sm text-brand-grayish/80">
                          {oneVoucher?.recipients?.length > 0 ? (
                            oneVoucher?.recipients?.map(
                              (item: any, i: number) => (
                                <tr key={i} className="mb-4 rounded-lg">
                                  <td className="py-2">{i + 1}</td>
                                  {/* <td className="py-2 capitalize">
                                    {item.recipient_name}
                                  </td>
                                  <td className="py-2 capitalize">
                                    {item.recipient_phone}
                                  </td> */}
                                  <td className="py-2 capitalize">
                                    {item.recipient_email}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr className="mb-4 rounded-lg">
                              <td className="py-2" colSpan={4}>
                                No Recipients available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}
                    {display === "description" && (
                      <span className="font-geistsans font-normal text-sm text-brand-grayish">
                        {oneVoucher?.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* bottom buttons */}
              <div className="w-full rounded-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15">
                <Link
                  href={"/dashboard/vouchers"}
                  className="py-3 px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
                >
                  Back
                </Link>
                <Link
                  href={"/dashboard/vouchers/create"}
                  className="p-3 px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
                >
                  create voucher
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
