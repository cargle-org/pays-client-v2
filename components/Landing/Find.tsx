import Image from "next/image";
import React from "react";
import find from "@/assets/imgs/landing/findRight.png";
import ArrowRightUp from "../atoms/Icons/ArrowRightUp";
import CustomButton from "../atoms/CustomButton";

const Find = () => {
  return (
    <div className='w-full max-w-[1200px] mx-auto mt-10 my-24 flex justify-between items-center rounded-xl bg-brand-pink100 sm:flex-col-reverse sm:justify-center sm:px-4 sm:py-8'>
      <div className='sm:w-full l:w-[40%] md:w-[50%] md:px-16 flex flex-col gap-4 sm:pt-10 sm:text-center sm:gap-2'>
        <h3 className='lg:text-[48px] font-medium w-[70%] md:text-[40px] text-[26px] sm:w-full'>
          Find the Perfect Gift
        </h3>
        <p className='text-brand-gray200 pb-6 sm:w-[80%] sm:mx-auto'>
          Select the occasion (birthday, anniversary, thank you, etc.), and get recommendations gift card designs.
        </p>
        <CustomButton borderRadius={`sm:rounded-[20px] rounded-xl`} className='sm:w-[250px] sm:mx-auto'>
          Create your Gift Card <ArrowRightUp />
        </CustomButton>
      </div>
      <div className='sm:w-full w-1/2'>
        <Image
          src={find}
          alt={"find-package"}
          width={600}
          height={530}
          priority
          className='md:ml-auto rounded-xl sm:mx-auto'
        />
      </div>
    </div>
  );
};

export default Find;
