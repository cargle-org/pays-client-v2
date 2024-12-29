"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import right_img from "@/assets/imgs/redeem/redeem_img.png";
import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";

const Redeem = ({ params }: { params: { id: string } }) => {
  console.log("🚀 ~ Redeem ~ params:", params);
  const {
    handlePayToLink,
    setPayToLinkDetails,
    createPaymentLinkLoading,
  }: any = useGeneralContext();

  const onchangeHandler = async (e: any) => {
    e.persist();
    setPayToLinkDetails((payToLinkDetails: any) => ({
      ...payToLinkDetails,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (params?.id)
      setPayToLinkDetails((payToLinkDetails: any) => ({
        ...payToLinkDetails,
        link: `https://www.usepays.co/pay/${params?.id}`,
      }));
  }, [params?.id]);

  return (
    <>
      <div className="max-w-md lg:max-w-[2560px] mx-auto w-full min-h-screen flex items-center justify-center py-16 lg:pt-32">
        {/* content */}
        <div className="min-h-[60%] w-[80%] flex flex-col items-center lg:min-h-[80%]">
          {/* divider */}
          <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish/30"></div>
          <div className="w-full flex flex-col-reverse justify-between items-start gap-6 h-[100%] lg:flex-row lg:space-x-5">
            {/* left */}
            <form
              onSubmit={handlePayToLink}
              className="w-full h-[100%] flex flex-col justify-between gap-4 lg:h-[600px] lg:w-[50%]"
            >
              {/* left top */}
              <div className="flex flex-col gap-6 justify-start">
                {/* title-bytext */}
                <div className="flex flex-col justify-start font-geistsans mb-4">
                  <span className="font-bold text-4xl text-brand-dark">
                    Pay Via Link
                  </span>
                  <span className="font-normal text-xs text-brand-dark">
                    Someone shared you this link, pay into it.
                  </span>
                </div>
                {/* input fields */}
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    onChange={onchangeHandler}
                    className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    onChange={onchangeHandler}
                    className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                {/* <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Enter Amount
                  </span>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    placeholder="Enter Amount"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                  />
                </div> */}
              </div>
              {/* left bottom */}
              <div className="flex flex-col gap-4 pt-auto justify-start">
                {createPaymentLinkLoading ? (
                  <span className="w-[353px] h-[44px] flex items-center justify-center text-brand-white">
                    <Spinner />
                  </span>
                ) : (
                  <button
                    type="submit"
                    className="transition-fx w-auto xl:w-[353px] h-[44px] capitalize bg-brand-main/20 cursor-pointer rounded-3xl flex items-center justify-center text-brand-white hover:bg-brand-main"
                  >
                    NEXT
                  </button>
                )}
                {/* divider */}
                <div className="w-full h-[0.1px] mt-4 bg-brand-grayish"></div>
              </div>
            </form>
            {/* right */}
            <div className="flex w-full justify-end gap-4 lg:h-[600px] lg:w-[50%]">
              <div className="w-full relative rounded-lg lg:w-[508px] lg:h-[600px]">
                <Image src={right_img} alt="Redeem" priority />
                <div className="glass-fx hidden absolute w-[90%] bottom-6 left-6 rounded-lg p-4 font-medium text-xl font-geistsans lg:block">
                  Fund wallets via payment links.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Redeem;
