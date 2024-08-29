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
  const { allUserVouchers, allUserTransactions, fetchVouchersLoading }: any =
    useGeneralContext();
  console.log("🚀 ~ Page ~ allUserTransactions:", allUserTransactions);
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
        <div className="bg-brand-white rounded-lg p-8 flex flex-col gap-6 justify-start">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
          unde harum qui omnis eum, fugit temporibus, eius aperiam totam enim
          dicta? Libero repellat, excepturi vitae consequuntur soluta fuga omnis
          sequi!
        </div>
        <div className="bg-brand-white rounded-lg p-4 flex  gap-6 justify-between items-center">
          <span className="font-normal text-base text-brand-grayish">
            Fund & Withdraw your wallet with ease.
          </span>
          <Link
            href={"/dashboard/transactions/new"}
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
            New Transaction
          </Link>
          {/* <div className="bg-brand-white rounded-lg p-8 flex  gap-6 justify-between items-center">
            <span className="font-normal text-base text-brand-grayish">
              20002933883
            </span>
            <span className="font-normal text-base text-brand-grayish">
              Lugaton Styles (Globus Bank)
            </span>
          </div> */}
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 my-6">
        <div className="w-full flex justify-between items-center">
          <span className="font-geistmono font-normal text-2xl">
            Your Transactions
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
        <div className="bg-brand-white rounded-lg p-8 flex flex-col gap-6 justify-start mb-8">
          {/* voucher */}
          {allUserTransactions?.length > 0 ? (
            <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
              <thead className="divide-y divide-gray-200 font-bold text-sm text-brand-grayish py-2 px-4 mb-2">
                <tr className="rounded-lg">
                  <th className="py-2">S/N</th>
                  <th className="py-2">Transaction Reference</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm text-brand-grayish/80">
                {allUserTransactions.map((item: any, i: number) => (
                  <tr key={i} className="mb-4 rounded-lg">
                    <td className="py-3">{i + 1}</td>
                    <td className="py-3 capitalize">
                      {item.transactionReference}
                    </td>
                    <td className="py-3 capitalize">{item.type}</td>
                    <td className="py-3 capitalize">
                      {item.amount} {item.currency}
                    </td>
                    <td className="py-3 capitalize">
                      <span
                        className={`p-2 rounded-lg ${
                          item.status === "successful"
                            ? "text-green-500 bg-green-200/80"
                            : "text-red-500 bg-red-200/80"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 capitalize">
                      {item.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  NO TRANSACTION YET
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
