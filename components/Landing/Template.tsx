import React from "react";
import spikk from "@/assets/svgs/Spikk.svg";
import qr from "@/assets/svgs/Qr-code.svg";
import pays from "@/assets/svgs/Pays.svg";
import Image from "next/image";

const Template = () => {
  const templateData = [
    {
      titleTop: "Birthdays & Anniversaries",
      titleDown: "Make their day extra special with a customized gift voucher.",
      bgImage: "/imgs/lightBlueSilk.png",
      color: "bg-brand-lightBlue",
    },
    {
      titleTop: "Festive Seasons",
      titleDown: "Spread joy during Christmas, Eid, or other celebrations with pre-scheduled gifts.",
      bgImage: "/imgs/roseSilk.png",
      color: "bg-brand-pink200",
    },
    {
      titleTop: "Random Acts of Kindness",
      titleDown: "Brighten someone’s day with an unexpected token of appreciation.",
      bgImage: "/imgs/goldSilk.png",
      color: "bg-brand-yellow100",
    },
    {
      titleTop: "Reward Hardwork",
      titleDown: "Celebrate your child's achievements with Usepays vouchers, perfect for rewarding.",
      bgImage: "/imgs/violetSilk.png",
      color: "bg-brand-lightBlue",
    },
  ];

  return (
    <div className='bg-white py-20'>
      <div className='w-full max-w-[1300px] mx-auto px-10 sm:px-4'>
        <div className='text-brand-gray500 md:max-w-[85%] sm:text-center sm:mx-auto w-full sm:px-6'>
          <small className='px-4 py-2 rounded-3xl bg-brand-gray400 font-light xs:text-[10px]'>Our Use Cases</small>
          <h3 className='l:text-[64px] lg:text-[50px] lg:leading-[60px] text-[38px] font-medium l:leading-[84px] sm:leading-[46px]  xs:text-[32px] my-4'>
            Take a look at how our gift cards and vouchers can be leveraged across different industries and needs.
          </h3>
        </div>
        <div className='w-full overflow-x-auto flex gap-4 mt-10 py-6 remove-scroll'>
          {templateData.map((data, index) => (
            <div
              className={`${data.color} px-6 py-4 flex flex-col gap-4 justify-between items-start rounded-xl`}
              key={index}>
              <div>
                <h5 className='text-[24px] font-medium'>{data.titleTop}</h5>
                <p className='font-light my-2'>{data.titleDown}</p>
              </div>
              <div className='card-container border-white'>
                <div className='card'>
                  <div style={{ backgroundImage: `url(${data.bgImage})` }} className={`w-full h-full card-front`}>
                    <div className='overlay'></div>
                    <div className='z-10 text-center'>
                      <Image src={spikk} alt='Center Logo' width={110} height={40} />
                      <p className='pt-2 text-brand-gray200'>₦2000</p>
                    </div>
                    <Image src={pays} alt='Bottom Logo' width={50} height={40} className='z-10 absolute bottom-4' />
                  </div>
                  <div style={{ backgroundImage: `url(${data.bgImage})` }} className='card-back'>
                    <div className='overlay'></div>
                    <div className='z-10 text-center'>
                      <Image className='z-10' src={qr} alt='Center Logo' width={150} height={100} />
                      <p className='font-light pt-2 text-[18px] sm:text-[16px] text-brand-gray500'>Spikk-990-2219</p>
                    </div>
                    <div className='absolute top-6 left-10 z-10 text-black text-[20px] sm:text-[16px] font-medium'>
                      Gift Card
                    </div>
                    <div className='absolute top-6 right-10 z-10 text-black text-[20px] sm:text-[16px] font-medium'>
                      30%
                    </div>
                    <Image
                      className='absolute bottom-6 left-10 z-10'
                      src={spikk}
                      alt='Center Logo'
                      width={100}
                      height={40}
                    />
                    <div className='absolute bottom-6 right-10 z-10 text-black text-[24px] sm:text-[20px] font-medium'>
                      ₦14,500
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template;
