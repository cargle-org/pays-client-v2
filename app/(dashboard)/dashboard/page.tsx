"use client";

import MainLayout from "@/app/(main)/layout";
import React, { useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useGeneralContext } from "@/context/GenralContext";

const Page = () => {
  // const { getAuthCookie }: any = useGeneralContext();
  const router = useRouter();
  const checkToken = async () => {
    const token = localStorage.getItem("auth_token");
    // const token = getAuthCookie("auth_token");
    // console.log("🚀 ~ checkToken ~ token:", token);

    if (!token) {
      router.push(`/auth/login`);
      return <MainLayout />;
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return <div>Dashboard</div>;
};

export default Page;
