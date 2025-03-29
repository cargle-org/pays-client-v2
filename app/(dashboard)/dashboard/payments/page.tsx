"use client";

import MainLayout from "@/app/(main)/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/imgs/vouchers/voucher_img.png";
import { useGeneralContext } from "@/context/GenralContext";
import Link from "next/link";
import Spinner from "@/components/spinner/Spinner";
import { DeleteIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { info } from "@/helpers/Alert";

const Page = () => {
  const {
    paymentLInksByUser,
    fetchPaymentLinksLoading,
    deleteOnePaymentLink,
    setPaymentLinkDateRange,
    setPaymentLinkPriceRange,
    setSelectedPaymentLinkStatus,
    paymentLinkDateRange,
    selectedPaymentLinkStatus,
    paymentLinkPriceRange,
  }: any = useGeneralContext();
  console.log("🚀 ~ Page ~ paymentLInksByUser:", paymentLInksByUser);
  const router = useRouter();

  const [statusOpen, setStatusOpen] = useState(false);
  const [amountOpen, setAmountOpen] = useState(false);

  const toggleStatusDropdown = () => setStatusOpen(!statusOpen);

  const statuses = ["active", "expired"];

  const toggleAmountDropdown = () => setAmountOpen(!amountOpen);

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;
    setPaymentLinkPriceRange((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    setPaymentLinkDateRange((prev: any) => ({ ...prev, [name]: value }));
  };

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
        <div className="flex justify-between flex-col lg:flex-row items-center pb-2 border-b-[0.3px]">
          <div className="flex flex-col justify-start gap-2 font-geistsans mb-4">
            <span className="font-bold text-4xl text-brand-dark">
              Payment Links
            </span>
            <span className="font-normal text-sm text-brand-grayish">
              Effortlessly manage and create secure payment links
            </span>
          </div>
          <Link
            href={"/dashboard/payments/create"}
            className="transition-fx flex items-center gap-2 p-1 sm:p-2 px-2 sm:px-4 rounded-3xl bg-brand-main text-brand-white font-geistsans text-base font-normal cursor-pointer hover:bg-brand-main/50"
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
            Create Payment Link
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-4 my-6">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          <span className="font-geistmono font-normal text-2xl">
            Existing Payment Links
          </span>
          {/* <div className="flex items-center gap-4">
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
              Date{" "}
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
          </div> */}
          <div className="flex flex-col md:flex-row items-end gap-1 sm:gap-4">
            {/* Amount Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAmountDropdown}
                className="flex items-center gap-2 p-2 px-4 font-geistsans font-normal text-sm rounded-3xl bg-brand-white text-brand-main"
              >
                ₦ Amount
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
              </button>
              {amountOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Min Price
                      </label>
                      <input
                        type="number"
                        name="min"
                        value={paymentLinkPriceRange.min}
                        onChange={handlePriceChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-brand-main focus:ring-brand-main text-sm p-1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Max Price
                      </label>
                      <input
                        type="number"
                        name="max"
                        value={paymentLinkPriceRange.max}
                        onChange={handlePriceChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-brand-main focus:ring-brand-main text-sm p-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Date Pickers */}
            <div className="flex p-2 gap-4 bg-brand-white rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Date
                </label>
                <input
                  type="date"
                  name="from"
                  value={paymentLinkDateRange.from}
                  onChange={handleDateChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-brand-main focus:ring-brand-main text-sm p-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Date
                </label>
                <input
                  type="date"
                  name="to"
                  value={paymentLinkDateRange.to}
                  onChange={handleDateChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow focus:border-brand-main focus:ring-brand-main text-sm p-1"
                />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={toggleStatusDropdown}
                className="flex items-center gap-2 p-2 px-4 font-geistsans font-normal text-sm rounded-3xl bg-brand-white text-brand-main"
              >
                {selectedPaymentLinkStatus}
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
              </button>
              {statusOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-2">
                  {statuses.map((status) => (
                    <p
                      key={status}
                      onClick={() => {
                        setSelectedPaymentLinkStatus(status);
                        setStatusOpen(false);
                      }}
                      className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {status}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-brand-white rounded-lg lg:p-8 flex flex-col gap-3 lg:gap-6 justify-start mb-8">
          {/* links */}
          {paymentLInksByUser?.length > 0 ? (
            <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
              <thead className="divide-y divide-gray-200 font-bold text-sm text-brand-grayish py-2 px-4 mb-2">
                <tr className="rounded-lg">
                  <th className="py-2">S/N</th>
                  <th className="py-2 text-start pl-4">Title</th>
                  <th className="py-2 pl-4 hidden xl:table-cell text-start">
                    Description
                  </th>
                  <th className="py-2 tracking-[-0.47px] md:tracking-normal">
                    Payment Link
                  </th>
                  <th className="py-2 hidden lg:table-cell">Category</th>
                  <th className="py-2 sm:hidden">Status</th>
                  <th className="py-2 ">Amount</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm text-brand-grayish/80">
                {paymentLInksByUser.map(
                  (
                    item: {
                      _id: string;
                      title: string;
                      description: string;
                      link: string;
                      category: string;
                      amount: string;
                      linkExpiry: Date;
                    },
                    i: number
                  ) => {
                    const handleCopyLink = () => {
                      navigator.clipboard.writeText(item.link);
                      info("Copied to clipboard");
                      setTimeout(() => {
                        router.push(`/${item.link}`);
                      }, 2000);
                    };

                    return (
                      <tr key={i} className="mb-4 rounded-lg">
                        <td className="py-3  flex-grow">{i + 1}</td>
                        <td className="table-cell py-3 pl-4 capitalize text-start font-semibold tracking-tight md:tracking-normal">
                          {item.title}
                        </td>
                        <td className="hidden xl:table-cell py-3 capitalize pl-4 text-start">
                          {item.description.slice(0, 20)}
                          {item.description.length > 20 && "..."}
                        </td>
                        <td className="py-3">
                          <button
                            type="button"
                            onClick={handleCopyLink}
                            className="hover:text-brand-main hover:bg-slate-400 text-xs md:text-sm font-semibold border-[0.5px] border-slate-400 p-1 md:p-1.5 rounded-lg"
                          >
                            {/* {item.link.slice(0, 30)}
                        {item.link.length > 30 && "..."} */}
                            Copy Link
                          </button>
                        </td>
                        <td className="py-3 capitalize hidden lg:table-cell">
                          {item.category}
                        </td>
                        <td className="sm:hidden py-3 capitalize">
                          {new Date(item.linkExpiry) < new Date() ? (
                            <span className="p-1 lg:p-2 rounded-lg text-red-500 bg-red-200/80">
                              expired
                            </span>
                          ) : (
                            <span className="p-1 lg:p-2 rounded-lg text-green-500 bg-green-200/80">
                              active
                            </span>
                          )}
                        </td>
                        <td className="py-3 capitalize tracking-tighter md:tracking-normal">
                          ₦{item.amount}
                        </td>
                        <td className="py-3 capitalize flex items-center gap-4">
                          {/* <EyeIcon className="cursor-pointer hover:text-brand-main" /> */}
                          <Trash2Icon
                            onClick={() => deleteOnePaymentLink(item._id)}
                            className="cursor-pointer hover:text-red-500 size-[18px] md:size-6"
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          ) : (
            <>
              {fetchPaymentLinksLoading ? (
                <div className="w-full flex items-center justify-center mx-auto">
                  <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                    <Spinner />
                  </span>
                </div>
              ) : (
                <span className="w-full flex items-center justify-center font-geistsans font-medium text-brand-main text-lg">
                  NO PAYMENT LINKS YET
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
