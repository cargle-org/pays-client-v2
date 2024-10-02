"use client";

import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";
import React, { useState } from "react";

const Fund = () => {
  const { handleFundWallet, createTransactionLoading }: any =
    useGeneralContext();

  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
  });
  const [error, setError] = useState("");

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount } = newTransaction;

    // Validate if all fields are filled
    if (!amount) {
      setError("All fields are required.");
      return;
    }

    setNewTransaction({
      amount: 0,
    });
    setError(""); // Clear error message

    handleFundWallet(newTransaction?.amount);
  };

  return (
    <>
      {/* left */}
      <form onSubmit={handleSubmit} className="flex flex-col w-max lg:w-[50%]">
        <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-2 justify-start h-[80vh]">
          <div className="flex flex-col gap-2 justify-start w-full pt-4">
            <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
              Step 2 of 2
            </div>
            <span className="font-bold font-geistsans text-3xl text-brand-dark">
              Fund Your Wallet
            </span>
          </div>
          {/* input fields */}
          <div
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4 justify-start my-8"
          >
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex flex-col justify-start">
              <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                Amount (Minimum of ₦1,000){" "}
                <span className="text-red-400">*</span>
              </span>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                onChange={onchangeHandler}
                // value={newTransaction.amount}
                className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
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
              newTransaction.amount >= 1000 && (
                <button
                  type="submit"
                  // onClick={() => updateVoucherTransactions()}
                  className="p-3 px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
                >
                  Continue
                </button>
              )
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default Fund;
