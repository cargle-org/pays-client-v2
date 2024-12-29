"use client";

import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";
import { success, error } from "@/helpers/Alert";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Bulk = ({ setDisplay }: any) => {
  const router = useRouter();
  const {
    token,
    setOneVoucher,
    voucherSpecialKey,
    createVoucherLoading,
    setCreateVoucherLoading,
  }: any = useGeneralContext();

  // const [error, setError] = useState("");
  const [excelFile, SetExcelFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      SetExcelFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!excelFile) {
      error("All fields are required.");
      return;
    }

    setCreateVoucherLoading(true);
    const data = new FormData();
    if (excelFile) {
      data.append("recipients", excelFile);
    }

    console.log("🚀 ~ onSubmit ~ data:", data);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/update?specialKey=${voucherSpecialKey}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        }
      );

      setCreateVoucherLoading(false);

      console.log("Response:", response.data);
      if (response.status === 200) {
        setOneVoucher(response.data.data.voucher);
        success("Voucher updated successfully.");
        router.push(`/dashboard/vouchers/${response.data.data.voucher._id}`);
      }
    } catch (err: any) {
      setCreateVoucherLoading(false);
      console.log("🚀 ~ onSubmit ~ err:", err);
      error(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "An error occurred."
      );
    }
  };

  const handleBack = () => {
    setDisplay("");
  };

  return (
    <>
      <div className="max-w-3xl flex gap-2 items-start justify-between">
        {/* left */}
        <div className="flex flex-col w-full">
          <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start h-[80vh] min-h-screen sm:min-h-max">
            <div className="flex flex-col gap-2 justify-start w-full">
              <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                Step 3 of 3
              </div>
              <span className="font-bold font-geistsans text-3xl text-brand-dark">
                Add Recipients From File
              </span>
            </div>
            {/* input fields */}
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 justify-start"
            >
              <div className="flex p-4 flex-col sm:flex-row justify-between items-center border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs space-y-2.5 sm:space-y-0">
                <div className="flex gap-2 items-center">
                  <svg
                    width="28"
                    height="32"
                    viewBox="0 0 28 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.33268 0C1.85992 0 0.666016 1.19391 0.666016 2.66667V29.3333C0.666016 30.8061 1.85992 32 3.33268 32H24.666C26.1388 32 27.3327 30.8061 27.3327 29.3333V0H3.33268ZM27.3327 2.09808e-05V5.33333L21.9993 2.05146e-05L27.3327 2.09808e-05Z"
                      fill="#E2E8F0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22 0V5.33331H27.3333L22 0Z"
                      fill="#94A3B8"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M27.332 10.667V5.33366H21.9987L27.332 10.667Z"
                      fill="#CBD5E1"
                    />
                  </svg>
                  <div className="flex flex-col gap-1 justify-start">
                    <span className="font-medium text-sm text-brand-grayish">
                      Upload Voucher Recipients
                    </span>
                    <span className="font-normal text-xs text-brand-grayish">
                      Click here to select file
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  name="recipients"
                  id="recipients"
                  onChange={onFileChange}
                  className="w-full px-2 py-[12px] flex items-center justify-center border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs cursor-pointer"
                />
              </div>
              {createVoucherLoading ? (
                <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                <span
                  onClick={onSubmit}
                  className="transition-fx w-max flex items-center place-self-end gap-2 p-1 sm:p-2 px-2.5 sm:px-4 rounded-3xl bg-brand-main text-brand-white font-geistsans text-base font-normal cursor-pointer hover:bg-brand-main/50"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 0C6.12902 0 6.25276 0.0512546 6.344 0.142489C6.43523 0.233722 6.48649 0.357462 6.48649 0.486486V5.51351H11.5135C11.6425 5.51351 11.7663 5.56477 11.8575 5.656C11.9487 5.74724 12 5.87098 12 6C12 6.12902 11.9487 6.25276 11.8575 6.344C11.7663 6.43523 11.6425 6.48649 11.5135 6.48649H6.48649V11.5135C6.48649 11.6425 6.43523 11.7663 6.344 11.8575C6.25276 11.9487 6.12902 12 6 12C5.87098 12 5.74724 11.9487 5.656 11.8575C5.56477 11.7663 5.51351 11.6425 5.51351 11.5135V6.48649H0.486486C0.357462 6.48649 0.233722 6.43523 0.142489 6.344C0.0512546 6.25276 0 6.12902 0 6C0 5.87098 0.0512546 5.74724 0.142489 5.656C0.233722 5.56477 0.357462 5.51351 0.486486 5.51351H5.51351V0.486486C5.51351 0.357462 5.56477 0.233722 5.656 0.142489C5.74724 0.0512546 5.87098 0 6 0Z"
                      fill="white"
                    />
                  </svg>
                  Add
                </span>
              )}
            </form>
            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15 mt-auto">
              <span
                onClick={handleBack}
                className="py-1.5 sm:py-3 px-6 sm:px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
              >
                Back
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bulk;
