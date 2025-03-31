"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { useGeneralContext } from "@/context/GenralContext";
import Recipients from "@/app/(dashboard)/dashboard/vouchers/create/recipients/[key]/Recipients";

const Page = () => {
  // extract params from url
  const params = useParams();
  const { key } = params;

  const {
    oneGuestVoucherId,
    oneVoucher,
    getGuestVoucherById,
    getGuestTransactionById,
    setOneGuestVoucherId,
    setOneTransactionId,
  }: any = useGeneralContext();

  useEffect(() => {
    if (!oneGuestVoucherId) return;

    getGuestTransactionById();
    setOneTransactionId(oneVoucher?.transactionId);
  }, [key, oneGuestVoucherId, oneVoucher]);

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
