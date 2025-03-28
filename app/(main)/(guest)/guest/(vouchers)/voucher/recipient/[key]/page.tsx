"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { useGeneralContext } from "@/context/GenralContext";
import Recipients from "@/app/(dashboard)/dashboard/vouchers/create/recipients/[key]/page";

const page = () => {
  // extract params from url
  const params = useParams();
  const { key } = params;

  const {
    oneGuestVoucherId,
    oneVoucher,
    getGuestTransactionById,
    setOneGuestVoucherId,
    setOneTransactionId,
  }: any = useGeneralContext();

  useEffect(() => {
    getGuestTransactionById();
    setOneGuestVoucherId(key);
    setOneTransactionId(oneVoucher?.transactionId);
  }, [key, oneGuestVoucherId, oneVoucher]);

  return (
    <div className="flex items-center justify-center md:h-screen mt-2 md:mt-0">
      <Recipients params={oneVoucher?.specialKey} isGuest={true} />
    </div>
  );
};

export default page;
