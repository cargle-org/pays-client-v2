import React from "react";
import CustomButton from "../atoms/CustomButton";
import ArrowRightUp from "../atoms/Icons/ArrowRightUp";
import { colors } from "@/constants/colors";
import heroImage from "@/assets/imgs/landing/heroLeft.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  return (
    <div className='w-full md:gap-4 flex items-center justify-center sm:flex-col sm:gap-4 max-w-[1300px] mx-auto px-4 py-14 mb-[200px] sm:py-6'>
      <div className='w-[40%] flex items-center justify-center'>
        <Image src={heroImage} alt='heroImage' width={351} height={330} />
      </div>
      <div className='w-[50%] xs:w-full sm:text-center sm:w-full sm:px-4 sm:pt-8'>
        <h1 className='l:text-[64px] sm:max-w-[400px] sm:text-center sm:mx-auto lg:text-[50px] lg:leading-[60px] text-[40px] font-medium l:leading-[84px] sm:leading-[40px] xs:text-[34px]'>
          Effortless Gifting, Anytime, Anywhere!
        </h1>
        <p className='md:max-w-[80%] text-[20px] text-brand-gray200 sm:text-brand-grayish xs:text-[16px] sm:pt-3'>
          The best way to create vouchers your friends and loved ones can turn into cash, because the best gift is
          choice.
        </p>
        <div
          className={
            "flex gap-4 items-center justify-start mt-4 lg:flex-row md:flex-col md:items-start sm:flex-col-reverse"
          }>
          <CustomButton
            onClick={() => handleNavigate("/auth/login")}
            isSecondary
            borderRadius={`sm:rounded-[40px] rounded-xl`}
            className='w-[240px]'>
            Create Gift Card <ArrowRightUp fill={colors.gray200} />{" "}
          </CustomButton>
          <CustomButton
            onClick={() => handleNavigate("/cashout")}
            borderRadius={`sm:rounded-[40px] rounded-xl`}
            className='w-[240px]'>
            Redeem a Gift Card <ArrowRightUp />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
