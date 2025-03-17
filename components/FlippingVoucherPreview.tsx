"use client";

import React, { useRef } from "react";
import Image from "next/image";

import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

import FlipCard from "./FlipCard";

const FlippingVoucherPreview = ({
  amount,
  // amountPerVoucher,
  voucherCoupon,
  couponCode,
  voucherDetails,
}: {
  couponCode?: string | undefined;
  amount?: string;
  voucherCoupon?: string;
  voucherDetails: {
    logo: string;
    title: string;
    backgroundStyle: string;
    amountPerVoucher?: string;
  };
}) => {
  const cardRef = useRef(null);

  const bgColor = voucherDetails?.backgroundStyle;
  const bgStyle = bgColor?.includes(".png");

  // Generate QR Code URL
  const qrUrl = "https://www.usepays.co/cashout";

  // Download as PNG image
  const handleDownloadImage = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "voucher-card.png";
      link.click();
    }
  };

  return (
    <>
      <FlipCard
        handleDownloadImage={handleDownloadImage}
        voucherDetails={voucherDetails}
        couponCode={couponCode}
        voucherCoupon={voucherCoupon}
        amount={amount}
      />

      <div className="flex flex-col items-center gap-4">
        {/* Container for front and back cards side by side */}
        <div ref={cardRef} className="flex gap-1 absolute left-[-9999px] top-0">
          {/* Front Card */}
          <div
            style={{
              backgroundImage: `${bgStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: bgStyle ? "" : bgColor,
            }}
            className={`relative w-[170px] h-[200px] bg-white shadow-lg rounded-lg flex items-center justify-center`}
          >
            <div className="absolute flex text-center top-4 left-[18px]">
              <Image
                src="https://res.cloudinary.com/dpz3rs8ay/image/upload/v1740519503/usepays/pays-logo_gpqzyp.svg"
                alt="pays_logo"
                height={16.32}
                width={48.97}
              />
            </div>

            <div className="absolute flex items-center justify-center left-4 bottom-10">
              <span className="text-base font-semibold px-0.5 tracking-wider">
                &#8358;{voucherDetails?.amountPerVoucher}
              </span>
            </div>

            <div className="absolute flex left-5 bottom-[14px]">
              {voucherDetails?.logo !== "null" &&
                voucherDetails?.logo !== "undefined" && (
                  <img
                    src={voucherDetails?.logo ?? ""}
                    alt="brand_logo"
                    className="h-full max-h-[16px] w-full max-w-[60px]"
                  />
                )}
            </div>
          </div>

          {/* Back Card */}
          <div
            style={{
              backgroundImage: `${bgStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: bgStyle ? "" : bgColor,
            }}
            className={`relative w-[170px] h-[200px] bg-white shadow-lg rounded-lg flex items-center justify-center`}
          >
            <div className="absolute flex left-5 top-1">
              <span className="text-sm text-start font-semibold px-0.5">
                {voucherDetails?.title}
              </span>
            </div>

            <div className="absolute flex items-center justify-center sm:bottom-[60px] md:bottom-[54px]">
              <span className="text-[10px] text-center font-normal px-0.5 tracking-tight">
                {voucherCoupon ?? couponCode}
              </span>
            </div>

            <div className="absolute flex left-4 bottom-[14px]">
              {voucherDetails?.logo !== "null" &&
                voucherDetails?.logo !== "undefined" && (
                  <img
                    src={voucherDetails?.logo ?? ""}
                    alt="brand_logo"
                    className="h-full max-h-[16px] w-full max-w-[60px]"
                  />
                )}
            </div>

            {voucherDetails && (
              <div className="absolute flex items-center justify-center right-4 bottom-5">
                <span className="text-sm font-semibold px-0.5 tracking-wider">
                  &#8358;{amount ?? voucherDetails?.amountPerVoucher}
                </span>
              </div>
            )}

            {/* QR Code Overlay */}
            <div className="absolute sm:bottom-[66px] md:bottom-[62px] flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrUrl}
                size={140}
                bgColor="transparent"
                className="rounded-md shadow-lg sm:w-[130px] md:size-[100px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlippingVoucherPreview;
