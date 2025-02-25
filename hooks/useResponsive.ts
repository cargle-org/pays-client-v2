import device from "@/constants/breakpoints";
import { useMediaQuery } from "react-responsive";

interface ResponsiveHookReturn {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
}

const useResponsive = (): ResponsiveHookReturn => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const isTablet = useMediaQuery({ query: device.tablet });
  const isLaptop = useMediaQuery({ query: device.laptop });
  const isDesktop = useMediaQuery({ query: device.desktop });

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useResponsive;
