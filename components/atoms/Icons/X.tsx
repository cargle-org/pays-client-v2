import React from "react";

const X = ({
  width,
  height,
  className,
  fill,
}: {
  width?: string | number;
  height?: string | number;
  className?: string;
  fill?: string;
}) => (
  <svg
    className={className}
    width={width || "25"}
    height={height || "24"}
    viewBox='0 0 25 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12.8418' cy='12' r='12' fill='#1F0047' />
    <g clipPath='url(#clip0_3838_2402)'>
      <path
        d='M6.9178 6H10.4518L13.5968 10.498L17.3718 6H18.5008L14.0268 11.114L18.8418 18H15.3098L12.0248 13.303L7.9698 18H6.8418L11.5948 12.688L6.9178 6Z'
        fill={fill || "white"}
      />
    </g>
    <defs>
      <clipPath id='clip0_3838_2402'>
        <rect width='12' height='12' fill={fill || "white"} transform='translate(6.8418 6)' />
      </clipPath>
    </defs>
  </svg>
);

export default X;
