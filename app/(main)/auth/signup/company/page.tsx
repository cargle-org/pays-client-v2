"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import login1 from "@/assets/imgs/auth/pays_login_1.png";
import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";

const CompanyLogin = ({ setDisplay }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignup, setSignupDetails, authLoading }: any =
    useGeneralContext();

  const onchangeHandler = async (e: any) => {
    e.persist();
    setSignupDetails((item: any) => ({
      ...item,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setSignupDetails((item: any) => ({
      ...item,
      isCompany: true,
    }));
  }, []);
  return (
    <>
      <div className="max-w-md lg:max-w-[2560px] mx-auto w-full min-h-screen flex items-center justify-center py-16 lg:pt-32">
        {/* content */}
        <div className="min-h-[60%] w-[80%] flex flex-col items-center lg:min-h-[80%]">
          {/* divider */}
          <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish/30"></div>
          <div className="w-full flex flex-col-reverse justify-between items-start gap-6 h-[100%] lg:flex-row lg:space-x-5">
            {/* left */}
            <form
              onSubmit={handleSignup}
              className="w-full h-[100%] flex flex-col justify-between gap-4 lg:h-[600px] lg:w-[50%]"
            >
              {/* left top */}
              <div className="flex flex-col gap-6 justify-start">
                {/* title-bytext */}
                <div className="flex flex-col justify-start font-geistsans mb-4">
                  <span className="font-bold text-[32px] lg:text-4xl text-brand-dark leading-[43.71px] tracking-tight md:tracking-normal">
                    Let&apos;s get you set up
                  </span>
                  <span className="font-normal text-xs text-brand-dark leading-5">
                    Complete the Fields Below – Your Personalized Voucher
                    Experience Awaits!
                  </span>
                </div>
                {/* input fields */}
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Company Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Company Name"
                    onChange={onchangeHandler}
                    className="w-full xl:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Official Email Address
                  </span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Official Email Address"
                    onChange={onchangeHandler}
                    className="w-full xl:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Official Phone Number
                  </span>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Official Phone Number"
                    onChange={onchangeHandler}
                    className="w-full xl:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <span className="font-medium text-sm text-gray-500 font-geistsans mb-2">
                    Password
                  </span>
                  <div className="relative max-w-full xl:max-w-fit">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={onchangeHandler}
                      className="w-full xl:w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish rounded-lg text-brand-grayish bg-transparent"
                    />
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-grayish cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <path
                        d="M3.27473 14.0687L4.16848 13.1812C3.18987 12.3026 2.42097 11.2154 1.91848 10C3.18723 6.83125 6.68723 4.375 9.99973 4.375C10.8522 4.38625 11.6969 4.5383 12.4997 4.825L13.4685 3.85C12.3701 3.38583 11.192 3.13959 9.99973 3.125C7.96256 3.20161 5.99248 3.87347 4.33298 5.05755C2.67349 6.24163 1.39733 7.88603 0.662234 9.7875C0.612589 9.92482 0.612589 10.0752 0.662234 10.2125C1.21739 11.6856 2.1125 13.0069 3.27473 14.0687Z"
                        fill="#9CA3AF"
                      />
                      <path
                        d="M7.5 9.83125C7.54346 9.23232 7.80106 8.66905 8.22568 8.24443C8.6503 7.81981 9.21357 7.56221 9.8125 7.51875L10.9438 6.38125C10.3099 6.21434 9.64327 6.21651 9.01047 6.38754C8.37767 6.55857 7.80076 6.89248 7.33725 7.356C6.87373 7.81951 6.53982 8.39642 6.36879 9.02922C6.19776 9.66202 6.19559 10.3286 6.3625 10.9625L7.5 9.83125ZM19.3375 9.7875C18.6208 7.92075 17.3738 6.30439 15.75 5.1375L18.75 2.13125L17.8687 1.25L1.25 17.8687L2.13125 18.75L5.31875 15.5625C6.73992 16.3963 8.35253 16.8484 10 16.875C12.0372 16.7984 14.0073 16.1265 15.6667 14.9424C17.3262 13.7584 18.6024 12.114 19.3375 10.2125C19.3871 10.0752 19.3871 9.92482 19.3375 9.7875ZM12.5 10C12.4974 10.4376 12.3799 10.8668 12.1594 11.2447C11.9389 11.6227 11.6231 11.9361 11.2435 12.1538C10.8639 12.3714 10.4338 12.4856 9.99625 12.485C9.55868 12.4843 9.12894 12.3688 8.75 12.15L12.15 8.75C12.3747 9.12858 12.4954 9.55978 12.5 10ZM10 15.625C8.68879 15.6021 7.40243 15.2634 6.25 14.6375L7.8375 13.05C8.55959 13.551 9.43471 13.7825 10.3101 13.704C11.1855 13.6256 12.0055 13.2421 12.6269 12.6207C13.2484 11.9992 13.6318 11.1792 13.7103 10.3038C13.7888 9.42846 13.5573 8.55333 13.0562 7.83125L14.85 6.0375C16.2841 7.02186 17.4056 8.39714 18.0812 10C16.8125 13.1687 13.3125 15.625 10 15.625Z"
                        fill="#9CA3AF"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {/* left bottom */}
              <div className="flex flex-col gap-4 pt-auto justify-start">
                {authLoading ? (
                  <span className="w-[353px] h-[44px] flex items-center justify-center text-brand-white">
                    <Spinner />
                  </span>
                ) : (
                  <button
                    type="submit"
                    className="transition-fx w-auto xl:w-[353px] h-[44px] capitalize bg-brand-main/20 cursor-pointer rounded-3xl flex items-center justify-center text-brand-white hover:bg-brand-main"
                  >
                    NEXT
                  </button>
                )}
                {/* divider */}
                <div className="w-full max-w-lg h-[0.1px] mt-4 bg-brand-grayish"></div>
                <span className="font-Manrope text-[#262626] text-base font-normal flex justify-around items-center gap-3 w-auto xl:w-[353px] tracking-tighter leading-5">
                  Made a wrong turn?{" "}
                  <span
                    onClick={() => setDisplay("")}
                    className="flex items-center text-[#3B82F6] text-base"
                  >
                    Back to previous{" "}
                    <svg
                      width="12"
                      height="13"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-2"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.263225 12.2368C0.431987 12.4053 0.660751 12.5 0.899267 12.5C1.13778 12.5 1.36655 12.4053 1.53531 12.2368L10.1999 3.5722V10.4007C10.1999 10.6394 10.2947 10.8683 10.4635 11.0371C10.6323 11.2059 10.8612 11.3007 11.0999 11.3007C11.3387 11.3007 11.5676 11.2059 11.7364 11.0371C11.9052 10.8683 12 10.6394 12 10.4007V1.40006C12 1.16135 11.9052 0.932415 11.7364 0.763621C11.5676 0.594827 11.3387 0.5 11.0999 0.5H2.09935C1.86064 0.5 1.6317 0.594827 1.46291 0.763621C1.29411 0.932415 1.19929 1.16135 1.19929 1.40006C1.19929 1.63877 1.29411 1.8677 1.46291 2.0365C1.6317 2.20529 1.86064 2.30012 2.09935 2.30012H8.9278L0.263225 10.9647C0.0946735 11.1335 0 11.3622 0 11.6007C0 11.8392 0.0946735 12.068 0.263225 12.2368Z"
                        fill="#3B82F6"
                      />
                    </svg>{" "}
                  </span>
                </span>
              </div>
            </form>
            {/* right */}
            <div className="hidden w-[50%]  justify-end gap-4 lg:h-[600px] lg:flex">
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

export default CompanyLogin;
