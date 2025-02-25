import React from "react";
import Spinner from "../spinner/Spinner";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: string;
  bgColor?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
  borderColor?: string;
  isSecondary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  fontWeight?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  className = "",
  padding = "px-6 py-4",
  bgColor = "bg-brand-main",
  color = "text-white",
  fontSize = "text-base",
  borderRadius = "rounded-xl",
  borderColor = "border-brand-main",
  isSecondary = false,
  type = "button",
  disabled = false,
  isLoading = false,
  fontWeight = "font-normal",
}) => {
  const buttonStyles = `
    ${padding}
    ${isSecondary ? "bg-white text-brand-gray200 border-brand-gray200" : `${bgColor} ${color}`}
    ${fontSize}
    ${fontWeight}
    ${borderRadius}
    ${isSecondary ? "border" : borderColor ? `border ${borderColor}` : `border ${bgColor}`}
    flex items-center justify-center gap-2
    ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    whitespace-nowrap
  `;

  return (
    <button
      type={type}
      onClick={() => {
        if (!disabled && !isLoading && onClick) {
          onClick();
        }
      }}
      disabled={disabled || isLoading}
      className={`${buttonStyles} ${className}`}>
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default CustomButton;
