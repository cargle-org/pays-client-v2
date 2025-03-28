"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { useGeneralContext } from "@/context/GenralContext";

import { success, error } from "@/helpers/Alert";
import CreateVoucher from "@/components/Vouchers/CreateVoucher";

const Page = () => {
  const router = useRouter();

  const {
    user,
    token,
    getOneUser,
    setOneVoucherId,
    createVoucherLoading,
    setCreateVoucherLoading,
    getAllVouchersByUser,
    oneVoucherDraft,
  }: any = useGeneralContext();

  // // console.log("🚀 ~ Page ~ newAmount:", newAmount);
  const [selectedStyle, setSelectedStyle] = useState(
    oneVoucherDraft?.backgroundStyle ?? ""
  );
  const [createVoucherDraftLoading, setCreateVoucherDraftLoading] =
    useState(false);

  //set date
  const startDate = new Date();
  const [logo, setLogo] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>(oneVoucherDraft?.logo);

  const [formData, setFormData] = useState({
    title: oneVoucherDraft?.title || "",
    description: oneVoucherDraft?.description || "",
    voucherKey: oneVoucherDraft?.voucherKey || "",
    logo: oneVoucherDraft?.logo || "",
    backgroundStyle: oneVoucherDraft?.backgroundStyle || "",
    amountPerVoucher: oneVoucherDraft?.amountPerVoucher || "",
    totalNumberOfVouchers: oneVoucherDraft?.totalNumberOfVouchers || "",
    expiryDate: oneVoucherDraft?.expiryDate || "",
  });

  const voucherData = { ...formData, ...oneVoucherDraft };

  //create voucher draft handler
  const handleCreateVoucherDraft = useCallback(
    async (e: React.MouseEvent) => {
      try {
        e.preventDefault();
        setCreateVoucherDraftLoading(true);

        const data = {
          userId: user?._id,
          logo: logoUrl ?? voucherData.logo,
          title: formData.title,
          backgroundStyle: selectedStyle ?? formData.backgroundStyle,
          voucherKey: formData.voucherKey,
          description: formData.description,
          amountPerVoucher: formData.amountPerVoucher,
          expiryDate: formData.expiryDate,
          totalNumberOfVouchers: formData.totalNumberOfVouchers,
        };

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/save-draft`,
          data,

          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );
        // setCreateVoucherLoading(false);

        if (response.status === 200) {
          getOneUser();
          // getAllVouchersByUser();
          success("Draft Saved successfully.");
          setCreateVoucherDraftLoading(false);
          //   router.push(
          //     `/dashboard/vouchers/create/recipients/${response.data.data.voucher.specialKey}`
          //   );
        }
      } catch (err: any) {
        setCreateVoucherDraftLoading(false);
        // console.log("🚀 ~ onSubmit ~ err: ", err);
        error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err?.response?.data?.error || err?.message
        );
      } finally {
        setCreateVoucherDraftLoading(false);
      }
    },
    [formData, selectedStyle, logoUrl]
  );

  const onSubmit = async (e: any) => {
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/create`,
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
        router.push(
          `/dashboard/vouchers/create/recipients/${response.data.data.voucher.specialKey}`
        );
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

  //Update state incase selected draft changes
  useEffect(() => {
    setSelectedStyle(oneVoucherDraft?.backgroundStyle || "");
    setFormData({
      title: oneVoucherDraft?.title || "",
      description: oneVoucherDraft?.description || "",
      voucherKey: oneVoucherDraft?.voucherKey || "",
      logo: oneVoucherDraft?.logo || "",
      backgroundStyle: formData?.backgroundStyle || selectedStyle || "",
      amountPerVoucher: oneVoucherDraft?.amountPerVoucher || "",
      totalNumberOfVouchers: oneVoucherDraft?.totalNumberOfVouchers || "",
      expiryDate:
        oneVoucherDraft?.expiryDate ||
        startDate.toISOString().split("T")[0] ||
        "",
    });
  }, [oneVoucherDraft]);

  return (
    <CreateVoucher
      onSubmit={onSubmit}
      logo={logo}
      setLogo={setLogo}
      selectedStyle={selectedStyle}
      setSelectedStyle={setSelectedStyle}
      formData={formData}
      setFormData={setFormData}
      handleCreateVoucherDraft={handleCreateVoucherDraft}
    />
  );
};

export default Page;
