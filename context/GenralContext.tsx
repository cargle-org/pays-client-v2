"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { success, error, info } from "@/helpers/Alert";
import { createContext, useContext, useEffect, useState } from "react";

export const GeneralContext = createContext({});

const GeneralProvider = (props: any) => {
  const router = useRouter();
  // MISC
  const [name, setName] = useState<String>("EDDY");
  const [token, setToken] = useState() as any;
  const [airtimeBillers, setAirtimeBillers] = useState();
  const [homepageStats, setHomepageStats] = useState();

  // USER
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();

  // AUTH
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
  const [cashoutVoucherLoading, setCashoutVoucherLoading] = useState(false);
  const [fetchVouchersLoading, setFetchVouchersLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [voucherSpecialKey, setVoucherSpecialKey] = useState();

  // TRANSACTIONS
  const [allUserTransactions, setAllUserTransactions] = useState();
  const [allBanks, setAllBanks] = useState() as any;
  const [createTransactionLoading, setCreateTransactionLoading] =
    useState(false);
  const [fetchTransactionsLoading, setFetchTransactionsLoading] =
    useState(false);
  const [transactionDetails, setTransactionDetails] = useState({
    tx_ref: "",
    transaction_id: "",
  });

  // PAYMENT LINKS
  const [paymentLInksByUser, setPaymentLinksByUser] = useState();
  const [fetchPaymentLinksLoading, setFetchPaymentLinksLoading] =
    useState(false);
  const [createPaymentLinkLoading, setCreatePaymentLinkLoading] =
    useState(false);
  const [paymentLinkCategories, setPaymentLinkCategories] = useState();
  const [payToLinkDetails, setPayToLinkDetails] = useState({
    email: "",
    // amount: "",
    link: "",
    name: "",
  });

  //*******/
  //************/
  // FUNCTIONS
  //************/
  //*******/

  // MISC
  const getAllBanks = async () => {
    try {
      // setFetchVouchersLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/banks/all`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log("🚀 ~ getAllBanks ~ response:", response);
      // setFetchVouchersLoading(false);
      if (response.status === 200) {
        setAllBanks(response.data.data.banks);
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAllBanks ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const getAirtimeBillers = async () => {
    try {
      // setFetchVouchersLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/airtime-billers`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log("🚀 ~ getAirtimeBillers ~ response:", response);
      // setFetchVouchersLoading(false);
      if (response.status === 200) {
        setAirtimeBillers(response.data.data.billers);
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAirtimeBillers ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const getAirtimeBillerInfo = async (biller_code: any) => {
    // console.log("🚀 ~ getAirtimeBillerInfo ~ biller_code:", biller_code);
    try {
      // setFetchVouchersLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/bill-information?biller_code=${biller_code}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log("🚀 ~ getAirtimeBillerInfo ~ response:", response);
      // setFetchVouchersLoading(false);
      if (response.status === 200) {
        return response.data.data.bill?.[0]?.item_code;
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAirtimeBillerInfo ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const getHomepageStats = async () => {
    try {
      // setFetchVouchersLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/homepage-stats`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      // console.log("🚀 ~ getHomepageStats ~ response:", response);
      // setFetchVouchersLoading(false);
      if (response.status === 200) {
        setHomepageStats(response.data.data);
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAllBanks ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  // AUTH
  const handleSignup = async (e: any) => {
    setAuthLoading(true);
    // console.log("signupDetails", signupDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        signupDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleSignup ~ response:", response);
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
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
      // error(err.response?.data?.message);
      // error(err.message);
    }
  };

  const handleLogin = async (e: any) => {
    setAuthLoading(true);
    // console.log("loginDetails", loginDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        loginDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      // console.log("🚀 ~ handleLogin ~ response:", response);
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
        // window.location.reload();
      }
    } catch (err: any) {
      setAuthLoading(false);
      console.log("🚀 ~ handleLogin ~ err:", err);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
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
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
      // error(err?.response?.data?.message);
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
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
      // error(err?.response?.data?.message);
      // error(err.message);
    }
  };

  const handleResetPassword = async (e: any) => {
    setAuthLoading(true);
    // console.log("resetPasswordDetails", resetPasswordDetails);
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
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
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
      // console.log("🚀 ~ getOneUser ~ response:", response);
      if (response.status === 200) {
        setUser(response.data.data.user);
      }
    } catch (err: any) {
      console.log("🚀 ~ getOneUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  // VOUCHER
  const getAllVouchersByUser = async () => {
    try {
      console.log("🚀 ~ getAllVouchersByUser ~ userId:", userId, token);
      setFetchVouchersLoading(true);
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
      setFetchVouchersLoading(false);
      if (response.status === 200) {
        setAllUserVouchers(response.data.data.vouchers);
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAllVouchersByUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
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
      // console.log("🚀 ~ getVoucherById ~ response:", response);
      if (response.status === 200) {
        setOneVoucher(response.data.data.voucher);
        return response;
      }
    } catch (err: any) {
      console.log("🚀 ~ getVoucherById ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const getVoucherByKey = async (payload: any) => {
    try {
      setFetchVouchersLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/one`,
        { voucherCode: payload },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      setFetchVouchersLoading(false);
      // console.log("🚀 ~ getVoucherByKey ~ response:", response);
      if (response.status === 200) {
        router.push(
          `/cashout/${response?.data?.data?.voucher?.coupon?.couponCode}`
        );
      }
    } catch (err: any) {
      console.log("🚀 ~ getVoucherByKey ~ err:", err);
      setFetchVouchersLoading(false);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
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
        getAllVouchersByUser();
        router.push(`/dashboard/vouchers/${response.data.data.voucher._id}`);
      }
    } catch (err: any) {
      setCreateVoucherLoading(false);
      console.log("🚀 ~ updateVoucherRecipients ~ err: ", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const handleRedeemVoucherAsCash = async (payload: any) => {
    // console.log("🚀 ~ handleWithdrawFromWal ~ payload:", payload);
    setCashoutVoucherLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/claim`,
        { ...payload },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ handleRedeemVoucherAsCash ~ response:", response);
      setCashoutVoucherLoading(false);
      if (response.status === 200) {
        success("Cashed Out Voucher Successfully");
        router.push(`/cashout`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleRedeemVoucherAsCash ~ err:", err);
      setCashoutVoucherLoading(false);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  const handleRedeemVoucherAsAirtime = async (payload: any) => {
    // console.log("🚀 ~ handleRedeemVoucherAsAirtime ~ payload:", payload);
    setCashoutVoucherLoading(true);
    try {
      const itemCode = await getAirtimeBillerInfo(payload.biller_code);
      console.log("🚀 ~ handleRedeemVoucherAsAirtime ~ itemCode:", itemCode);
      if (!itemCode) {
        error("Couldn't fetch item code, please try again.");
        return;
      }
      const newPayload = {
        ...payload,
        item_code: itemCode,
      };
      // console.log(
      //   "🚀 ~ handleRedeemVoucherAsAirtime ~ newPayload:",
      //   newPayload
      // );

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/voucher/claim-as-airtime`,
        { ...newPayload },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ handleRedeemVoucherAsAirtime ~ response:", response);
      setCashoutVoucherLoading(false);
      if (response.status === 200) {
        success("Cashed Out Voucher Successfully");
        router.push(`/cashout`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleRedeemVoucherAsAirtime ~ err:", err);
      setCashoutVoucherLoading(false);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  // TRANSACTION
  const getAllTransactionsByUser = async () => {
    try {
      setFetchTransactionsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/transactions/all?userId=${userId}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ getAllTransactionsByUser ~ response:", response);
      setFetchTransactionsLoading(false);
      if (response.status === 200) {
        setAllUserTransactions(response.data.data);
      }
    } catch (err: any) {
      setFetchTransactionsLoading(false);
      console.log("🚀 ~ getAllTransactionsByUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const handleFundWallet = async (amount: any) => {
    setCreateTransactionLoading(true);
    // console.log("🚀 ~ handleFundWal ~ amount:", amount);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/wallet/fund`,
        { amount: amount },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ handleFundWal ~ response:", response);
      setCreateTransactionLoading(false);
      if (response.status === 200) {
        info("Funding wallet...");
        const newWindow = window.open(
          response.data.data.response,
          "_blank",
          "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
        getAllTransactionsByUser();
        router.push(`/dashboard/transactions`);
      }
    } catch (err: any) {
      setCreateTransactionLoading(false);
      console.log("🚀 ~ handleFundWal ~ err:", err);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  const verifyFundWallet = async () => {
    console.log(
      "🚀 ~ verifyFundWal ~ transactionDetails: ",
      transactionDetails
    );
    try {
      setFetchTransactionsLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/wallet/verifyTrx?tx_ref=${transactionDetails?.tx_ref}&transaction_id=${transactionDetails?.transaction_id}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("auth_token"),
          },
        }
      );
      console.log("🚀 ~ verifyFundWal ~ response:", response);
      setFetchTransactionsLoading(false);
      if (response.status === 200) {
        getAllTransactionsByUser();
      }
    } catch (err: any) {
      console.log("🚀 ~ verifyFundWal ~ err:", err);
      setFetchTransactionsLoading(false);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const handleWithdrawFromWallet = async (payload: any) => {
    // console.log("🚀 ~ handleWithdrawFromWal ~ payload:", payload);
    setCreateTransactionLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/wallet/withdraw`,
        { ...payload },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ handleWithdrawFromWallet ~ response:", response);
      setCreateTransactionLoading(false);
      if (response.status === 200) {
        info("Withdrawing from wallet...");
        // const newWindow = window.open(
        //   response.data.data.response,
        //   "_blank",
        //   "noopener,noreferrer"
        // );
        // if (newWindow) newWindow.opener = null;
        getAllTransactionsByUser();
        router.push(`/dashboard/transactions`);
      }
    } catch (err: any) {
      setCreateTransactionLoading(false);
      console.log("🚀 ~ handleWithdrawFromWallet ~ err:", err);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  // PAYMENT LINKS
  const getAllPaymentLinksByUser = async () => {
    try {
      setFetchPaymentLinksLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/user/links`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ getAllPaymentLinksByUser ~ response:", response);
      setFetchPaymentLinksLoading(false);
      if (response.status === 200) {
        setPaymentLinksByUser(response.data.links);
      }
    } catch (err: any) {
      setFetchPaymentLinksLoading(false);
      console.log("🚀 ~ getAllPaymentLinksByUser ~ err:", err);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const getAllPaymentLinkCategories = async () => {
    try {
      setFetchPaymentLinksLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/links/categories`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ getAllPaymentLinkCategories ~ response:", response);
      setFetchPaymentLinksLoading(false);
      if (response.status === 200) {
        setPaymentLinkCategories(response.data.categories);
      }
    } catch (err: any) {
      console.log("🚀 ~ getAllPaymentLinkCategories ~ err:", err);
      setFetchPaymentLinksLoading(false);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const handleCreatePaymentLink = async (payload: any) => {
    // console.log("🚀 ~ handleCreatePaymentLink ~ payload:", payload);
    setCreatePaymentLinkLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/links/create`,
        { ...payload },
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ handleCreatePaymentLink ~ response:", response);
      setCreatePaymentLinkLoading(false);
      if (response.status === 201) {
        success("Created Payment Link Successfully");
        getAllPaymentLinksByUser();
        router.push(`/dashboard/payments`);
      }
    } catch (err: any) {
      console.log("🚀 ~ handleCreatePaymentLink ~ err:", err);
      setCreatePaymentLinkLoading(false);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  const handlePayToLink = async (e: any) => {
    setCreatePaymentLinkLoading(true);
    console.log("payToLinkDetails", payToLinkDetails);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/links/pay`,
        payToLinkDetails,
        {
          headers: { "content-type": "application/json" },
        }
      );
      console.log("🚀 ~ handlePayToLink ~ response:", response);
      setCreatePaymentLinkLoading(false);
      if (response.status === 200) {
        info("Funding wallet...");
        const newWindow = window.open(
          response.data.data,
          "_blank",
          "noopener,noreferrer"
        );
        if (newWindow) newWindow.opener = null;
        router.push(`/`);
      }
    } catch (err: any) {
      setCreatePaymentLinkLoading(false);
      console.log("🚀 ~ handlePayToLink ~ err:", err);
      error(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : err?.response?.data?.error || err?.message
      );
    }
  };

  useEffect(() => {
    console.log("__3d1k4N.init");
    const cachedUserId = localStorage.getItem("userId");
    const cachedToken = localStorage.getItem("auth_token");
    if (cachedUserId) setUserId(cachedUserId);
    if (cachedToken) setToken(cachedToken);
    getAllBanks();
    getHomepageStats();
    getAirtimeBillers();
  }, []);

  useEffect(() => {
    if (userId) {
      getOneUser();
      getAllVouchersByUser();
      getAllTransactionsByUser();
      getAllPaymentLinksByUser();
      getAllPaymentLinkCategories();
    }
  }, [userId]);

  useEffect(() => {
    if (oneVoucherId) getVoucherById();
  }, [oneVoucherId]);

  useEffect(() => {
    if (transactionDetails?.tx_ref && transactionDetails?.transaction_id)
      verifyFundWallet();
  }, [transactionDetails]);

  return (
    <GeneralContext.Provider
      value={{
        // Misc
        name,
        user,
        token,
        allBanks,
        homepageStats,
        airtimeBillers,
        setName,
        setUser,
        setAllBanks,
        setHomepageStats,
        setAirtimeBillers,
        getAirtimeBillerInfo,

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
        fetchVouchersLoading,
        cashoutVoucherLoading,
        setOneVoucher,
        setRecipients,
        getVoucherById,
        setOneVoucherId,
        getVoucherByKey,
        setOneVoucherStatus,
        setVoucherSpecialKey,
        updateVoucherRecipients,
        setCreateVoucherLoading,
        setFetchVouchersLoading,
        setCashoutVoucherLoading,
        handleRedeemVoucherAsCash,
        handleRedeemVoucherAsAirtime,

        // Transactions
        transactionDetails,
        allUserTransactions,
        // newWithdrawTransaction,
        createTransactionLoading,
        fetchTransactionsLoading,
        verifyFundWallet,
        handleFundWallet,
        setTransactionDetails,
        setAllUserTransactions,
        handleWithdrawFromWallet,
        // setNewWithdrawTransaction,
        setCreateTransactionLoading,
        setFetchTransactionsLoading,

        // Payment Links
        payToLinkDetails,
        paymentLInksByUser,
        paymentLinkCategories,
        createPaymentLinkLoading,
        fetchPaymentLinksLoading,
        handlePayToLink,
        setPayToLinkDetails,
        setPaymentLinksByUser,
        handleCreatePaymentLink,
        setPaymentLinkCategories,
        setCreatePaymentLinkLoading,
        setFetchPaymentLinksLoading,
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
