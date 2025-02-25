import React from "react";

const MinusIcon = ({
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
    width={width || "17"}
    height={height || "3"}
    viewBox='0 0 17 3'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1.11132 2.39985H15.8867C16.3689 2.39985 16.791 1.98799 16.791 1.49556C16.791 1.00356 16.3689 0.601562 15.8867 0.601562H1.11132C0.629174 0.601562 0.207031 1.00356 0.207031 1.49556C0.207031 1.98799 0.629174 2.39985 1.11132 2.39985Z'
      fill={fill || "#7B7B7B"}
    />
  </svg>
);

export default MinusIcon;
