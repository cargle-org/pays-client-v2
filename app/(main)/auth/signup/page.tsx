"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/imgs/auth/pays_logo.png";
import login1 from "@/assets/imgs/auth/pays_login_1.png";
import IndividualLogin from "./individual/page";
import CompanyLogin from "./company/page";

const Login = () => {
  const [display, setDisplay] = useState("");
  return (
    <>
      {display === "individual" && <IndividualLogin setDisplay={setDisplay} />}
      {display === "company" && <CompanyLogin setDisplay={setDisplay} />}
      {display === "" && (
        <div className="max-w-md lg:max-w-[2560px] mx-auto w-full min-h-screen flex items-center justify-center py-16 lg:pt-32">
          {/* content */}
          <div className="min-h-[60%] w-[80%] flex flex-col items-center lg:min-h-[80%]">
            {/* divider */}
            <div className="w-[95%] h-[0.1px] mb-8 bg-brand-grayish/30"></div>

            <div className="w-full flex flex-col-reverse justify-between items-start gap-8 h-[100%] lg:gap-6 lg:flex-row">
              {/* left */}
              <div className="w-full h-[100%] flex flex-col justify-between gap-4 lg:h-[600px] lg:w-[50%]">
                {/* left top */}
                <div className="flex flex-col gap-6 justify-start">
                  {/* logo */}
                  <div className="mb-8 w-[87px]">
                    <Image
                      src={logo}
                      alt="logo"
                      priority
                      className="w-[87px] h-[31px]"
                    />
                  </div>
                  {/* title-bytext */}
                  <div className="flex flex-col justify-start font-geistsans mb-4 gap-2">
                    <span className="font-bold text-[32px] lg:text-4xl text-brand-dark">
                      Sign Up As
                    </span>
                    <span className="font-normal text-xs text-brand-dark">
                      Join Us as an Individual or Company and Experience
                      Tailored Benefits
                    </span>
                  </div>
                  {/* input fields */}
                  <div className="flex flex-col items-center justify-start gap-6 lg:flex-row">
                    <div
                      onClick={() => setDisplay("individual")}
                      className="transition-fx group w-full max-w-[240px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                    >
                      <svg
                        className="w-11 h-11 xl:w-[58px] xl:h-[58px]"
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
                      <span className="font-bold text-lg lg:text-2xl font-geistsans leading-6">
                        Individual
                      </span>
                      <div className="font-normal text-xs text-brand-grayish font-geistsans leading-4">
                        Enjoy exclusive voucher offer just for you
                      </div>
                    </div>
                    <div
                      onClick={() => setDisplay("company")}
                      className="transition-fx group w-full max-w-[240px] p-4 flex flex-col justify-start gap-2 border-[0.1px] border-brand-grayish rounded-lg cursor-pointer hover:text-brand-white hover:bg-brand-main"
                    >
                      <svg
                        className="w-11 h-11 xl:w-[58px] xl:h-[58px]"
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
                      <span className="font-bold text-lg lg:text-2xl gont-geistsans leading-6">
                        Company
                      </span>
                      <div className="font-normal text-xs text-brand-grayish font-geistsans leading-4">
                        Voucher solutions for corporate advantage
                      </div>
                    </div>
                  </div>
                </div>
                {/* left bottom */}
                <div className="flex flex-col gap-4 pt-auto justify-start">
                  {/* divider */}
                  <div className="w-full max-w-lg h-[0.1px] mt-4 bg-brand-grayish"></div>
                  <div>
                    <span className="font-Manrope text-[#262626] text-base font-normal flex justify-around items-center gap-3 w-auto xl:w-[353px] tracking-tighter leading-5">
                      If you don&apos;t have an account{" "}
                      <Link
                        href={"/auth/login"}
                        className="flex items-center text-[#3B82F6] text-base"
                      >
                        Login Here{" "}
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
                      </Link>
                    </span>
                    <span className="font-Manrope text-[#262626] text-base font-normal flex justify-center items-center gap-1 w-auto xl:w-[353px] tracking-tighter leading-5">
                      <span className="text-center font-bold">OR</span>
                      Continue as a{" "}
                      <Link
                        href={"/guest/welcome"}
                        className="flex items-center text-[#3B82F6] font-medium text-base"
                      >
                        Guest?
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="flex w-full justify-end gap-4 lg:h-[600px] lg:w-[50%]">
                <div className="w-full relative rounded-lg lg:w-[508px] lg:h-[600px]">
                  <Image src={login1} alt="Login" priority />
                  <div className="glass-fx hidden absolute w-[90%] bottom-6 left-6 rounded-lg p-4 font-medium text-xl font-geistsans lg:block">
                    Send gifts, Pay anyone, create Voucher, create rewards with
                    Pays
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
