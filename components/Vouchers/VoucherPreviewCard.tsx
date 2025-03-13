import React, { useEffect, useState } from "react";
import Image from "next/image";

import { QRCodeSVG } from "qrcode.react";

import voucher_preview_one from "@/assets/imgs/vouchers/voucher_preview_one.jpg";
import voucher_preview_two from "@/assets/imgs/vouchers/voucher_preview_two.jpg";
import { format } from "date-fns";

interface VoucherFormDataProps {
  title: string;
  expiryDate: Date | number | string;
  description: string;
  logo: string | null;
  voucherKey: string;
  amountPerVoucher: string;
  totalNumberOfVouchers: string;
  backgroundStyle: string;
}

interface VoucherPreviewCardProps {
  formData: VoucherFormDataProps;
  frontCardView?: string;
  backCardView?: string;
}

function VoucherPreviewCard({
  formData,
  frontCardView,
  backCardView,
}: VoucherPreviewCardProps) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 4000); // Flips every 4 seconds

    return () => clearInterval(interval);
  }, []);

  //check if background is a color or image
  const bgColor = formData.backgroundStyle;
  const backgroundStyle = bgColor?.includes(".png");

  // Generate QR Code URL
  const qrUrl = "https://www.usepays.co/cashout";

  return (
    <div className="sm:py-1.5 md:py-2 mb-3 flex items-center justify-center">
      <div className="relative sm:w-[185px] sm:h-[215px] md:w-[235px] md:h-[270px] perspective">
        <div
          className={`w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front Card (Barcode) */}
          <div
            style={{
              backgroundImage: `${backgroundStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: backgroundStyle ? "" : bgColor,
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center backface-hidden ${backCardView}`}
          >
            {formData && (
              <>
                {formData && (
                  <div className="absolute flex left-7 top-4 sm:top-3">
                    <span className="sm:text-sm md:text-lg font-semibold px-0.5">
                      {formData.title}
                    </span>
                  </div>
                )}

                {formData && formData.voucherKey.length > 0 && (
                  <div className="absolute flex items-center justify-center bottom-10 md:bottom-[56px]">
                    <span className="text-[10px] sm:text-xs md:text-base text-center font-normal px-0.5 tracking-tight">
                      {formData.voucherKey}
                    </span>
                  </div>
                )}

                {formData?.logo !== null && formData?.logo !== "" && (
                  <div className="absolute flex left-5 sm:left-4 bottom-5 sm:bottom-2">
                    <img
                      src={formData?.logo ?? ""}
                      alt="brand_logo"
                      className="h-full max-h-[20px] w-full max-w-[90px]"
                    />
                  </div>
                )}
                {formData && (
                  <div className="absolute flex items-center justify-center right-5 sm:right-4 bottom-4 sm:bottom-3 md:bottom-4">
                    <span className="sm:text-sm md:text-lg font-semibold px-0.5 tracking-wider">
                      &#8358;{formData.amountPerVoucher}
                    </span>
                  </div>
                )}
              </>
            )}

            {/* QR Code Overlay */}
            <div className="absolute flex flex-col items-center justify-center">
              <QRCodeSVG
                value={qrUrl}
                size={130}
                bgColor="transparent"
                className="rounded-md shadow-lg sm:size-[105px] md:size-[120px]"
              />
            </div>
          </div>
          {/* Back Card (White Background) */}
          <div
            style={{
              backgroundImage: `${backgroundStyle ? `url(${bgColor})` : ""}`,
              backgroundSize: "cover",
              backgroundColor: backgroundStyle ? "" : bgColor,
            }}
            className={`absolute w-full h-full bg-white shadow-lg rounded-lg flex items-center justify-center backface-hidden ${frontCardView}`}
          >
            {!formData ? (
              <Image
                height={300}
                width={200}
                src={voucher_preview_one} // Change this to your image URL
                alt="Voucher Card"
                className="w-full h-full object-fill rounded-lg"
              />
            ) : (
              <>
                {formData && (
                  <>
                    <div className="absolute flex text-center top-5 sm:top-4 left-7 sm:left-4">
                      <Image
                        src="https://res.cloudinary.com/dpz3rs8ay/image/upload/v1740519503/usepays/pays-logo_gpqzyp.svg"
                        alt="pays_logo"
                        height={16.32}
                        width={48.97}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      Expires on {format(formData.expiryDate, "MM-dd-yyyy")}
                    </div>
                    <div className="absolute flex items-center justify-center left-7 sm:left-4 bottom-10">
                      <span className="sm:text-sm md:text-lg font-semibold px-0.5 tracking-wider">
                        &#8358;{formData.amountPerVoucher}
                      </span>
                    </div>

                    {formData.logo !== null && formData.logo !== "" && (
                      <div className="absolute flex left-7 sm:left-4 bottom-6 sm:bottom-4">
                        <img
                          src={formData?.logo ?? ""}
                          alt="brand_logo"
                          className="h-full max-h-[20px] w-full max-w-[90px]"
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoucherPreviewCard;
