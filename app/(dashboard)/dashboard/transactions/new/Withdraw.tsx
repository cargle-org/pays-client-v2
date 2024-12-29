"use client";

import React, { useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import getAccountBanks from "@/components/getBanks";
import { useGeneralContext } from "@/context/GenralContext";

const Withdraw = () => {
  const { allBanks, handleWithdrawFromWallet, createTransactionLoading }: any =
    useGeneralContext();

  const [suggestedBanks, setSuggestedBanks] = useState<any>([]);
  // const [accountNumber, setAccountNumber] = useState("");
  const [showOtherBanks, setShowOtherBanks] = useState(false);
  const [error, setError] = useState("");

  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    bankCode: "",
    accountNumber: "",
  });

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchBanks = async (accountNumber: string) => {
    try {
      const fetchedSuggestedBanks = await getAccountBanks(
        accountNumber,
        allBanks
      );
      setSuggestedBanks(fetchedSuggestedBanks);
    } catch (error) {
      console.error("Error fetching suggested banks:", error);
    }
  };

  const getAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    // setAccountNumber(value);

    if (value.length === 10) {
      fetchBanks(value);
      setNewTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;

    if (value === "other") {
      setShowOtherBanks(true);
    } else {
      setShowOtherBanks(false);
      setNewTransaction((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { amount, bankCode, accountNumber } = newTransaction;

    // Validate if all fields are filled
    if (!amount || !bankCode || !accountNumber) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear error message

    // Handle the withdrawal logic here
    handleWithdrawFromWallet(newTransaction);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[1440px] flex flex-col w-full"
      >
        <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-2 justify-start h-[80vh]">
          <div className="flex flex-col gap-2 justify-start w-full pt-4">
            <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
              Step 2 of 2
            </div>
            <span className="font-bold font-geistsans text-2xl sm:text-3xl text-brand-dark">
              Withdraw From Your Wallet
            </span>
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-4 justify-start my-8">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex flex-col justify-start">
              <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                Amount (Minimum of ₦100) <span className="text-red-400">*</span>
              </span>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                onChange={onchangeHandler}
                // value={newTransaction.amount}
                className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
              />
            </div>

            <div className="flex flex-col justify-start">
              <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                Account Number <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                placeholder="Enter account number"
                onChange={getAccountNumber}
                // value={newTransaction.accountNumber}
                className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
              />
            </div>

            <div className="flex flex-col justify-start">
              <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                Select Bank <span className="text-red-400">*</span>
              </span>
              <select
                name="bankCode"
                id="bankCode"
                onChange={handleSelectChange}
                className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
              >
                <option value="">Select a bank</option>
                {!showOtherBanks &&
                  suggestedBanks?.length > 0 &&
                  suggestedBanks.map((bank: any, index: number) => (
                    <option
                      className="capitalize"
                      value={bank?.code}
                      key={index}
                    >
                      {bank?.name}
                    </option>
                  ))}
                {suggestedBanks?.length > 0 && (
                  <>
                    {!showOtherBanks && (
                      <option value="other">OTHER BANKS...</option>
                    )}
                    {showOtherBanks &&
                      allBanks?.length > 0 &&
                      allBanks.map((bank: any, index: number) => (
                        <option
                          className="capitalize"
                          value={bank?.code}
                          key={index}
                        >
                          {bank?.name}
                        </option>
                      ))}
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="rounded-b-xl bg-brand-white p-4 flex justify-end mt-auto items-center border border-brand-grayish/15">
            {createTransactionLoading ? (
              <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                <Spinner />
              </span>
            ) : (
              newTransaction.amount >= 100 &&
              newTransaction.accountNumber.length === 10 &&
              newTransaction.bankCode && (
                <button
                  type="submit"
                  className="p-1.5 sm:p-3 px-4 sm:px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
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

export default Withdraw;
