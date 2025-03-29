"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";

const Page = () => {
  //extract params from url
  const params = useParams();
  const { id } = params;

  const {
    oneGuestVoucherId,
    oneVoucher,
    getGuestVoucherById,
    setOneGuestVoucherId,
    setOneTransactionId,
    handleGuestFundWallet,
    setOneVoucherId,
    createTransactionLoading,
  }: any = useGeneralContext();

  const [newTransaction, setNewTransaction] = useState<{
    email: string;
  }>({
    email: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email } = newTransaction;

    // Validate if all fields are filled
    if (!email) {
      setError("All fields are required.");
      setNewTransaction({
        email: "",
      });
      return;
    }

    setNewTransaction({
      email: "",
    });

    setError(""); // Clear error message

    handleGuestFundWallet(newTransaction?.email);
  };

  useEffect(() => {
    setOneTransactionId(oneVoucher?.transactionId);

    //set voucher Id params
    setOneGuestVoucherId(id);
  }, [id]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl lg:max-w-[1280px] flex flex-col w-full"
    >
      <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-2 justify-start h-[80vh]">
        <div className="flex flex-col gap-2 justify-start w-full pt-4">
          <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
            Step 2 of 2
          </div>
          <span className="font-bold font-geistsans text-2xl sm:text-3xl text-brand-dark">
            Fund Your Voucher
          </span>
        </div>
        {/* input fields */}
        <div className="flex flex-col gap-4 justify-start my-8">
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex flex-col justify-start">
            <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
              E-mail (Ensure a valid email){" "}
              <span className="text-red-400">*</span>
            </span>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter E-mail"
              onChange={(e) => setNewTransaction({ email: e.target.value })}
              // value={newTransaction.amount}
              className="sm:w-auto w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
            />
          </div>
        </div>
        {/* bottom buttons */}
        <div className="rounded-b-xl bg-brand-white p-4 flex justify-end mt-auto items-center border border-brand-grayish/15">
          {createTransactionLoading ? (
            <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
              <Spinner />
            </span>
          ) : (
            newTransaction.email.length >= 10 && (
              <button
                type="submit"
                className="p-1.5 sm:p-3 px-4 smm:px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
              >
                Continue
              </button>
            )
          )}
        </div>
      </div>
    </form>
  );
};

export default Page;
