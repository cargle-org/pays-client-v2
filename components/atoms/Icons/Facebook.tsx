import React from "react";

const Facebook = ({
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
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M11.3925 20V12.4994H9.8418V9.91457H11.3925V8.36264C11.3925 6.25393 12.2682 5 14.756 5H16.8271V7.58514H15.5325C14.5641 7.58514 14.5 7.94637 14.5 8.62054L14.4965 9.91428H16.8418L16.5674 12.4991H14.4965V20H11.3925Z'
      fill={fill || "white"}
    />
  </svg>
);

export default Facebook;
