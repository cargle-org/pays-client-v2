"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGeneralContext } from "@/context/GenralContext";
import Recipients from "@/app/(dashboard)/dashboard/vouchers/create/recipients/[key]/Recipients";

const Page = () => {
  const router = useRouter();

  // extract params from url
  const params = useParams();
  const { key } = params;

  const {
    oneGuestVoucherId,
    oneVoucher,
    oneTransaction,
    getGuestVoucherById,
    getGuestTransactionById,
    setOneGuestVoucherId,
    setOneTransactionId,
  }: any = useGeneralContext();

  // console.log(oneTransaction);

  //Get transaction status
  const { status } = oneTransaction;

  useEffect(() => {
    if (!oneGuestVoucherId) return;

    getGuestTransactionById();
    setOneTransactionId(oneVoucher?.transactionId);
  }, [key, oneGuestVoucherId, oneVoucher]);

  //ensure transaction is paid before you can add a recipient
  useEffect(() => {
    if (status !== "PAID" || status !== "successful") {
      router.push(`/guest/confirm-payment/${oneGuestVoucherId}`);
    }
  }, [status, oneGuestVoucherId]);

  useEffect(() => {
    if (!key) return;

    setOneGuestVoucherId(key);
    getGuestVoucherById();
  }, [key, oneGuestVoucherId]);

  return (
    <div className="flex items-center justify-center md:h-screen mt-2 md:mt-0">
      <Recipients params={oneVoucher?.specialKey} isGuest={true} />
    </div>
  );
};

export default Page;
