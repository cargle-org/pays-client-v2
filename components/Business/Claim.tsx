import React from "react";
import CustomButton from "../atoms/CustomButton";
import ArrowRightUp from "../atoms/Icons/ArrowRightUp";

const Claim = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/imgs/purpleLinen.png")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className='w-full max-w-[1200px] mx-auto h-[500px] p-2 relative'>
      <div className='absolute bg-white opacity-20 top-2 left-2 bottom-2 right-2 '></div>
      <div className='flex justify-center items-center flex-col text-white px-2 w-full h-full z-10'>
        <h1 className='l:text-[64px] lg:text-[50px] lg:leading-[60px] text-[38px] font-medium l:leading-[84px] sm:leading-[46px] xs:text-[32px] my-4 text-center max-w-[700px] mx-auto'>
          Transform rewards and gifting with Usepays
        </h1>
        <p className='my-5 max-w-[600px] text-center '>
          Effortlessly reward employees, engage customers, and drive growth with our voucher creation and redemption
          services.
        </p>
        <CustomButton isSecondary onClick={() => {}} borderRadius='rounded-[50px]' className='w-[250px]'>
          Create your Gift card <ArrowRightUp />
        </CustomButton>
      </div>
    </div>
  );
};

export default Claim;
