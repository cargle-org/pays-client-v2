"use client";

import { useGeneralContext } from "@/context/GenralContext";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { oneVoucher, setOneVoucherId }: any = useGeneralContext();
  console.log("🚀 ~ Page ~ oneVoucher:", oneVoucher);

  useEffect(() => {
    if (params?.id) {
      setOneVoucherId(params?.id);
    }
  }, [params]);

  return (
    <>
      <div>CLicked on {params?.id}</div>
    </>
  );
};

export default Page;
