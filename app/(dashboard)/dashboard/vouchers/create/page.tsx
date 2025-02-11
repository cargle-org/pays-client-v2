"use client";

import React, { useEffect, useState } from "react";
import { useGeneralContext } from "@/context/GenralContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { success, error } from "@/helpers/Alert";
import Spinner from "@/components/spinner/Spinner";
import Image from "next/image";

// Voucher cards
import birthday_light from "@/assets/imgs/vouchers/birthday_light.png";
import birthday_dark from "@/assets/imgs/vouchers/birthday_dark.png";
import birthday_gradient from "@/assets/imgs/vouchers/birthday_gradient.png";
import bonus_light from "@/assets/imgs/vouchers/bonus_light.png";
import bonus_dark from "@/assets/imgs/vouchers/bonus_dark.png";
import bonus_gradient from "@/assets/imgs/vouchers/bonus_gradient.png";
import wedding_light from "@/assets/imgs/vouchers/wedding_light.png";
import wedding_dark from "@/assets/imgs/vouchers/wedding_dark.png";
import wedding_gradient from "@/assets/imgs/vouchers/wedding_gradient.png";
import seasons_light from "@/assets/imgs/vouchers/seasons_light.png";
import seasons_dark from "@/assets/imgs/vouchers/seasons_dark.png";
import gift_light from "@/assets/imgs/vouchers/gift_light.png";
import gift_dark from "@/assets/imgs/vouchers/gift_dark.png";
import gift_gradient from "@/assets/imgs/vouchers/gift_gradient.png";

//Abstract colors
import abstract_one from "@/assets/imgs/vouchers/abstract_one.svg";
import abstract_two from "@/assets/imgs/vouchers/abstract_two.svg";
import abstract_three from "@/assets/imgs/vouchers/abstract_three.svg";
import abstract_four from "@/assets/imgs/vouchers/abstract_four.svg";
import abstract_five from "@/assets/imgs/vouchers/abstract_five.svg";
import abstract_six from "@/assets/imgs/vouchers/abstract_six.svg";
import abstract_seven from "@/assets/imgs/vouchers/abstract_seven.svg";
import abstract_eight from "@/assets/imgs/vouchers/abstract_eight.svg";
import abstract_nine from "@/assets/imgs/vouchers/abstract_nine.svg";
import abstract_ten from "@/assets/imgs/vouchers/abstract_ten.svg";

//Silk colors
import silk_one from "@/assets/imgs/vouchers/silk_one.svg";
import silk_two from "@/assets/imgs/vouchers/silk_two.svg";
import silk_three from "@/assets/imgs/vouchers/silk_three.svg";
import silk_four from "@/assets/imgs/vouchers/silk_four.svg";
import silk_five from "@/assets/imgs/vouchers/silk_five.svg";
import silk_six from "@/assets/imgs/vouchers/silk_six.svg";
import silk_seven from "@/assets/imgs/vouchers/silk_seven.svg";
import silk_eight from "@/assets/imgs/vouchers/silk_eight.svg";
import silk_nine from "@/assets/imgs/vouchers/silk_nine.svg";
import silk_ten from "@/assets/imgs/vouchers/silk_ten.svg";
import { extractBackgroundUrl } from "@/helpers/extractBackgroundUrl";

const Page = () => {
  const router = useRouter();
  const {
    token,
    getOneUser,
    setOneVoucherId,
    createVoucherLoading,
    setCreateVoucherLoading,
    getAllVouchersByUser,
  }: any = useGeneralContext();
  const [thumbnail, setThumbnail] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    voucherKey: "",
    amountPerVoucher: "",
    totalNumberOfVouchers: "",
  });
  const [newAmount, setNewAmount] = useState(0);
  // // console.log("🚀 ~ Page ~ newAmount:", newAmount);
  const [paysFee, setPaysFee] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState("");

  const abstractColors = [
    { type: abstract_one },
    { type: abstract_two },
    { type: abstract_three },
    { type: abstract_four },
    { type: abstract_five },
    { type: abstract_six },
    { type: abstract_seven },
    { type: abstract_eight },
    { type: abstract_nine },
    { type: abstract_ten },
  ];

  const silkColors = [
    { type: silk_one },
    { type: silk_two },
    { type: silk_three },
    { type: silk_four },
    { type: silk_five },
    { type: silk_six },
    { type: silk_seven },
    { type: silk_eight },
    { type: silk_nine },
    { type: silk_ten },
  ];

  const voucherCards = [
    { name: "birthday_light", image: birthday_light },
    { name: "birthday_dark", image: birthday_dark },
    { name: "birthday_gradient", image: birthday_gradient },
    { name: "bonus_light", image: bonus_light },
    { name: "bonus_dark", image: bonus_dark },
    { name: "bonus_gradient", image: bonus_gradient },
    { name: "wedding_light", image: wedding_light },
    { name: "wedding_dark", image: wedding_dark },
    { name: "wedding_gradient", image: wedding_gradient },
    { name: "seasons_light", image: seasons_light },
    { name: "seasons_dark", image: seasons_dark },
    { name: "gift_light", image: gift_light },
    { name: "gift_dark", image: gift_dark },
    { name: "gift_gradient", image: gift_gradient },
  ];

  const colorPalettes = [
    { bgColor: "#FFF" },
    { bgColor: "#E7DAF4" },
    { bgColor: "#AEE8FF" },
    { bgColor: "#D2B1FE" },
    { bgColor: "#FDA096" },
    { bgColor: "#ACEBB2" },
    { bgColor: "#D3EAFE" },
    { bgColor: "#E0B088" },
    { bgColor: "#A2C3F6" },
    { bgColor: "#FBDB7D" },
    { bgColor: "#FFF" },
    { bgColor: "#F2ECF9" },
    { bgColor: "#D6F3FF" },
    { bgColor: "#E8D7FE" },
    { bgColor: "#FDCFCA" },
    { bgColor: "#D5F4D8" },
    { bgColor: "#E8F4FE" },
    { bgColor: "#EFD7C3" },
    { bgColor: "#D0E0FA" },
    { bgColor: "#FCECBD" },
    { bgColor: "#FFF" },
    { bgColor: "#F8F5FB" },
    { bgColor: "#EAF8FF" },
    { bgColor: "#F3EAFE" },
    { bgColor: "#FDE6E4" },
    { bgColor: "#E9F9EB" },
    { bgColor: "#E8F4FE" },
    { bgColor: "#F6EAE0" },
    { bgColor: "#E7EFFC" },
    { bgColor: "#FDF5DD" },
    { bgColor: "#FFF" },
    { bgColor: "#F8F5FB7F" },
    { bgColor: "#F4FBFF" },
    { bgColor: "#F3EAFE7F" },
    { bgColor: "#FDE6E47F" },
    { bgColor: "#E9F9EB7F" },
    { bgColor: "#E8F4FE7F" },
    { bgColor: "#F6EAE07F" },
    { bgColor: "#E7EFFC7F" },
    { bgColor: "#FDF5DD7F" },
  ];

  const onchangeHandler = (e: any) => {
    const { name, value } = e.target;
    if (name === "voucherKey" && value.length > 5) {
      return; // Prevent setting voucherKey if it exceeds 5 characters
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBackgroundClick = (bgStyle: string) => {
    setSelectedStyle(bgStyle);
  };

  const onSubmit = async (e: any) => {
    let bgStyle;

    if (typeof selectedStyle === "object") {
      bgStyle = extractBackgroundUrl(selectedStyle);
    } else {
      bgStyle = selectedStyle;
    }

    try {
      e.preventDefault();
      setCreateVoucherLoading(true);
      const data = {
        title: formData.title,
        description: formData.description,
        voucherKey: formData.voucherKey,
        amountPerVoucher: formData.amountPerVoucher,
        totalNumberOfVouchers: formData.totalNumberOfVouchers,
        thumbnail: bgStyle,
      };
      // console.log("🚀 ~ onSubmit ~ data:", data);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/create`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
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
      <div className="max-w-xl lg:max-w-[2560px] flex flex-col gap-4 justify-start w-full mx-auto">
        {/* breadcumb */}
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
        <form
          onSubmit={onSubmit}
          className="flex flex-col lg:flex-row gap-2 items-start justify-between"
        >
          {/* left */}
          <div className="flex flex-col w-fit lg:w-[50%]">
            <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-2 justify-start w-full">
                <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                  Step 1 of 3
                </div>
                <span className="font-bold font-geistsans text-3xl text-brand-dark">
                  Setup Voucher Details
                </span>
              </div>
              {/* Inputs */}
              <div className="flex flex-col gap-3 justify-start">
                <div className="flex flex-col gap-3">
                  <span className="font-medium text-sm text-brand-grayish">
                    Select Voucher Design
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-10 gap-2 bg-[#CCC] max-h-[200px] overflow-y-auto p-2">
                    <div className="col-span-10 bg-brand-white max-w-full px-3 py-1 rounded-md">
                      <span className="font-semibold text-center text-[10px] p-0.5 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]">
                        Background Color
                      </span>
                    </div>
                    {colorPalettes.map(
                      (palette: { bgColor: string }, index: React.Key) => (
                        <div
                          key={index}
                          style={{ backgroundColor: palette.bgColor }}
                          onClick={() => onBackgroundClick(palette.bgColor)}
                          className={`relative cursor-pointer w-8 h-8 rounded-full overflow-hidden ${
                            selectedStyle === palette.bgColor
                              ? "border-2 border-brand-white" // persistent border when selected
                              : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                          }`}
                        ></div>
                      )
                    )}

                    <div className="col-span-10 bg-brand-white max-w-full px-3 py-1 rounded-md">
                      <span className="font-semibold text-center text-[10px] p-0.5 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]">
                        Frame Design
                      </span>
                    </div>

                    <div className="flex col-span-10 gap-2">
                      {abstractColors.map(
                        (color: { type: string }, index: React.Key) => (
                          <div
                            key={index}
                            // style={{ backgroundImage: `url(${color.type})` }}
                            onClick={() => onBackgroundClick(color.type)}
                            className={`relative cursor-pointer w-20 h-auto rounded-none overflow-hidden 
                               ${
                                 selectedStyle === color.type
                                   ? "border-2 border-brand-white" // persistent border when selected
                                   : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                               }`}
                          >
                            <Image
                              src={color.type}
                              alt={color.type}
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
                        (color: { type: string }, index: React.Key) => (
                          <div
                            key={index}
                            // style={{ backgroundImage: `url(${color.type})` }}
                            onClick={() => onBackgroundClick(color.type)}
                            className={`relative cursor-pointer w-20 h-auto rounded-none overflow-hidden ${
                              selectedStyle === color.type
                                ? "border-2 border-brand-white" // persistent border when selected
                                : "hover:border-2 hover:border-brand-white" // hover effect otherwise
                            }`}
                          >
                            <Image
                              src={color.type}
                              alt={color.type}
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
                  <div className="flex flex-col justify-start">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Title <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter voucher title"
                      onChange={onchangeHandler}
                      className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Description{" "}
                      <span className="text-red-400">*</span>
                    </span>
                    <textarea
                      name="description"
                      id="description"
                      placeholder="Enter a brief description"
                      onChange={onchangeHandler}
                      rows={3}
                      className="w-full sm:w-[353px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                    ></textarea>
                  </div>
                  <div className="flex flex-col justify-start">
                    <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                      Voucher Key <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="voucherKey"
                      id="voucherKey"
                      placeholder="Enter voucher key (5 characters max)"
                      onChange={onchangeHandler}
                      maxLength={5} // Limit input to 5 characters
                      className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
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
                    placeholder="Enter voucher amount"
                    onChange={onchangeHandler}
                    className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
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
                    placeholder="Enter Number of Vouchers (max 20)"
                    onChange={onchangeHandler}
                    max={20} // Limit input to 20 vouchers
                    className="w-full sm:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
              </div>
              {/* Summation part */}
              <div className="flex flex-col gap-2 w-full sm:w-[353px] my-10 font-geistsans">
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
