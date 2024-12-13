"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import right_img from "@/assets/imgs/redeem/redeem_img.png";
import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";
import { error } from "@/helpers/Alert";

const Airtime = ({ setDisplay, voucherCode }: any) => {
  const {
    airtimeBillers,
    getAirtimeBillerInfo,
    cashoutVoucherLoading,
    setCashoutVoucherLoading,
    handleRedeemVoucherAsAirtime,
  }: any = useGeneralContext();

  const [newTransaction, setNewTransaction] = useState({
    email: "",
    fullName: "",
    biller_code: "",
    phone_number: "",
    item_code: "",
    voucherCode: voucherCode,
  });

  const onchangeHandler = async (e: any) => {
    e.persist();
    setNewTransaction((item: any) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, email, voucherCode, biller_code, phone_number } =
      newTransaction;

    // Validate if all fields are filled
    if (!fullName || !email || !voucherCode || !biller_code || !phone_number) {
      error("All fields are required.");
      return;
    }

    // Handle the withdrawal logic here
    handleRedeemVoucherAsAirtime(newTransaction);
  };

  useEffect(() => {
    if (newTransaction.biller_code)
      getAirtimeBillerInfo(newTransaction.biller_code);
  }, [newTransaction.biller_code]);

  return (
    <>
      <div className="max-w-[2560px] mx-auto w-full h-screen flex items-center justify-center">
        {/* content */}
        <div className="min-h-[60%] w-[80%] flex flex-col items-center lg:min-h-[80%]">
          {/* divider */}
          <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish/30"></div>
          <div className="w-full flex justify-between items-start h-[100%]">
            {/* left */}
            <form
              onSubmit={handleSubmit}
              className="w-full h-[100%] flex flex-col justify-between gap-4 lg:h-[600px] lg:w-[50%]"
            >
              {/* left top */}
              <div className="flex flex-col gap-6 justify-start">
                {/* title-bytext */}
                <div className="flex flex-col justify-start font-geistsans mb-4">
                  <span className="font-bold text-4xl text-brand-dark">
                    Let&apos;s get you set up
                  </span>
                  <span className="font-normal text-xs text-brand-dark">
                    Complete the Fields Below – Your Personalized Voucher
                    Experience Awaits!
                  </span>
                </div>
                {/* input fields */}
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Full Name
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter Full Name"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-dark/70 bg-transparent text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email Address"
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-dark/70 bg-transparent text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    placeholder="Enter phone number"
                    onChange={onchangeHandler}
                    // value={newTransaction.accountNumber}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Select Biller <span className="text-red-400">*</span>
                  </span>
                  <select
                    name="biller_code"
                    id="biller_code"
                    // onChange={handleSelectChange}
                    onChange={onchangeHandler}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  >
                    <option>Select a Biller</option>
                    {airtimeBillers &&
                      airtimeBillers?.length > 0 &&
                      airtimeBillers.map((biller: any, index: number) => (
                        <option
                          className="capitalize"
                          value={biller?.biller_code}
                          key={index}
                        >
                          {biller?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* left bottom */}
              <div className="flex flex-col gap-4 pt-auto justify-start">
                {cashoutVoucherLoading ? (
                  <span className="w-[353px] h-[44px] flex items-center justify-center text-brand-white">
                    <Spinner />
                  </span>
                ) : (
                  <button
                    type="submit"
                    className="transition-fx w-[353px] h-[44px] capitalize bg-brand-main/20 cursor-pointer rounded-3xl flex items-center justify-center text-brand-white hover:bg-brand-main"
                  >
                    NEXT
                  </button>
                )}
                {/* divider */}
                <div className="w-[90%] h-[0.1px] mt-4 bg-brand-grayish"></div>
                <span className="font-geistsans text-base font-normal flex items-center gap-2 w-full">
                  Made a wrong turn?{" "}
                  <span
                    onClick={() => setDisplay("")}
                    className="flex items-center
                  text-blue-700 cursor-pointer"
                  >
                    Back to previous{" "}
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
                  </span>
                </span>
              </div>
            </form>
            {/* right */}
            <div className="hidden w-[50%]  justify-end gap-4 lg:h-[600px] lg:flex">
              <div className="relative rounded-lg w-[508px] h-[600px]">
                <Image src={right_img} alt="Login" priority />
                <div className="glass-fx absolute w-[90%] bottom-6 left-6 rounded-lg p-4 font-medium text-xl font-geistsans">
                  Claim your vouchers fast and easily with pays. Pays
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Airtime;
