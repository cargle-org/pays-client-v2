"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/imgs/auth/pays_logo.png";
import login1 from "@/assets/imgs/auth/pays_login_1.png";
import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";
import Manual from "./Manual";
import Bulk from "./Bulk";
// import IndividualLogin from "./individual/page";
// import CompanyLogin from "./company/page";

const Recipients = ({ params }: { params: { key: string } }) => {
  console.log("🚀 ~ Recipients ~ params:", params);
  const {
    token,
    oneVoucherId,
    setOneVoucherId,
    createVoucherLoading,
    setCreateVoucherLoading,
  }: any = useGeneralContext();
  const [display, setDisplay] = useState("");
  return (
    <>
      <div className="flex flex-col gap-4 justify-start w-full mx-auto">
        {/* breadcumb */}
        <div className="flex items-center gap-2 font-geistsans font-normal text-[10px] text-brand-grayish">
          <Link
            href={"/dashboaard/vouchers"}
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
        {display === "manual" && (
          <Manual setDisplay={setDisplay} key={params?.key} />
        )}
        {display === "bulk" && <Bulk />}
        {display === "" && (
          <form
            //   onSubmit={onSubmit}
            className="flex gap-2 items-start justify-between"
          >
            {/* left */}
            <div className="flex flex-col w-max lg:w-[50%]">
              <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start min-h-[80vh]">
                <div className="flex flex-col gap-2 justify-start w-full">
                  <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                    Step 3 of 3
                  </div>
                  <span className="font-bold font-geistsans text-3xl text-brand-dark">
                    Add Voucher Recipients
                  </span>
                </div>
                {/* input fields */}
                <div className="flex items-center justify-start gap-6 my-8">
                  <div
                    onClick={() => setDisplay("manual")}
                    className="transition-fx group max-w-[240px] h-[188px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                  >
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 8C0.5 3.85787 3.85786 0.5 8 0.5H50C54.1421 0.5 57.5 3.85786 57.5 8V50C57.5 54.1421 54.1421 57.5 50 57.5H8C3.85787 57.5 0.5 54.1421 0.5 50V8Z"
                        fill="white"
                        stroke="#D9D9D9"
                      />
                      <path
                        d="M29.0026 28.9987C31.3968 28.9987 33.3359 27.0595 33.3359 24.6654C33.3359 22.2712 31.3968 20.332 29.0026 20.332C26.6084 20.332 24.6693 22.2712 24.6693 24.6654C24.6693 27.0595 26.6084 28.9987 29.0026 28.9987ZM29.0026 31.1654C26.1101 31.1654 20.3359 32.617 20.3359 35.4987V36.582C20.3359 37.1779 20.8234 37.6654 21.4193 37.6654H36.5859C37.1818 37.6654 37.6693 37.1779 37.6693 36.582V35.4987C37.6693 32.617 31.8951 31.1654 29.0026 31.1654Z"
                        fill="#1F0047"
                      />
                    </svg>
                    <span className="font-bold text-2xl gont-geistsans">
                      Manual Recipients
                    </span>
                    <div className="font-normal text-xs text-brand-grayish font-geistsans">
                      Enter recipients manually
                    </div>
                  </div>
                  <div
                    onClick={() => setDisplay("bulk")}
                    className="transition-fx group max-w-[240px] h-[188px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                  >
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 58 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 8C0.5 3.85787 3.85786 0.5 8 0.5H50C54.1421 0.5 57.5 3.85786 57.5 8V50C57.5 54.1421 54.1421 57.5 50 57.5H8C3.85787 57.5 0.5 54.1421 0.5 50V8Z"
                        fill="white"
                        stroke="#D9D9D9"
                      />
                      <path
                        d="M24.645 29.3137C23.3395 29.354 22.2717 29.8698 21.4416 30.861H19.8217C19.1609 30.861 18.6048 30.6978 18.1535 30.3714C17.7022 30.045 17.4766 29.5676 17.4766 28.939C17.4766 26.0941 17.9762 24.6717 18.9755 24.6717C19.0239 24.6717 19.1992 24.7563 19.5014 24.9256C19.8036 25.0948 20.1965 25.2661 20.68 25.4393C21.1635 25.6126 21.6431 25.6992 22.1185 25.6992C22.6585 25.6992 23.1944 25.6066 23.7263 25.4212C23.686 25.7194 23.6659 25.9853 23.6659 26.219C23.6659 27.3392 23.9922 28.3708 24.645 29.3137ZM37.5918 37.0141C37.5918 37.9811 37.2976 38.7447 36.7093 39.3048C36.121 39.8649 35.3393 40.145 34.3642 40.145H23.7988C22.8237 40.145 22.042 39.8649 21.4537 39.3048C20.8654 38.7447 20.5712 37.9811 20.5712 37.0141C20.5712 36.5869 20.5853 36.1699 20.6135 35.7629C20.6417 35.3559 20.6981 34.9167 20.7828 34.4453C20.8674 33.9738 20.9742 33.5366 21.1031 33.1337C21.232 32.7307 21.4053 32.3378 21.6229 31.955C21.8405 31.5722 22.0903 31.2458 22.3724 30.9759C22.6545 30.7059 22.999 30.4903 23.406 30.3291C23.8129 30.1679 24.2622 30.0874 24.7538 30.0874C24.8344 30.0874 25.0077 30.174 25.2736 30.3473C25.5396 30.5205 25.8337 30.7139 26.1561 30.9275C26.4784 31.1411 26.9096 31.3345 27.4496 31.5078C27.9895 31.681 28.5335 31.7677 29.0815 31.7677C29.6295 31.7677 30.1735 31.681 30.7134 31.5078C31.2534 31.3345 31.6845 31.1411 32.0069 30.9275C32.3293 30.7139 32.6234 30.5205 32.8894 30.3473C33.1553 30.174 33.3286 30.0874 33.4092 30.0874C33.9008 30.0874 34.3501 30.1679 34.757 30.3291C35.164 30.4903 35.5085 30.7059 35.7906 30.9759C36.0727 31.2458 36.3225 31.5722 36.5401 31.955C36.7577 32.3378 36.9309 32.7307 37.0599 33.1337C37.1888 33.5366 37.2956 33.9738 37.3802 34.4453C37.4649 34.9167 37.5213 35.3559 37.5495 35.7629C37.5777 36.1699 37.5918 36.5869 37.5918 37.0141ZM25.2132 21.5771C25.2132 22.4313 24.911 23.1607 24.3066 23.7651C23.7021 24.3695 22.9728 24.6717 22.1185 24.6717C21.2643 24.6717 20.5349 24.3695 19.9305 23.7651C19.3261 23.1607 19.0239 22.4313 19.0239 21.5771C19.0239 20.7228 19.3261 19.9935 19.9305 19.3891C20.5349 18.7846 21.2643 18.4824 22.1185 18.4824C22.9728 18.4824 23.7021 18.7846 24.3066 19.3891C24.911 19.9935 25.2132 20.7228 25.2132 21.5771ZM33.7235 26.219C33.7235 27.5004 33.2702 28.5944 32.3635 29.5011C31.4569 30.4077 30.3629 30.861 29.0815 30.861C27.8001 30.861 26.7061 30.4077 25.7995 29.5011C24.8928 28.5944 24.4395 27.5004 24.4395 26.219C24.4395 24.9377 24.8928 23.8437 25.7995 22.937C26.7061 22.0304 27.8001 21.5771 29.0815 21.5771C30.3629 21.5771 31.4569 22.0304 32.3635 22.937C33.2702 23.8437 33.7235 24.9377 33.7235 26.219ZM40.6864 28.939C40.6864 29.5676 40.4608 30.045 40.0095 30.3714C39.5582 30.6978 39.0021 30.861 38.3413 30.861H36.7214C35.8913 29.8698 34.8235 29.354 33.518 29.3137C34.1707 28.3708 34.4971 27.3392 34.4971 26.219C34.4971 25.9853 34.477 25.7194 34.4367 25.4212C34.9686 25.6066 35.5045 25.6992 36.0445 25.6992C36.5199 25.6992 36.9994 25.6126 37.483 25.4393C37.9665 25.2661 38.3594 25.0948 38.6616 24.9256C38.9638 24.7563 39.1391 24.6717 39.1875 24.6717C40.1868 24.6717 40.6864 26.0941 40.6864 28.939ZM39.1391 21.5771C39.1391 22.4313 38.8369 23.1607 38.2325 23.7651C37.628 24.3695 36.8987 24.6717 36.0445 24.6717C35.1902 24.6717 34.4609 24.3695 33.8564 23.7651C33.252 23.1607 32.9498 22.4313 32.9498 21.5771C32.9498 20.7228 33.252 19.9935 33.8564 19.3891C34.4609 18.7846 35.1902 18.4824 36.0445 18.4824C36.8987 18.4824 37.628 18.7846 38.2325 19.3891C38.8369 19.9935 39.1391 20.7228 39.1391 21.5771Z"
                        fill="#1F0047"
                      />
                    </svg>
                    <span className="font-bold text-2xl gont-geistsans">
                      Bulk Recipients
                    </span>
                    <div className="font-normal text-xs text-brand-grayish font-geistsans">
                      Add recipients in bulk from an excel file
                    </div>
                  </div>
                </div>

                {/* bottom buttons */}
                <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15 mt-auto">
                  <Link
                    href={"/dashboard/vouchers"}
                    className="py-3 px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
                  >
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Recipients;
