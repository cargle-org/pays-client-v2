import React, { useEffect, useState } from "react";
import metricRight from "@/assets/imgs/landing/metricsRight.png";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";

const Metrics = () => {
  const { isMobile } = useResponsive();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const metricsData = [
    { titleTop: "Total", titleDown: "Active Users", value: "12,540 +", color: "bg-brand-pink200" },
    { titleTop: "Redeemed", titleDown: "Vouchers", value: "8,987 +", color: "bg-brand-lightBlue" },
    {
      titleTop: "Total",
      titleDown: "Amount Cashed",
      value: isClient && isMobile ? "₦2.5M" : "₦2,007,987",
      color: "bg-brand-lightGreen",
    },
    { titleTop: "Total", titleDown: "Issued Vouchers", value: "5,987 +", color: "bg-brand-pink100" },
  ];

  return (
    <div className='bg-[#331758] py-20'>
      <div className='w-full max-w-[1300px] mx-auto px-10 sm:px-4'>
        <div className='text-white md:max-w-[80%] sm:text-center sm:mx-auto w-full sm:px-6'>
          <small className='px-4 py-2 rounded-3xl bg-brand-main font-light xs:text-[10px]'>Our Impact in Numbers</small>
          <h3 className='l:text-[64px] lg:text-[50px] lg:leading-[60px] text-[38px] font-medium l:leading-[84px] sm:leading-[46px]   xs:text-[32px] my-4'>
            See how our gift cards are fueling engagement boosting loyalty, and Driving Growth Across Businesses
          </h3>
          <p className='text-[20px] xs:text-[14px] font-light'>
            Join thousands of businesses leveraging, to attract new customers, and drive more sales.
          </p>
        </div>
        <div className='w-full flex items-center justify-between gap-4 mt-16 sm:flex-col-reverse'>
          <div className='grid grid-cols-2 gap-4 w-1/2 gap-y-8 sm:w-full sm:max-w-[450px] sm:mx-auto'>
            {metricsData.map((data, index) => (
              <div
                key={index}
                className={`flex flex-col items-start justify-between gap-8 p-4 rounded-xl ${data.color} h-[195px] sm:h-[150px] w-full`}>
                <div className='text-[12px] font-light'>
                  <div>{data.titleTop}</div>
                  <div>{data.titleDown}</div>
                </div>
                <div>
                  <h3 className='text-[30px] font-semibold whitespace-nowrap xs:text-[24px]'>{data.value}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className='w-1/2 sm:w-full'>
            <Image
              src={metricRight}
              alt='metricView'
              width={450}
              height={320}
              priority
              className='md:ml-auto sm:mx-auto'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
