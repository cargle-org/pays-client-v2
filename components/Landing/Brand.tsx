import React from "react";
import moniepoint from "@/assets/svgs/Moniepoint.svg";
import spikk from "@/assets/svgs/Spikk.svg";
import jumia from "@/assets/svgs/Jumia.svg";
import konga from "@/assets/svgs/Konga.svg";
import nestle from "@/assets/svgs/Nestle.svg";
import netflix from "@/assets/svgs/Netflix.svg";
import Image from "next/image";

const Brand = () => {
  const brands = [
    { name: moniepoint, size: 90 },
    { name: spikk, size: 40 },
    { name: jumia, size: 60 },
    { name: konga, size: 55 },
    { name: nestle, size: 50 },
    { name: netflix, size: 60 },
  ];

  return (
    <div className='bg-white min-h-[400px] flex flex-col items-center justify-center'>
      <div className='bg-brand-gray300 px-4 py-4 w-full'>
        <div className='w-full max-w-[1300px] mx-auto flex justify-between items-center gap-6 sm:flex-col sm:gap-4'>
          <p className='w-[40%] sm:w-full sm:text-center text-[14px]'>Gift cards available for these brands:</p>
          <div className='flex justify-between items-center flex-1 sm:w-full xs:flex-wrap gap-x-4 xs:justify-center'>
            {brands.map(({ name, size }, index) => (
              <Image key={index} src={name} alt='brand' width={size} height={20} layout='fixed' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;
