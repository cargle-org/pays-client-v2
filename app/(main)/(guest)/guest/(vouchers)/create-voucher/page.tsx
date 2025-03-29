"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { success, error } from "@/helpers/Alert";
import { useGeneralContext } from "@/context/GenralContext";

import CreateVoucher from "@/components/Vouchers/CreateVoucher";

const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    voucherKey: "",
    logo: "",
    backgroundStyle: "",
    amountPerVoucher: "",
    totalNumberOfVouchers: "",
    expiryDate: "",
  });

  const {
    user,
    token,
    getOneUser,
    setOneVoucherId,
    createVoucherLoading,
    setCreateVoucherLoading,
    getAllVouchersByUser,
  }: any = useGeneralContext();

  const [selectedStyle, setSelectedStyle] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    let bgStyle = selectedStyle;

    try {
      e.preventDefault();
      setCreateVoucherLoading(true);
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("voucherKey", formData.voucherKey);
      data.append("amountPerVoucher", formData.amountPerVoucher);
      data.append("totalNumberOfVouchers", formData.totalNumberOfVouchers);
      data.append("backgroundStyle", bgStyle);
      if (logo) {
        data.append("logo", logo);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/guest/voucher/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );
      // setCreateVoucherLoading(false);

      // console.log("Response:", response.data);
      setOneVoucherId(response.data.data.voucher._id);
      setOneVoucherId(response.data.data.voucher.specialKey);
      if (response.status === 200) {
        getOneUser();
        getAllVouchersByUser();
        success("Voucher created successfully.");
        setCreateVoucherLoading(false);
        router.push(`/guest/fund-voucher/${response.data.data.voucher._id}`);
      }
    } catch (err: any) {
      setCreateVoucherLoading(false);
      // console.log("🚀 ~ onSubmit ~ err: ", err);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  return (
    <CreateVoucher
      isGuest={true}
      onSubmit={onSubmit}
      logo={logo}
      setLogo={setLogo}
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      formData={formData}
      setFormData={setFormData}
    />
  );
};

export default page;
