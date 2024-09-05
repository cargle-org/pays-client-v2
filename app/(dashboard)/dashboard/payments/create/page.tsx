"use client";

import React, { useEffect, useState } from "react";
import { useGeneralContext } from "@/context/GenralContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { success, error } from "@/helpers/Alert";
import Spinner from "@/components/spinner/Spinner";

const Page = () => {
  const router = useRouter();
  const {
    user,
    paymentLinkCategories,
    handleCreatePaymentLink,
    createPaymentLinkLoading,
    setCreatePaymentLinkLoading,
  }: any = useGeneralContext();

  const [formatTitle, setFormatTitle] = useState("");
  const [formatName, setFormatName] = useState("");
  const [newPaymentLinkDetails, setNewPaymentLinkDetails] = useState({
    category: "",
    title: "",
    description: "",
    link: "",
    linkExpiry: "",
    amount: "",
  });

  const onchangeHandler = (e: any) => {
    setNewPaymentLinkDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    try {
      // console.log(
      //   "🚀 ~ onSubmit ~ newPaymentLinkDetails:",
      //   newPaymentLinkDetails
      // );
      e.preventDefault();
      handleCreatePaymentLink(newPaymentLinkDetails);
    } catch (err: any) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      setCreatePaymentLinkLoading(false);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
    }
  };

  useEffect(() => {
    const formattedTitle = newPaymentLinkDetails?.title.replace(/\s/g, "");
    setFormatTitle(formattedTitle);
    setNewPaymentLinkDetails((prev) => ({
      ...prev,
      link: `https://www.usepays.co/pay/${formatName}/${formatTitle}`,
    }));
  }, [newPaymentLinkDetails?.title]);

  useEffect(() => {
    const formattedName = user?.name.replace(/\s/g, "");
    setFormatName(formattedName);
    setNewPaymentLinkDetails((prev) => ({
      ...prev,
      link: `https://www.usepays.co/pay/${formatName}/${formatTitle}`,
    }));
  }, [user?.name]);

  return (
    <>
      <div className="flex flex-col gap-4 justify-start w-full mx-auto">
        {/* breadcumb */}
        <div className="flex items-center gap-2 font-geistsans font-normal text-[10px] text-brand-grayish">
          <Link
            href={"/dashboard/payments"}
            className="transition-fx cursor-pointer hover:text-brand-main"
          >
            Payment Links
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
          Payment Link Creation
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-2 items-start justify-between"
        >
          {/* left */}
          <div className="flex flex-col w-max lg:w-[50%]">
            <div className="rounded-t-xl bg-brand-white p-4 flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-2 justify-start w-full">
                <span className="font-bold font-geistsans text-3xl text-brand-dark">
                  Create Payment Link
                </span>
              </div>
              {/* Inputs */}
              <div className="flex flex-col gap-3 justify-start">
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Payment Title <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Payment Title"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Amount <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Select Category <span className="text-red-400">*</span>
                  </span>
                  <select
                    name="category"
                    id="category"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  >
                    <option value="">Select a category</option>
                    {paymentLinkCategories?.length > 0 &&
                      paymentLinkCategories.map(
                        (category: any, index: number) => (
                          <option
                            className="capitalize"
                            value={category}
                            key={index}
                          >
                            {category}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Expiry Date <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    name="linkExpiry"
                    id="linkExpiry"
                    placeholder="Enter voucher expiry date"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Description <span className="text-red-400">*</span>
                  </span>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Enter a brief description"
                    onChange={onchangeHandler}
                    rows={3}
                    className="w-[353px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  ></textarea>
                </div>
              </div>
            </div>
            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15">
              <Link
                href={"/dashboard/vouchers"}
                className="py-3 px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
              >
                Back
              </Link>
              {createPaymentLinkLoading ? (
                <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                <button
                  type="submit"
                  className="p-3 px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
