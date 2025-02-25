import Image from "next/image";
import React from "react";
import pays from "@/assets/svgs/Pays.svg";
import { LocateIcon, Mail, MessageCircle, Phone, PinIcon } from "lucide-react";
import Link from "next/link";
import Facebook from "../atoms/Icons/Facebook";
import X from "../atoms/Icons/X";
import Instagram from "../atoms/Icons/Instagram";
import Tiktok from "../atoms/Icons/Tiktok";

const Footer = () => {
  const footerNav1 = [
    { title: "Get Started", route: "/dashboard" },
    { title: "Privacy", route: "/privacy" },
    { title: "FAQ's ", route: "/faqs" },
    { title: "Terms & Conditions", route: "/terms" },
  ];
  const footerNav2 = [
    { title: "Home", route: "/" },
    { title: "About", route: "/faqs" },
    { title: "Contact", route: "/faqs" },
    { title: "Business on Usepays", route: "/business" },
  ];

  return (
    <div className='w-full bg-brand-gray300'>
      <div className='w-full max-w-[1200px] mx-auto py-4 px-6'>
        <div className='flex justify-between items-start gap-6 my-14 sm:flex-col sm:items-center sm:gap-10'>
          <div>
            <Image src={pays} alt='logo' width={160} height={54} className='sm:mx-auto sm:mb-10' />
            <p className='my-4 text-xl text-brand-gray500 font-light sm:text-center'>
              <span className='font-medium'>Usepays</span> offers a seamless voucher <br />{" "}
              <span className='text-brand-grayish'>creation and redemption service</span>
            </p>
          </div>

          <div>
            <h6 className={"font-medium text-brand-gray500"}>Quick Links</h6>
            <div className='flex flex-col gap-2 items-start mt-2'>
              {footerNav1.map((data, index) => (
                <Link
                  key={index}
                  href={data.route}
                  className={" text-brand-gray200 font-light hover:text-brand-grayish"}>
                  {data.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h6 className={"font-medium text-brand-gray500"}>Navigation</h6>
            <div className='flex flex-col gap-2 items-start mt-2'>
              {footerNav2.map((data, index) => (
                <Link
                  key={index}
                  href={data.route}
                  className={"text-brand-gray200 font-light hover:text-brand-grayish"}>
                  {data.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h6 className={"font-medium text-brand-gray500"}>Socials</h6>
            <div className='flex flex-col gap-2 items-start mt-2 sm:flex-row sm:gap-4'>
              <Link href={"/"}>
                {" "}
                <Facebook />
              </Link>
              <Link href={"/"}>
                {" "}
                <X />
              </Link>
              <Link
                href={"https://www.instagram.com/usepays_co?igsh=YXNwODdlMzZiYjI4"}
                target='_blank'
                rel='noreferrer'>
                {" "}
                <Instagram />
              </Link>
              <Link href={"/"}>
                {" "}
                <Tiktok />
              </Link>
            </div>
          </div>
        </div>
        <p className='w-fit mx-auto pt-14 text-brand-gray200'>© 2024 PayS. All Rights Reserved. </p>
      </div>
    </div>
  );
};

export default Footer;
