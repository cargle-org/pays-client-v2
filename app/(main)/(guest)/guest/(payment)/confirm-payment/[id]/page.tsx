"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { useGeneralContext } from "@/context/GenralContext";
import { ArrowBigLeft, Dot, Loader, Router, TriangleAlert } from "lucide-react";

const Page = () => {
  const router = useRouter();

  // extract params from url
  const params = useParams();
  const { id } = params;

  const {
    oneTransaction,
    oneTransactionId,
    oneGuestVoucherId,
    oneVoucher,
    getGuestVoucherById,
    getGuestTransactionById,
    setOneGuestVoucherId,
    setOneTransactionId,
    verifyGuestFundPayment,
    createTransactionLoading,
  }: any = useGeneralContext();

  //Get transaction status
  const { status } = oneTransaction;

  const [isStatusChecking, setIsStatusChecking] = useState(true); //transaction status

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Ensure IDs are available before making API calls
    if (!id) return;

    // Set IDs once on mount
    setOneTransactionId(oneVoucher?.transactionId);
    // verifyGuestFundPayment();

    const fetchData = () => {
      if (!oneTransactionId) return;

      getGuestTransactionById();
      verifyGuestFundPayment(); // Only call when oneTransactionId is set
    };

    //refetch based on transaction status
    if (isStatusChecking) {
      timeout = setTimeout(fetchData, 15000); // Refresh every 5 seconds
    }
    fetchData();

    return () => clearInterval(timeout); // Cleanup on unmount
  }, [id, oneTransactionId, oneVoucher]); // Re-run when `id` or `oneTransactionId` changes

  //redirect to recipient page on transaction success
  //changes setIstatusChecking to false to end polling
  useEffect(() => {
    if (status === "PAID" || status === "successful") {
      setIsStatusChecking(false);
      router.push(`/guest/voucher/recipient/${oneGuestVoucherId}`);
    }
  }, [status, oneGuestVoucherId]);

  //changes setIstatusChecking to false to end polling
  useEffect(() => {
    if (status === "EXPIRED" || status === "FAILED") {
      setIsStatusChecking(false);
    }
  }, [status, oneGuestVoucherId]);

  useEffect(() => {
    if (!id) return;

    setOneGuestVoucherId(id);
    getGuestVoucherById();
  }, [id, oneGuestVoucherId]); // Run when oneGuestVoucherId changes

  return (
    <div className="flex items-center justify-center h-screen">
      {status === "EXPIRED" && (
        <div className="flex flex-col items-center gap-2">
          <TriangleAlert className="sm:size-10 size-24 stroke-yellow-400" />
          <span className="sm:text-xl tet-2xl font-semibold">
            Oops! Transaction Expired
          </span>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="border rounded-md border-slate-300 sm:py-1 py-2.5 sm:px-2.5 px-4 sm:text-sm text-base">
              Try Again
            </span>
            or
            <Link
              href={`${`/guest/fund-voucher/${id}`}`}
              className="flex items-center gap-0.5 text-brand-main underline text-base font-semibold"
            >
              <span className="">Go Back</span>
              <ArrowBigLeft className="size-4" />
            </Link>
          </div>
        </div>
      )}
      {(status === "PAID" || status === "successful") && (
        <div className="flex flex-col items-center gap-2">
          <Loader className="sm:size-10 size-24 animate-spin stroke-brand-main" />
          <span className="sm:text-xl text-2xl font-semibold">
            Transaction Successful!
          </span>
          <div className="flex sm:flex-col md:flex-row sm:gap-1 gap-2 items-center">
            <span className="font-medium sm:text-base text-lg text-slate-500">
              Please wait while we redirect you...
            </span>
            or
            <Link
              href={`/guest/voucher/recipient/${oneGuestVoucherId}`}
              className="text-brand-main underline text-base font-semibold"
            >
              Click here
            </Link>
          </div>
        </div>
      )}
      {(status === "PENDING" || status === "initiated") && (
        <div className="flex flex-col items-center gap-2">
          <Loader className="sm:size-10 size-24 animate-spin stroke-brand-main" />
          <div className="flex items-end justify-center sm:text-xl text-2xl font-semibold">
            <span>Verifying Transaction Status</span>
            <Dot className="animate-ping size-6" />
          </div>
          <div className="flex flex-col sm:gap-1 gap-2 justify-center text-center">
            <span className="font-medium sm:text-base text-lg text-slate-500">
              Please click on the button after you have made payment.
            </span>
            {status === "PENDING" && (
              <span className="text-red-500">Payment not verified yet!</span>
            )}
            {status === "initiated" && (
              <>
                <span>Transaction Initiated</span>
                Transaction ID:
                <span className="text-red-500">{oneTransactionId}</span>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                window.location.reload();
                setTimeout(verifyGuestFundPayment, 0);
              }}
              className="w-auto rounded-md text-white bg-brand-main text-base font-semibold p-2"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
