"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import voucher_preview_one from "@/assets/imgs/vouchers/voucher_preview_one.jpg";
import voucher_preview_two from "@/assets/imgs/vouchers/voucher_preview_two.jpg";
import spikk_logo from "@/assets/imgs/vouchers/spikk_logo.svg";
import pays_logo from "@/assets/imgs/auth/pays_logo.png";

const FlipCard = ({
  voucherDetails,
}: {
  voucherDetails: {
    title: string;
    thumbnail: string;
    amountPerVoucher: string;
    voucherCoupons: Array<{ couponCode: string }>;
  };
}) => {
  const [flipped, setFlipped] = useState(false);
  console.log(voucherDetails);
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 5000); // Flips every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const bgStyle = voucherDetails?.thumbnail;

  // Generate QR Code URL
  const qrUrl = "https://www.usepays.co/cashout";

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="relative w-[300px] h-[240px] sm:w-[313px] sm:h-[370px] perspective">
        <div
          className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Card (Barcode) */}
          <div
            style={{
              backgroundImage: `url(/assets/voucher/${bgStyle}.svg)` || "",
              backgroundSize: "cover",
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center backface-hidden ${
              bgStyle?.includes("_") ? "bg-[]" : `bg-[${bgStyle}]`
            }`}
          >
            {!voucherDetails ? (
              <Image
                height={500}
                width={200}
                src={voucher_preview_one} // Change this to your image URL
                alt="Voucher Card"
                className="w-full h-full object-fill rounded-lg"
              />
            ) : (
              <>
                {voucherDetails && (
                  <div className="absolute flex text-center top-7 left-7">
                    <Image
                      src={pays_logo}
                      alt="pays_logo"
                      height={14}
                      width={46}
                    />
                  </div>
                )}
                {voucherDetails && (
                  <div className="absolute flex items-center justify-center left-6 sm:left-7 bottom-10 sm:bottom-14">
                    <span className="text-base sm:text-lg font-semibold px-0.5 tracking-wider">
                      &#8358;{voucherDetails.amountPerVoucher}
                    </span>
                  </div>
                )}
                {voucherDetails?.thumbnail && (
                  <div className="absolute flex left-7 bottom-4 sm:bottom-8">
                    <Image
                      src={spikk_logo}
                      alt="brand_logo"
                      height={30}
                      width={66}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Back Card (White Background) */}
          <div
            style={{
              backgroundImage: `url(/assets/voucher/${voucherDetails?.thumbnail}.svg)`,
              backgroundSize: "cover",
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center rotate-y-180 backface-hidden ${
              bgStyle?.includes("_") ? "bg-[]" : `bg-[${bgStyle}]`
            }`}
          >
            {!voucherDetails ? (
              <Image
                src={voucher_preview_two} // Change this to your image URL
                alt="Gift Card"
                height={500}
                width={200}
                className="w-full h-full object-fill rounded-lg"
              />
            ) : (
              <>
                {voucherDetails?.title && (
                  <div className="absolute flex left-7 top-4 sm:top-7">
                    <span className="text-sm sm:text-lg font-semibold px-0.5 tracking-tight">
                      {voucherDetails.title}
                    </span>
                  </div>
                )}

                {voucherDetails &&
                  voucherDetails?.voucherCoupons.length > 0 && (
                    <div className="absolute flex items-center justify-center bottom-[70px] sm:bottom-[92px]">
                      <span className="text-[10px] sm:text-base text-center font-normal px-0.5 tracking-tight">
                        {voucherDetails.voucherCoupons[0].couponCode}
                      </span>
                    </div>
                  )}
                {voucherDetails?.thumbnail && (
                  <div className="absolute flex left-7 bottom-4 sm:bottom-7">
                    <Image
                      src={spikk_logo}
                      alt="brand_logo"
                      height={30}
                      width={66}
                    />
                  </div>
                )}
                {voucherDetails && (
                  <div className="absolute flex items-center justify-center right-7 bottom-4 sm:bottom-7">
                    <span className="text-base sm:text-lg font-semibold px-0.5 tracking-wider">
                      &#8358;{voucherDetails.amountPerVoucher}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* QR Code Overlay */}
            <div className="absolute flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrUrl}
                size={140}
                bgColor="transparent"
                className="rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
