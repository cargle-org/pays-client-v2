"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, NotebookPen } from "lucide-react";

import axios from "axios";
import { useGeneralContext } from "@/context/GenralContext";

import { success, error } from "@/helpers/Alert";
import Spinner from "@/components/spinner/Spinner";
import {
  abstractColors,
  colorPalettes,
  silkColors,
} from "@/constants/voucherstyles";
import { LogoUploader } from "@/components/LogoUploader";
import ViewDrafts from "@/components/Vouchers/ViewDrafts";
import VoucherTemplates from "./_components/VoucherTemplates";
import VoucherPreviewModal from "@/components/modals/VoucherPreviewModal";
import VoucherPreviewCard from "@/components/Vouchers/VoucherPreviewCard";

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
    getAllDraftsByUser,
    allUserVoucherDrafts,
    fetchVoucherDraftsLoading = true,
    oneVoucherDraft,
  }: any = useGeneralContext();

  const [newAmount, setNewAmount] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showVoucherDraftsModal, setShowVoucherDraftsModal] = useState(false);

  // // console.log("🚀 ~ Page ~ newAmount:", newAmount);
  const [paysFee, setPaysFee] = useState(0);
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

  //Cloudinary logo upload succcess handler
  const handleUploadSuccess = (url: string) => {
    setLogoUrl(url);
  };

  const onchangeHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "voucherKey" && value.length > 5) {
      return; // Prevent setting voucherKey if it exceeds 5 characters
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Change background state
  const onBackgroundClick = (bgStyle: string) => {
    setSelectedStyle(bgStyle);
    setFormData((prev) => ({
      ...prev,
      backgroundStyle: bgStyle,
    }));
  };

  //Display Voucher Preview handler
  const handleVoucherPreviewClick = () => {
    setShowPreviewModal(true);
  };

  //Close Voucher Preview modal handler
  const handleVoucherPreviewClose = () => {
    setShowPreviewModal(false);
    setShowVoucherDraftsModal(false);
  };

  const handleDraftsViewClick = () => {
    getAllDraftsByUser();
    setShowVoucherDraftsModal(true);
  };

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

  const onAmountChange = async (e: any) => {
    setFormData((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
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

  useEffect(() => {
    if (formData.amountPerVoucher) {
      if (
        parseInt(formData.totalNumberOfVouchers) > 0 &&
        parseInt(formData.totalNumberOfVouchers) <= 10
      ) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 150);
      }
      if (
        parseInt(formData.totalNumberOfVouchers) > 10 &&
        parseInt(formData.totalNumberOfVouchers) <= 50
      ) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 120);
      }
      if (parseInt(formData.totalNumberOfVouchers) > 50) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 100);
      }
      setNewAmount(
        parseInt(formData.amountPerVoucher) *
          parseInt(formData.totalNumberOfVouchers) +
          paysFee
      );
    }
  }, [formData.totalNumberOfVouchers]);

  useEffect(() => {
    if (formData.totalNumberOfVouchers) {
      if (
        parseInt(formData.totalNumberOfVouchers) > 0 &&
        parseInt(formData.totalNumberOfVouchers) <= 10
      ) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 150);
      }
      if (
        parseInt(formData.totalNumberOfVouchers) > 10 &&
        parseInt(formData.totalNumberOfVouchers) <= 50
      ) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 120);
      }
      if (parseInt(formData.totalNumberOfVouchers) > 50) {
        setPaysFee(parseInt(formData.totalNumberOfVouchers) * 100);
      }
      setNewAmount(
        parseInt(formData.amountPerVoucher) *
          parseInt(formData.totalNumberOfVouchers) +
          paysFee
      );
    }
  }, [formData.amountPerVoucher]);

  return (
    <>
      {showPreviewModal && (
        <VoucherPreviewModal
          modalTitle="Voucher Preview"
          closeModal={handleVoucherPreviewClose}
          handleSaveToDraft={(e) => handleCreateVoucherDraft(e)}
        >
          <div className="flex items-center justify-center flex-row flex-grow sm:flex-col md:gap-4 w-full bg-gray-100">
            <VoucherPreviewCard
              formData={{
                ...voucherData,
                ...Object.fromEntries(
                  Object.entries(formData).filter(
                    ([key]) => formData[key as keyof typeof formData] !== ""
                  )
                ),
                backgroundStyle: selectedStyle,
                logo: logoUrl,
              }}
              frontCardView="rotate-y-180"
            />
            <VoucherPreviewCard
              formData={{
                ...voucherData,
                ...Object.fromEntries(
                  Object.entries(formData).filter(
                    ([key]) => formData[key as keyof typeof formData] !== ""
                  )
                ),
                backgroundStyle: selectedStyle,
                logo: logoUrl,
              }}
              backCardView="rotate-y-180"
            />
          </div>
        </VoucherPreviewModal>
      )}
      {showVoucherDraftsModal && (
        <VoucherPreviewModal
          modalTitle="Voucher Drafts"
          // allDrafts={allUserVoucherDrafts}
          closeModal={handleVoucherPreviewClose}
          fetchVoucherDraftsLoading={fetchVoucherDraftsLoading}
        >
          <ViewDrafts
            closeModal={handleVoucherPreviewClose}
            allDrafts={allUserVoucherDrafts}
          />
        </VoucherPreviewModal>
      )}
      <div className="max-w-xl lg:max-w-[2560px] flex flex-col gap-3.5 justify-start w-full mx-auto">
        {/* breadcumb */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 font-geistsans font-normal text-[10px] text-brand-grayish">
            <Link
              href={"/dashboard/vouchers"}
              className="transition-fx cursor-pointer hover:text-brand-main"
            >
              Voucher
            </Link>{" "}
            <svg
              width="5"
              height="9"
              viewBox="0 0 5 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.61018 3.71009C4.72735 3.8273 4.79317 3.98624 4.79317 4.15197C4.79317 4.3177 4.72735 4.47664 4.61018 4.59384L1.07456 8.12947C1.0169 8.18916 0.947936 8.23678 0.871683 8.26953C0.795431 8.30229 0.713418 8.31953 0.630431 8.32025C0.547444 8.32097 0.465144 8.30516 0.388334 8.27373C0.311524 8.24231 0.241741 8.1959 0.183058 8.13721C0.124375 8.07853 0.077967 8.00875 0.0465414 7.93194C0.0151159 7.85513 -0.000697537 7.77283 2.35982e-05 7.68984C0.000744733 7.60686 0.0179862 7.52484 0.0507418 7.44859C0.0834974 7.37234 0.131111 7.30337 0.190805 7.24572L3.28456 4.15197L0.190805 1.05822C0.0769562 0.940342 0.0139597 0.782465 0.0153837 0.618592C0.0168077 0.454719 0.0825382 0.297962 0.198418 0.182082C0.314298 0.0662015 0.471056 0.000471076 0.634929 -0.000952936C0.798802 -0.00237695 0.956679 0.0606195 1.07456 0.174468L4.61018 3.71009Z"
                fill="#C4C4C4"
              />
            </svg>
            Voucher Creation
          </div>
          <button
            type="button"
            onClick={handleDraftsViewClick}
            className="flex items-center bg-brand-main text-brand-white border rounded-lg text-[10px] py-1.5 px-2.5 gap-1 font-semibold hover:bg-brand-main/25"
          >
            View Saved Drafts
            <Eye className="size-3" />
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          encType="multipart/form-data"
          className="flex flex-col lg:flex-row gap-2 items-start justify-between"
        >
          {/* left */}
          <div className="flex flex-col w-full lg:w-[50%]">
            <div className="rounded-xl bg-brand-white p-2 flex flex-col gap-2.5 justify-start">
              <div className="flex flex-col gap-2 justify-start w-full px-2 pt-2">
                <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                  Step 1 of 3
                </div>
                <span className="font-bold font-geistsans text-3xl text-brand-dark">
                  Setup Voucher Details
                </span>
              </div>
              <div className="flex flex-col justify-start gap-1.5">
                <div className="flex flex-col justify-normal">
                  <span className="font-medium text-sm text-brand-grayish pl-2">
                    Select Voucher Templates
                  </span>
                  <VoucherTemplates setFormData={setFormData} />
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-sm text-brand-grayish pl-2">
                    Select Voucher Design
                  </span>
                  <div className=" bg-[#CCC] max-h-[200px] overflow-y-auto py-2 space-y-2">
                    <div className=" bg-brand-white max-w-full px-3 py-1 rounded-md">
                      <span className="font-semibold text-center text-[10px] p-0.5 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]">
                        Background Color
                      </span>
                    </div>
                    <div className="xl:mx-3 flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                      {colorPalettes.map(
                        (palette: { bgColor: string }, index: React.Key) => (
                          <div
                            key={index}
                            style={{ backgroundColor: palette.bgColor }}
                            onClick={() => onBackgroundClick(palette.bgColor)}
                            className={`relative cursor-pointer w-8 sm:w-9 h-8 sm:h-9 rounded-full overflow-hidden ${
                              selectedStyle === palette.bgColor
                                ? "border-2 border-brand-white" // persistent border when selected
                                : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                            }`}
                          ></div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-10 md:grid-cols-10 gap-2">
                      <div className="col-span-10 bg-brand-white max-w-full px-3 py-1 rounded-md">
                        <span className="font-semibold text-center text-[10px] p-0.5 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]">
                          Frame Design
                        </span>
                      </div>

                      <div className="flex col-span-10 gap-2">
                        {abstractColors.map(
                          (abstractImage: string, index: React.Key) => (
                            <div
                              key={index}
                              // style={{ backgroundImage: `url(${abstractImage.type})` }}
                              onClick={() => onBackgroundClick(abstractImage)}
                              className={`relative cursor-pointer w-20 h-auto rounded-none overflow-hidden 
                               ${
                                 selectedStyle === abstractImage
                                   ? "border-2 border-brand-white" // persistent border when selected
                                   : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                               }`}
                            >
                              <Image
                                src={abstractImage}
                                alt="abstract image"
                                width={100}
                                height={60}
                                className="w-full h-auto"
                                priority
                              />
                            </div>
                          )
                        )}
                      </div>

                      <div className="col-span-10 bg-brand-white max-w-full px-3 py-1 rounded-md">
                        <span className="font-semibold text-center text-[10px] p-0.5 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]">
                          Silk Design
                        </span>
                      </div>

                      <div className="flex col-span-10 gap-2">
                        {silkColors.map(
                          (silkImage: string, index: React.Key) => (
                            <div
                              key={index}
                              // style={{ backgroundImage: `url(${silkImage.type})` }}
                              onClick={() => onBackgroundClick(silkImage)}
                              className={`relative cursor-pointer w-20 h-auto rounded-none overflow-hidden ${
                                selectedStyle === silkImage
                                  ? "border-2 border-brand-white" // persistent border when selected
                                  : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                              }`}
                            >
                              <Image
                                src={silkImage}
                                alt="silk image"
                                width={100}
                                height={60}
                                className="w-full"
                                priority
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="flex flex-col justify-start px-2">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Title <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      maxLength={23}
                      value={formData.title}
                      // defaultValue={oneVoucherDraft?.title}
                      placeholder="Enter voucher title"
                      onChange={onchangeHandler}
                      className="sm:w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                    />
                  </div>
                  <div className="flex flex-col justify-start px-2">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Description{" "}
                      <span className="text-red-400">*</span>
                    </span>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      placeholder="Enter a brief description"
                      onChange={onchangeHandler}
                      rows={3}
                      className="w-auto px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-start px-2">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Key <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="voucherKey"
                      id="voucherKey"
                      value={formData.voucherKey}
                      placeholder="Enter voucher key (5 characters max)"
                      onChange={onchangeHandler}
                      maxLength={5} // Limit input to 5 characters
                      className="w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col w-full lg:w-[50%]">
            <div className="rounded-t-xl bg-brand-white p-4 flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-2 justify-start w-full">
                <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                  Step 2 of 3
                </div>
                <span className="font-bold font-geistsans text-3xl text-brand-dark">
                  Voucher Amount Setup
                </span>
              </div>
              {/* Inputs */}
              <div className="flex flex-col gap-3 justify-start">
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Voucher Amount <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="number"
                    name="amountPerVoucher"
                    id="amountPerVoucher"
                    value={formData.amountPerVoucher}
                    placeholder="Enter voucher amount"
                    onChange={onchangeHandler}
                    className="w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Number of Vouchers<span className="text-red-400">*</span>
                  </span>
                  <input
                    type="number"
                    name="totalNumberOfVouchers"
                    id="totalNumberOfVouchers"
                    value={formData.totalNumberOfVouchers}
                    placeholder="Enter Number of Vouchers (max 20)"
                    onChange={onchangeHandler}
                    max={20} // Limit input to 20 vouchers
                    className="w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Voucher Expiry Date <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    name="expiryDate"
                    id="expiryDate"
                    min={startDate.toISOString().split("T")[0]}
                    value={formData.expiryDate}
                    onChange={onchangeHandler}
                    placeholder="Select Voucher expiry date"
                    className="w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Upload Logo
                    <small className="text-red-500 ml-1">
                      (PNG and JPG formats only)
                    </small>
                  </span>
                  <LogoUploader
                    logo={logo}
                    setLogo={setLogo}
                    setLogoUrl={setLogoUrl}
                    logoUrl={logoUrl || formData.logo}
                    onUploadSuccess={handleUploadSuccess}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleVoucherPreviewClick}
                    className="flex items-center gap-1 bg-transparent border-[0.3px] border-[#DE2626] text-[#DE2626] text-[10px] rounded-lg py-1 px-1.5 font-semibold hover:bg-[#DE2626] hover:text-brand-white"
                  >
                    <span>Save to drafts</span>
                    <NotebookPen className="size-3" />
                  </button>
                </div>
              </div>
              {/* Summation part */}
              <div className="flex flex-col gap-2 w-auto my-7 font-geistsans">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs text-brand-grayish">
                    Sub Total
                  </span>
                  <span className="font-bold text-base text-brand-dark/70">
                    ₦{" "}
                    {(
                      parseInt(formData.amountPerVoucher) *
                        parseInt(formData.totalNumberOfVouchers) || 0
                    ).toLocaleString("en-NG")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs text-brand-grayish">
                    Pays Fee
                  </span>
                  <span className="font-bold text-base text-brand-dark/70">
                    ₦ {paysFee.toLocaleString("en-NG")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs text-brand-grayish">
                    Total Amount
                  </span>
                  <span className="font-bold text-base text-brand-dark/70">
                    ₦{" "}
                    {(
                      parseInt(formData.amountPerVoucher) *
                        parseInt(formData.totalNumberOfVouchers) +
                        paysFee || 0
                    ).toLocaleString("en-NG")}
                  </span>
                </div>
              </div>
              {/* Preview Button */}
              <button
                type="button"
                onClick={handleVoucherPreviewClick}
                className="max-w-[400px] w-auto flex items-center justify-center mx-auto bg-brand-main text-brand-white border rounded-lg text-[10px] p-2.5 gap-1 font-semibold hover:bg-brand-main/25"
              >
                Preview Voucher
                <Eye className="size-3" />
              </button>
            </div>

            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15">
              <Link
                href={"/dashboard/vouchers"}
                className="py-1.5 sm:py-3 px-6 sm:px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
              >
                Back
              </Link>

              {createVoucherLoading ? (
                <span className="w-[150px] p-1.5 sm:p-3 px-6 sm:px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                <button
                  type="submit"
                  className="p-1.5 sm:p-3 px-6 sm:px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;
