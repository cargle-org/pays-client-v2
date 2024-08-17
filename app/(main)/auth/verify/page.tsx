"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import login1 from "@/assets/imgs/auth/pays_login_1.png";
import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";

import { useRouter } from "next/navigation";

const Page = () => {
  const {
    authLoading,
    handleVerifyEmail,
    verifyEmailDetails,
    setVerifyEmailDetails,
  }: any = useGeneralContext();

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    // Extract query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const fetchedId = urlParams.get("id") as any;
    const fetchedEmailToken = urlParams.get("emailToken") as any;
    setVerifyEmailDetails((item: any) => ({
      ...item,
      id: fetchedId,
      emailToken: fetchedEmailToken,
    }));
  }, []);

  useEffect(() => {
    if (verifyEmailDetails.id) handleVerifyEmail();
  }, [verifyEmailDetails]);

  return (
    <>
      <div className="max-w-[2560px] mx-auto w-full h-screen flex items-center justify-center">
        {/* content */}
        <div className="min-h-[60%] w-[80%] flex flex-col items-center lg:min-h-[80%]">
          {/* divider */}
          <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish"></div>
          <div className="w-full flex justify-between items-start">
            {/* left */}
            <div className="w-[50%] h-[100%] flex flex-col justify-between gap-4 lg:h-[600px]">
              {/* left top */}
              <div className="flex flex-col gap-6 justify-start">
                {/* title-bytext */}
                <div className="flex flex-col justify-start font-geistsans mb-4">
                  <span className="font-bold text-4xl text-brand-dark">
                    Verify Account
                  </span>
                  <span className="font-normal text-xs text-brand-dark">
                    Please verify your account to continue the signup process.
                  </span>
                </div>
                <div className="my-16 flex flex-col gap-8">
                  <span className="w-2/3 font-geistsans font-normal text-lg">
                    Your account have been verified successfully, please login
                    to get started.
                  </span>
                  {authLoading ? (
                    <span className="w-[353px] h-[44px] flex items-center justify-center text-brand-white">
                      <Spinner />
                    </span>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="transition-fx w-[353px] h-[44px] capitalize bg-brand-main/20 cursor-pointer rounded-3xl flex items-center justify-center text-brand-white hover:bg-brand-main"
                    >
                      LOGIN
                    </Link>
                  )}
                </div>
              </div>
            </div>
            {/* right */}
            <div className="w-[50%] flex justify-end gap-4 lg:lg:h-[600px]">
              <div className="relative rounded-lg w-[508px] h-[600px]">
                <Image src={login1} alt="Login" priority />
                <div className="glass-fx absolute w-[90%] bottom-6 left-6 rounded-lg p-4 font-medium text-xl font-geistsans">
                  Send gifts, Pay anyone, create Voucher, create rewards with
                  Pays
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
