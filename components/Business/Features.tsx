import React from "react";
import gift from "@/assets/svgs/Gift.svg";
import cup from "@/assets/svgs/Cup.svg";
import bulk from "@/assets/svgs/Bulk.svg";
import Image from "next/image";

const Features = () => {
  const featuresData = [
    {
      icon: gift,
      title: "Custom Branding for Vouchers",
      content: "Add your business logo and custom designs to vouchers to reflect your brand identity.",
    },
    {
      icon: bulk,
      title: "Bulk Voucher Creation",
      content: "Generate multiple vouchers to reward employees, attract customers, or run promotions efficiently.",
    },
    {
      icon: cup,
      title: "Reward Loyalty",
      content: "Spreads your brand to new audiences and also incentivizes existing customers.",
    },
  ];
  return (
    <div className='w-full max-w-[1300px] mx-auto px-10 sm:px-4 mb-[150px]'>
      <div className='text-brand-gray500 md:max-w-[80%] sm:text-center sm:mx-auto w-full sm:px-6'>
        <small className='px-4 py-2 rounded-3xl bg-brand-gray400  font-light xs:text-[10px]'>Our Features</small>
        <h3 className='l:text-[64px] lg:text-[50px] lg:leading-[60px] text-[38px] font-medium l:leading-[84px] sm:leading-[46px] xs:text-[32px] my-4'>
          Transform your business with powerful gift card features
        </h3>
        <p className='text-[20px] xs:text-[14px] font-light'>
          Customize, reward, and scale your brand with effortless voucher options
        </p>
      </div>
      <div className='w-full flex sm:flex-col sm:text-center sm:items-center sm:justify-center gap-4 justify-between items-start my-20'>
        {featuresData.map(({ icon, content, title }, index) => (
          <div key={index} className='w-full'>
            <Image src={icon} alt='icon' width={50} height={50} className='sm:mx-auto' />
            <h3 className='text-lg font-medium mt-4 xs:text-base'>{title}</h3>
            <p className='font-light text-brand-gray200 max-w-[350px] sm:mx-auto w-full xs:text-sm'>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
