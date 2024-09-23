"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import right from "@/assets/imgs/redeem/redeem_img.png";
import bg from "@/assets/imgs/redeem/bg.png";
import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";
import SelectRedeemType from "./[id]/page";

const Page = () => {
  const { getVoucherByKey, fetchVouchersLoading }: any = useGeneralContext();

  const [voucherCode, setVoucherCode] = useState("");

  const onchangeHandler = (e: any) => {
    setVoucherCode(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await getVoucherByKey(voucherCode);
    // console.log("🚀 ~ handleSubmit ~ getVoucher:", getVoucher);
    // if (getVoucher?.status === 200) {
    //   return <SelectRedeemType />;
    // }
  };

  return (
    <>
      <div className="w-full min-h-screen pt-16 pb-12 flex items-start justify-center gap-8 lg:pt-32">
        <div
          className="w-[90%] min-h-[70vh] flex flex-col items-center justify-center gap-8 lg:w-[80%]"
          style={{
            backgroundImage: `url(${bg.src})`, // Use bg.src to set the background image from the imported file
            backgroundSize: "cover", // Ensures the background image covers the div
            backgroundPosition: "center", // Centers the background image
          }}
        ></div>
      </div>
    </>
  );
};

export default Page;
