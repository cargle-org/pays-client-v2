"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import { Download } from "lucide-react";

import voucher_preview_one from "@/assets/imgs/vouchers/voucher_preview_one.jpg";
import voucher_preview_two from "@/assets/imgs/vouchers/voucher_preview_two.jpg";

const FlipCard = ({
  handleDownloadImage,
  voucherDetails,
  couponCode,
  amount,
  voucherCoupon,
}: {
  voucherCoupon?: string;
  handleDownloadImage: () => void;
  voucherDetails: {
    logo: string;
    title: string;
    backgroundStyle: string;
    amountPerVoucher?: string;
  };
  couponCode?: string | undefined;
  amount?: string;
}) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 4000); // Flips every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const bgColor = voucherDetails?.backgroundStyle;
  const bgStyle = bgColor?.includes(".png");

  // Generate QR Code URL
  const qrUrl = "https://www.usepays.co/cashout";

  return (
    <div className="md:py-2 flex items-center justify-center bg-gray-100">
      <div className="relative sm:w-[250px] sm:h-[270px] md:w-[313px] md:h-[370px] perspective">
        <div
          className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Card (Barcode) */}
          <div
            style={{
              backgroundImage: `${bgStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: bgStyle ? "" : bgColor,
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center backface-hidden`}
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
                  <>
                    <div className="absolute flex text-center top-7 left-7">
                      <Image
                        src="https://res.cloudinary.com/dpz3rs8ay/image/upload/v1740519503/usepays/pays-logo_gpqzyp.svg"
                        alt="pays_logo"
                        height={16.32}
                        width={48.97}
                      />
                    </div>

                    <div className="absolute flex items-center justify-center left-7 bottom-10 md:bottom-14">
                      <span className="text-lg font-semibold px-0.5 tracking-wider">
                        &#8358;{voucherDetails.amountPerVoucher ?? amount}
                      </span>
                    </div>

                    <div className="absolute flex left-7 bottom-6 sm:bottom-[14px]">
                      {voucherDetails?.logo !== "null" &&
                        voucherDetails?.logo !== "undefined" && (
                          <img
                            src={voucherDetails?.logo ?? ""}
                            alt="brand_logo"
                            className="h-full max-h-[30px] w-full max-w-[90px]"
                          />
                        )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Back Card (White Background) */}
          <div
            style={{
              backgroundImage: `${bgStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: bgStyle ? "" : bgColor,
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center rotate-y-180 backface-hidden`}
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
                {voucherDetails && (
                  <div className="absolute flex left-7 top-4 sm:top-5 md:top-7">
                    <span className="text-lg font-semibold px-0.5">
                      {voucherDetails.title}
                    </span>
                  </div>
                )}

                {voucherDetails && (
                  <div className="absolute flex items-center justify-center bottom-[60px] md:bottom-[89px]">
                    <span className="text-[10px] sm:text-sm md:text-base text-center font-normal px-0.5 tracking-tight">
                      {voucherCoupon ?? couponCode}
                    </span>
                  </div>
                )}
                {voucherDetails?.backgroundStyle && (
                  <div className="absolute flex left-7 bottom-6 sm:bottom-[14px]">
                    {voucherDetails?.logo !== "null" &&
                      voucherDetails?.logo !== "undefined" && (
                        <img
                          src={voucherDetails?.logo ?? ""}
                          alt="brand_logo"
                          className="h-full max-h-[30px] w-full max-w-[90px]"
                        />
                      )}
                  </div>
                )}
                {voucherDetails && (
                  <div className="absolute flex items-center justify-center right-7 bottom-4 sm:bottom-4 md:bottom-7">
                    <span className="text-lg font-semibold px-0.5 tracking-wider">
                      &#8358;{voucherDetails.amountPerVoucher ?? amount}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* QR Code Overlay */}
            <div className="absolute flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrUrl}
                size={150}
                bgColor="transparent"
                className="rounded-md shadow-lg sm:w-[140px] sm:h-[110px] md:size-[150px]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Buttons for Download */}
      <div className="flex absolute">
        <button
          onClick={handleDownloadImage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          <Download />
        </button>
      </div>
    </div>
  );
};

export default FlipCard;
