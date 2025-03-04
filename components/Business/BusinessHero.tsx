"use client";
import React, { useState, useEffect } from "react";
import CustomButton from "../atoms/CustomButton";
import ArrowRightUp from "../atoms/Icons/ArrowRightUp";
import { colors } from "@/constants/colors";
import spikk from "@/assets/svgs/Spikk.svg";
import qr from "@/assets/svgs/Qr-code.svg";
import pays from "@/assets/svgs/Pays.svg";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/navigation";

const BusinessHero = () => {
  const templateData = [
    {
      titleTop: "Birthdays & Anniversaries",
      titleDown: "Make their day extra special with a customized gift voucher.",
      bgImage: "/imgs/skyBlueMarble.png",
      color: "bg-brand-lightBlue",
    },
    {
      titleTop: "Festive Seasons",
      titleDown: "Spread joy during Christmas, Eid, or other celebrations with pre-scheduled gifts.",
      bgImage: "/imgs/orange.png",
      color: "bg-brand-pink200",
    },
    {
      titleTop: "Random Acts of Kindness",
      titleDown: "Brighten someone’s day with an unexpected token of appreciation.",
      bgImage: "/imgs/pinkGradient.png",
      color: "bg-brand-yellow100",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % templateData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [templateData.length]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const { isTablet } = useResponsive();

  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className='w-full max-w-[1300px] mx-auto px-4 py-14 sm:py-6'>
      <div className='md:gap-4 flex items-center justify-center sm:flex-col sm:gap-4'>
        <div className='w-[50%] xs:w-full sm:text-center sm:w-full sm:px-4 sm:pt-8 md:mt-[-100px] mb-[100px] px-2'>
          <div className='mt-8'> 🎁 ✉️ 💰 🎉 </div>
          <h1 className='l:text-[64px] sm:max-w-[400px] sm:text-center sm:mx-auto lg:text-[50px] lg:leading-[60px] text-[40px] font-medium l:leading-[84px] sm:leading-[40px] xs:text-[34px] mt-4'>
            Easily Send Coperate Gifts & Rewards
          </h1>
          <p className='md:max-w-[80%] text-[20px] sm:max-w-[400px] sm:text-center sm:mx-auto text-brand-gray200 sm:text-brand-grayish xs:text-[16px] sm:pt-3'>
            Celebrate milestones, reward employees or impress clients with customizable vouchers.
          </p>
          <div
            className={
              "flex gap-4 items-center justify-start mt-4 lg:flex-row md:flex-col md:items-start sm:flex-col-reverse"
            }>
            <CustomButton
              onClick={() => handleNavigate("/auth/login")}
              isSecondary
              borderRadius={`sm:rounded-[40px] rounded-xl`}
              className='w-[210px]'>
              Create Gift Card <ArrowRightUp fill={colors.gray200} />{" "}
            </CustomButton>
            <CustomButton
              onClick={() => handleNavigate("/cashout")}
              borderRadius={`sm:rounded-[40px] rounded-xl`}
              className='w-[210px]'>
              Redeem a Gift Card <ArrowRightUp />
            </CustomButton>
          </div>
        </div>
        {!isTablet && (
          <div className='w-[50%] sm:hidden flex items-center justify-center relative h-[500px]'>
            {templateData.map((data, index) => (
              <div
                key={index}
                className={`w-full h-full transition-opacity duration-500 ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}>
                <div
                  style={{ backgroundImage: `url(${data.bgImage})` }}
                  className={`lg:w-[294px] w-[250px] h-[364px] absolute flex flex-col justify-center items-center rounded-lg overflow-hidden top-[-10px] l:left-[40px] bg-cover bg-center md:left-[-10px] sm:left-[100px]`}>
                  <div className='overlay'></div>
                  <div className='z-10 absolute bottom-6 left-6'>
                    <p className='pt-2 text-brand-gray200'>₦2000</p>
                    <Image className='z-10' src={spikk} alt='Center Logo' width={80} height={30} />
                  </div>
                  <Image src={pays} alt='Bottom Logo' width={50} height={40} className='z-10 absolute top-6 left-6' />
                </div>
                <div
                  style={{ backgroundImage: `url(${data.bgImage})` }}
                  className='lg:w-[294px] w-[250px] h-[364px] absolute flex flex-col justify-center items-center rounded-lg overflow-hidden top-24 l:left-[220px] bg-cover bg-center z-10 border-white md:left-[90px] sm:left-[140px]'>
                  <div className='overlay'></div>
                  <div className='z-10 text-center'>
                    <Image className='z-10' src={qr} alt='Center Logo' width={140} height={100} />
                    <p className='font-light pt-2 text-[14px] sm:text-[12px] text-brand-gray500'>Spikk-990-2219</p>
                  </div>
                  <div className='absolute top-6 left-6 z-10 text-black text-[16px] sm:text-[16px] font-medium'>
                    Gift Card
                  </div>
                  <div className='absolute top-6 right-6 z-10 text-black text-[16px] sm:text-[16px] font-medium'>
                    30%
                  </div>
                  <Image
                    className='absolute bottom-6 left-6 z-10'
                    src={spikk}
                    alt='Center Logo'
                    width={80}
                    height={30}
                  />
                  <div className='absolute bottom-6 right-6 z-10 text-black text-[18px] sm:text-[20px] font-medium'>
                    ₦14,500
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isTablet && (
          <div className='w-full px-4 flex items-center justify-center relative h-[400px]'>
            {templateData.map((data, index) => {
              const position = (index - activeSlide + templateData.length) % templateData.length;

              return (
                <div
                  key={index}
                  className={`w-[280px] h-[320px] absolute flex flex-col justify-between items-start rounded-xl bg-cover bg-center transition-all duration-500 ${
                    position === 0
                      ? "z-10 translate-x-0 h-[380px]"
                      : position === 1
                      ? "z-0 translate-x-[15%]"
                      : "z-0 -translate-x-[15%]"
                  }`}
                  style={{ backgroundImage: `url(${data.bgImage})` }}>
                  <div className={`${position !== 0 ? "dark-overlay rounded-2xl" : " hidden"}`}></div>
                  <div className='pt-3 px-3'>
                    <Image src={pays} alt='Bottom Logo' width={50} height={40} className='z-20' />
                  </div>
                  <div className='z-20 pb-3 px-3'>
                    <p className='pt-2 text-brand-gray200'>₦2000</p>
                    <Image className='z-20' src={spikk} alt='Center Logo' width={80} height={30} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='w-fit mx-auto mt-14 flex gap-2'>
        {templateData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`text-[18px] font-medium ${
              activeSlide === index ? "text-brand-gray200" : "text-brand-gray400"
            }`}>
            - {`0${index + 1}`} -
          </button>
        ))}
      </div>
    </div>
  );
};

export default BusinessHero;
