import React from "react";
import Image from "next/image";
import logo from "@/assets/imgs/auth/pays_logo.png";
import Link from "next/link";
import MobileNav from "@/components/MobileHeader/page";

const Header = () => {
  return (
    <div className='w-full'>
      {/* Main Nav */}
      <div className='hidden fixed bg-brand-white z-50 w-full items-center justify-between py-2 px-8 border-[0.1px] pb-4 border-b-brand-gray100 lg:flex'>
        {/* left */}
        <Link href={"/"} className='flex gap-2 items-center justify-center p-4'>
          {/* <Image src={logo} alt="logo" width={65} height={22} priority /> */}
          <svg width='87' height='31' viewBox='0 0 87 31' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15.1642 20.3831C15.1642 20.8231 15.0783 21.2363 14.9066 21.6226C14.7456 22.009 14.5203 22.347 14.2305 22.6368C13.9515 22.9158 13.6188 23.1412 13.2324 23.3129C12.8461 23.4739 12.4329 23.5544 11.9929 23.5544H3.15518V30.4765H0V6.41016H3.15518V9.30777C3.18738 8.89996 3.2947 8.52434 3.47714 8.18092C3.65958 7.82677 3.89032 7.52091 4.16935 7.26334C4.44838 6.99505 4.77033 6.78577 5.13522 6.63553C5.51084 6.48528 5.90792 6.41016 6.32646 6.41016H11.9929C12.4329 6.41016 12.8461 6.49601 13.2324 6.66772C13.6188 6.8287 13.9515 7.05407 14.2305 7.34383C14.5203 7.62286 14.7456 7.95555 14.9066 8.3419C15.0783 8.72825 15.1642 9.14143 15.1642 9.58144V20.3831ZM11.9929 20.3831V9.58144H3.15518V20.3831H11.9929Z'
              fill='#1F0047'
            />
            <path
              d='M20.4443 16.0689C20.4443 15.6289 20.5248 15.2211 20.6858 14.8454C20.8575 14.4591 21.0828 14.121 21.3619 13.8313C21.6516 13.5415 21.9897 13.3161 22.376 13.1552C22.7624 12.9835 23.1702 12.8976 23.5995 12.8976H31.7772V9.58144H21.4263V6.41016H31.7772C32.2172 6.41016 32.6304 6.49601 33.0167 6.66772C33.4031 6.8287 33.7358 7.05407 34.0148 7.34383C34.3046 7.62286 34.5299 7.95555 34.6909 8.3419C34.8626 8.72825 34.9485 9.14143 34.9485 9.58144V23.5544H31.7772V20.6568C31.745 21.0538 31.6377 21.4295 31.4552 21.7836C31.2728 22.1378 31.0367 22.449 30.7469 22.7173C30.4679 22.9749 30.1459 23.1788 29.781 23.329C29.4162 23.4793 29.0298 23.5544 28.622 23.5544H23.5995C23.1702 23.5544 22.7624 23.4739 22.376 23.3129C21.9897 23.1412 21.6516 22.9158 21.3619 22.6368C21.0828 22.347 20.8575 22.009 20.6858 21.6226C20.5248 21.2363 20.4443 20.8231 20.4443 20.3831V16.0689ZM23.5995 20.3831H31.7772V16.0689H23.5995V20.3831Z'
              fill='#1F0047'
            />
            <path
              d='M41.4037 30.4765L44.9935 22.009L38.2646 6.41016H41.5969L46.6033 18.2099L51.6098 6.41016H54.942L44.5589 30.4765H41.4037Z'
              fill='#1F0047'
            />
            <circle cx='71.7397' cy='15.2632' r='15.2632' fill='#1F0047' />
            <path
              d='M75.4511 20.2077V16.4554H68.3315C67.9148 16.4554 67.5235 16.3794 67.1576 16.2275C66.7917 16.0655 66.4715 15.8528 66.1971 15.5895C65.9329 15.316 65.7194 14.997 65.5568 14.6324C65.4044 14.2678 65.3281 13.8779 65.3281 13.4627V10.0142C65.3281 9.59898 65.4044 9.20906 65.5568 8.84446C65.7194 8.47987 65.9329 8.16591 66.1971 7.90259C66.4715 7.62914 66.7917 7.41646 67.1576 7.26455C67.5235 7.10251 67.9148 7.02148 68.3315 7.02148H77.8294V10.0142H68.3315V13.4627H75.4511C75.8678 13.4627 76.254 13.5437 76.6097 13.7057C76.9756 13.8577 77.2958 14.0703 77.5702 14.3438C77.8446 14.6071 78.0581 14.9211 78.2105 15.2857C78.3731 15.6503 78.4544 16.0402 78.4544 16.4554V20.2077C78.4544 20.6229 78.3731 21.0129 78.2105 21.3775C78.0581 21.7421 77.8446 22.0611 77.5702 22.3345C77.2958 22.5978 76.9756 22.8105 76.6097 22.9726C76.254 23.1245 75.8678 23.2004 75.4511 23.2004H65.3281V20.2077H75.4511Z'
              fill='white'
            />
          </svg>
        </Link>
        {/* middle */}
        <div className='flex items-center justify-evenly gap-10 mt-2'>
          <Link
            href={"/"}
            className='transition-fx nav-hover-fx font-light capitalize text-base text-brand-grayish font-geistsans hover:text-brand-main'>
            Home
          </Link>
          <Link
            href={"/about"}
            className='transition-fx nav-hover-fx font-light capitalize text-base text-brand-grayish font-geistsans hover:text-brand-main'>
            About
          </Link>{" "}
          <Link
            href={"/faqs"}
            className='transition-fx nav-hover-fx font-light capitalize text-base text-brand-grayish font-geistsans hover:text-brand-main'>
            FAQs
          </Link>{" "}
          <Link
            href={"/privacy"}
            className='transition-fx nav-hover-fx font-light capitalize text-base text-brand-grayish font-geistsans hover:text-brand-main'>
            Privacy
          </Link>
          <Link
            href={"/business"}
            className='transition-fx nav-hover-fx font-light capitalize text-base text-brand-grayish font-geistsans hover:text-brand-main'>
            Business on Usepays
          </Link>
        </div>
        {/* right */}
        <Link
          href={"/auth"}
          className='transition-fx rounded-3xl cursor-pointer font-medium text-base uppercase py-2 px-4 bg-brand-main flex items-center justify-center gap-4 text-brand-white hover:bg-brand-main/25 hover:text-brand-main'>
          Get Started{" "}
          <svg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M0.263225 12.2368C0.431987 12.4053 0.660751 12.5 0.899267 12.5C1.13778 12.5 1.36655 12.4053 1.53531 12.2368L10.1999 3.5722V10.4007C10.1999 10.6394 10.2947 10.8683 10.4635 11.0371C10.6323 11.2059 10.8612 11.3007 11.0999 11.3007C11.3387 11.3007 11.5676 11.2059 11.7364 11.0371C11.9052 10.8683 12 10.6394 12 10.4007V1.40006C12 1.16135 11.9052 0.932415 11.7364 0.763621C11.5676 0.594827 11.3387 0.5 11.0999 0.5H2.09935C1.86064 0.5 1.6317 0.594827 1.46291 0.763621C1.29411 0.932415 1.19929 1.16135 1.19929 1.40006C1.19929 1.63877 1.29411 1.8677 1.46291 2.0365C1.6317 2.20529 1.86064 2.30012 2.09935 2.30012H8.9278L0.263225 10.9647C0.0946735 11.1335 0 11.3622 0 11.6007C0 11.8392 0.0946735 12.068 0.263225 12.2368Z'
              fill='#3B82F6'
            />
          </svg>
        </Link>
      </div>

      {/* MOBILE MENU */}
      <div className='flex lg:hidden'>
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
