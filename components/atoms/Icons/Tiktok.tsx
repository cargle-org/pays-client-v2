import React from "react";

const Tiktok = ({
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
    width={width || "33"}
    height={height || "32"}
    viewBox='0 0 33 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <circle cx='12.8418' cy='12' r='12' fill='#1F0047' />
    <path
      d='M16.3622 7.15816C15.8392 6.56086 15.5509 5.79393 15.551 5H13.1862V14.4898C13.1683 15.0035 12.9516 15.4901 12.5818 15.8471C12.212 16.204 11.718 16.4034 11.204 16.4031C10.1173 16.4031 9.21425 15.5153 9.21425 14.4133C9.21425 13.0969 10.4847 12.1097 11.7933 12.5153V10.0969C9.15302 9.7449 6.8418 11.7959 6.8418 14.4133C6.8418 16.9617 8.95404 18.7755 11.1964 18.7755C13.5995 18.7755 15.551 16.824 15.551 14.4133V9.59949C16.5099 10.2882 17.6612 10.6576 18.8418 10.6556V8.29082C18.8418 8.29082 17.403 8.35969 16.3622 7.15816Z'
      fill={fill || "white"}
    />
  </svg>
);

export default Tiktok;
