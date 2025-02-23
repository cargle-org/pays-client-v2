"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import FlipCard from "@/components/FlipCard";
import { useGeneralContext } from "@/context/GenralContext";

const Page = ({ params }: { params: { id: string } }) => {
  const { oneVoucher, setOneVoucherId }: any = useGeneralContext();
  const [display, setDisplay] = useState("vouchers");
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [activeShareCoupon, setActiveShareCoupon] = useState<string | null>(
    null
  );

  const handleShare = async (platform: string, couponCode: string) => {
    const shareData = {
      title: `${oneVoucher?.title} Voucher`,
      text: `You've recieved a voucher - ${couponCode}, visit https://www.usepays.co/cashout to redeem it.`,
      url: window.location.href,
    };

    switch (platform) {
      case "copy":
        await navigator.clipboard.writeText(shareData.text);
        alert("Copied to clipboard!");
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareData.text)}`
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareData.text
          )}`
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            window.location.href
          )}`
        );
        break;
    }
    setActiveShareCoupon(null);
  };

  useEffect(() => {
    if (params?.id) {
      setOneVoucherId(params?.id);
    }
  }, [params?.id]);

  // Set default selected coupon to first one in list
  useEffect(() => {
    if (oneVoucher?.voucherCoupons?.length > 0) {
      setSelectedCoupon(oneVoucher.voucherCoupons[0]);
    }
  }, [oneVoucher]);

  // Close share options when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".share-menu") && !target.closest(".share-icon")) {
        setActiveShareCoupon(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="max-w-md sm:max-w-2xl lg:max-w-[1440px] flex flex-col gap-4 justify-start w-full mx-auto">
        {/* breadcumb */}
        <div className="flex items-center gap-2 font-geistsans font-normal text-[10px] text-brand-grayish">
          <Link
            href={"/dashboard/vouchers"}
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
              </div>
            </div>
            <div className="rounded-t-xl bg-brand-white p-4 flex flex-col gap-4 justify-between items-center">
              <div className="flex flex-col gap-4 w-full justify-between items-start xl:flex-row">
                <div className="max-w-sm sm:max-w-full lg:max-w-xl relative w-full h-[250px] sm:h-3/4">
                  <FlipCard voucherDetails={oneVoucher} />
                </div>
                <div className="flex flex-col w-full">
                  <div className="rounded-xl bg-brand-white sm:p-4 flex flex-col gap-4 justify-start">
                    <div className="flex items-center gap-1.5 sm:gap-4">
                      <span
                        onClick={() => setDisplay("vouchers")}
                        className={`transition-fx font-semibold sm:font-bold sm:text-base text-brand-main p-1.5 sm:p-2 rounded-lg cursor-pointer leading-4 tracking-tighter ${
                          display === "vouchers" &&
                          "bg-brand-main text-brand-white hover:bg-brand-main"
                        } hover:bg-brand-main/30`}
                      >
                        Vouchers
                      </span>
                      <span
                        onClick={() => setDisplay("recipients")}
                        className={`transition-fx font-semibold sm:font-bold sm:text-base text-brand-main p-1.5 sm:p-2 rounded-lg cursor-pointer leading-4 tracking-tighter ${
                          display === "recipients" &&
                          "bg-brand-main text-brand-white hover:bg-brand-main"
                        } hover:bg-brand-main/30 `}
                      >
                        Recipients
                      </span>
                      <span
                        onClick={() => setDisplay("description")}
                        className={`transition-fx font-semibold sm:font-bold sm:text-base text-brand-main p-1.5 sm:p-2 rounded-lg cursor-pointer leading-4 tracking-tighter ${
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
                            <th className="py-2">Share</th>
                          </tr>
                        </thead>
                        <tbody className="font-normal text-sm text-brand-grayish/80">
                          {oneVoucher?.voucherCoupons?.length > 0 ? (
                            oneVoucher?.voucherCoupons?.map(
                              (item: any, i: number) => (
                                <tr
                                  key={i}
                                  className={`mb-4 rounded-lg hover:bg-gray-100 cursor-pointer ${
                                    selectedCoupon?.couponCode ===
                                    item.couponCode
                                      ? "bg-gray-100"
                                      : ""
                                  }`}
                                  onClick={() => setSelectedCoupon(item)}
                                >
                                  <td className="py-2">{i + 1}</td>
                                  <td className="py-2 tracking-tighter">
                                    {item.couponCode}
                                  </td>
                                  <td className="py-2 capitalize tracking-tighter">
                                    {item.status}
                                  </td>

                                  <td className="py-2">
                                    <div className="relative flex justify-center">
                                      <span
                                        className="share-icon cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveShareCoupon(
                                            activeShareCoupon ===
                                              item.couponCode
                                              ? null
                                              : item.couponCode
                                          );
                                        }}
                                      >
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                                        </svg>
                                      </span>
                                      {activeShareCoupon ===
                                        item.couponCode && (
                                        <div className="share-menu absolute right-0 mt-8 bg-white rounded-lg shadow-lg p-2 z-10">
                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleShare(
                                                "copy",
                                                item.couponCode
                                              );
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                          >
                                            Copy Link
                                          </div>
                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleShare(
                                                "whatsapp",
                                                item.couponCode
                                              );
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                          >
                                            WhatsApp
                                          </div>
                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleShare(
                                                "twitter",
                                                item.couponCode
                                              );
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                          >
                                            Twitter
                                          </div>
                                          <div
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleShare(
                                                "facebook",
                                                item.couponCode
                                              );
                                            }}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                          >
                                            Facebook
                                          </div>
                                        </div>
                                      )}
                                    </div>
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
                            <th className="py-2">Email Address</th>
                          </tr>
                        </thead>
                        <tbody className="font-normal text-sm text-brand-grayish/80">
                          {oneVoucher?.recipients?.length > 0 ? (
                            oneVoucher?.recipients?.map(
                              (item: any, i: number) => (
                                <tr key={i} className="mb-4 rounded-lg">
                                  <td className="py-2">{i + 1}</td>
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
                  className="p-1 sm:p-3 px-3 sm:px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-sm sm:text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
                >
                  Back
                </Link>
                <Link
                  href={"/dashboard/vouchers/create"}
                  className="p-1 sm:p-3 px-3 sm:px-8 bg-brand-main text-brand-white font-normal text-sm sm:text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
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
