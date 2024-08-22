"use client";

import MainLayout from "@/app/(main)/layout";
import DashboardLayout from "@/app/(dashboard)/dashboard/layout";
import { useRouter } from "next/navigation";
import axios from "axios";
import { success, error } from "@/helpers/Alert";
import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";

export const GeneralContext = createContext({});

const GeneralProvider = (props: any) => {
  const router = useRouter();
  // MISC
  const [name, setName] = useState<String>("EDDY");
  const [token, setToken] = useState() as any;

  // USER
  const [userId, setUserId] = useState() as any;
  const [user, setUser] = useState();

  // AUTH
  const [authToken, setAuthToken] = useState<String>("") as any;
  const [authLoading, setAuthLoading] = useState(false);
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isCompany: "",
  });
  const [verifyEmailDetails, setVerifyEmailDetails] = useState({
    id: "",
    emailToken: "",
    verified: false,
  });
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [resetPasswordDetails, setResetPasswordDetails] = useState({
    id: "",
    resetToken: "",
    newPassword: "",
    confirmPassword: "",
  });

  // VOUCHERS
  const [allUserVouchers, setAllUserVouchers] = useState();
  const [oneVoucherId, setOneVoucherId] = useState();
  const [oneVoucher, setOneVoucher] = useState();
  const [oneVoucherStatus, setOneVoucherStatus] = useState("");
  const [createVoucherLoading, setCreateVoucherLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [voucherSpecialKey, setVoucherSpecialKey] = useState();

  //*******/
  //************/
  // FUNCTIONS
  //************/
  //*******/
  // const checkToken = async () => {
  //   const token = localStorage.getItem("auth_token");
  //   // const token = getAuthCookie("auth_token");
  //   console.log("🚀 ~ checkToken ~ token:", token);

  //   if (!token) {
  //     router.push(`/`);
  //     return <MainLayout />;
  //   }
  //   router.push(`/dashboard`);
  //   return <DashboardLayout />;
  // };

  // AUTH
  // const setAuthCookie = (token: string, name: string) => {
  //   const toBase64 = Buffer.from(token).toString("base64");

  //   setCookie(name, toBase64, {
  //     maxAge: 60 * 60,
  //     path: "/",
  //     // more security options here
  //     // sameSite: 'strict',
  //     // httpOnly: true,
  //     // secure: process.env.NODE_ENV === 'production',
  //   });
  // };

  // const getAuthCookie = (name: string) => {
  //   const cookie = getCookie(name);

  //   if (!cookie) return undefined;

  //   return Buffer.from(cookie, "base64").toString("ascii");
  // };

  const handleSignup = async (e: any) => {
    setAuthLoading(true);
    console.log("signupDetails", signupDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        signupDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      console.log("🚀 ~ handleSignup ~ response:", response);
      setAuthLoading(false);
      if (response.status === 200) {
        success("Signup Successful");
        success("Please go to your email to continue the process.");
        router.push(`/auth/verify`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleSignup ~ err:", err);
      setAuthLoading(false);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
      // error(err.response?.data?.message);
      // error(err.message);
    }
  };

  const handleLogin = async (e: any) => {
    setAuthLoading(true);
    console.log("loginDetails", loginDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        loginDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      console.log("🚀 ~ handleLogin ~ response:", response);
      const token = response.data.data.token;
      const userId = response.data.data.user?._id;
      setAuthLoading(false);
      if (response.status === 200) {
        success("Login Successful");
        // setAuthCookie(token, "auth_token");
        // setAuthCookie(userId, "user_id");
        localStorage.setItem("auth_token", token);
        localStorage.setItem("userId", userId);
        setUser(response.data.data.user);
        router.push(`/dashboard`);
      }
    } catch (err: any) {
      setAuthLoading(false);
      console.log("🚀 ~ handleLogin ~ err:", err);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
      // error(err.response?.data?.message);
      // error(err.message);
    }
  };

  const handleVerifyEmail = async () => {
    setAuthLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?id=${verifyEmailDetails.id}&emailToken=${verifyEmailDetails.emailToken}`,
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleVerifyEmail ~ response:", response);
      setAuthLoading(false);
      if (response.status === 200) {
        success("Email Verified Successfully");
        setVerifyEmailDetails((item: any) => ({
          ...item,
          verified: true,
        }));
      }
    } catch (err: any) {
      console.log("🚀 ~ handleVerifyEmail ~ err:", err);
      setAuthLoading(false);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
      // error(err.response.data.message);
      // error(err.message);
    }
  };

  const handleForgotPassword = async (email: any) => {
    setAuthLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
        { email },
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleForgotPassword ~ response:", response);
      setAuthLoading(false);
      if (response.status === 200) {
        success("Reset Email Sent Successfully");
        success("Please check email to continue.");
        router.push(`/auth/reset`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleForgotPassword ~ err:", err);
      setAuthLoading(false);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
      // error(err.response.data.message);
      // error(err.message);
    }
  };

  const handleResetPassword = async (e: any) => {
    setAuthLoading(true);
    console.log("resetPasswordDetails", resetPasswordDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?id=${resetPasswordDetails.id}&resetToken=${resetPasswordDetails.resetToken}`,
        resetPasswordDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleResetPassword ~ response:", response);
      setAuthLoading(false);
      if (response.status === 200) {
        success("Password reset successfully.");
        success("Please login to continue.");
        router.push(`/auth/login`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleResetPassword ~ err:", err);
      setAuthLoading(false);
      error(
        err.response.data.message
          ? err.response.data.message
          : err.response.data.error
      );
      // error(err.message);
    }
  };

  // USER
  const getOneUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/one?userId=${userId}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log("🚀 ~ getOneUser ~ response:", response);
      if (response.status === 200) {
        setUser(response.data.data.user);
      }
    } catch (err: any) {
      console.log("🚀 ~ getOneUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err.response.data.message
          : err.response?.data?.error
      );
    }
  };

  // VOUCHER
  const getAllVouchersByUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/vouchers/all?userId=${userId}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log("🚀 ~ getAllVouchersByUser ~ response:", response);
      if (response.status === 200) {
        setAllUserVouchers(response.data.data.vouchers);
      }
    } catch (err: any) {
      console.log("🚀 ~ getAllVouchersByUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err.response.data.message
          : err.response?.data?.error
      );
    }
  };

  const getVoucherById = async () => {
    try {
      console.log("🚀 ~ getVoucherById ~ oneVoucherId:", oneVoucherId);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/vouchers/one?status=${oneVoucherStatus}&voucherId=${oneVoucherId}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log("🚀 ~ getVoucherById ~ response:", response);
      if (response.status === 200) {
        setOneVoucher(response.data.data.voucher);
      }
    } catch (err: any) {
      console.log("🚀 ~ getVoucherById ~ err:", err);
      error(
        err.response?.data?.message
          ? err.response.data.message
          : err.response?.data?.error
      );
    }
  };

  const updateVoucherRecipients = async () => {
    try {
      setCreateVoucherLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/update?specialKey=${voucherSpecialKey}`,
        { recipients: recipients },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ updateVoucherRecipients ~ response:", response);
      setCreateVoucherLoading(false);
      if (response.status === 200) {
        setOneVoucher(response.data.data.voucher);
        success("Voucher updated successfully.");
        router.push(`/dashboard/vouchers/${response.data.data.voucher._id}`);
      }
    } catch (err: any) {
      setCreateVoucherLoading(false);
      console.log("🚀 ~ updateVoucherRecipients ~ err:", err);
      error(
        err.response?.data?.message
          ? err.response.data.message
          : err.response?.data?.error
      );
    }
  };

  useEffect(() => {
    console.log("__3d1k4N.init");
    const cachedUserId = localStorage.getItem("userId");
    const cachedToken = localStorage.getItem("auth_token");
    if (cachedUserId) setUserId(cachedUserId);
    if (cachedToken) setToken(cachedToken);
  }, []);

  useEffect(() => {
    if (userId) {
      getOneUser();
      getAllVouchersByUser();
    }
  }, [userId]);

  useEffect(() => {
    if (oneVoucherId) getVoucherById();
  }, [oneVoucherId]);

  return (
    <GeneralContext.Provider
      value={{
        // Misc
        name,
        user,
        token,
        setName,
        setUser,

        // Auth
        authLoading,
        loginDetails,
        signupDetails,
        verifyEmailDetails,
        resetPasswordDetails,
        handleLogin,
        handleSignup,
        setAuthLoading,
        setLoginDetails,
        setSignupDetails,
        handleVerifyEmail,
        handleResetPassword,
        handleForgotPassword,
        setVerifyEmailDetails,
        setResetPasswordDetails,

        // Vouchers
        oneVoucher,
        recipients,
        oneVoucherId,
        allUserVouchers,
        oneVoucherStatus,
        voucherSpecialKey,
        createVoucherLoading,
        setOneVoucher,
        setRecipients,
        setOneVoucherId,
        setOneVoucherStatus,
        setVoucherSpecialKey,
        updateVoucherRecipients,
        setCreateVoucherLoading,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  return context;
};

export default GeneralProvider;
