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
  const [selectedVoucherStatus, setSelectedVoucherStatus] = useState("status");
  const [voucherPriceRange, setVoucherPriceRange] = useState({
    min: "",
    max: "",
  });
  const [voucherDateRange, setVoucherDateRange] = useState({
    from: "",
    to: "",
  });

  // TRANSACTIONS
  const [allUserTransactions, setAllUserTransactions] = useState();
  const [allBanks, setAllBanks] = useState() as any;
  const [createTransactionLoading, setCreateTransactionLoading] =
    useState(false);
  const [fetchTransactionsLoading, setFetchTransactionsLoading] =
    useState(false);
  const [selectedTransactionStatus, setSelectedTransactionStatus] =
    useState("status");
  const [transactionPriceRange, setTransactionPriceRange] = useState({
    min: "",
    max: "",
  });
  const [transactionDateRange, setTransactionDateRange] = useState({
    from: "",
    to: "",
  });
  const [transactionDetails, setTransactionDetails] = useState({
    tx_ref: "",
    transaction_id: "",
    status: "",
    paymentReference: "",
  });

  // PAYMENT LINKS
  const [paymentLInksByUser, setPaymentLinksByUser] = useState();
  const [paymentLInkId, setPaymentLinkId] = useState();
  const [onePaymentLInk, setOnePaymentLink] = useState();
  const [fetchPaymentLinksLoading, setFetchPaymentLinksLoading] =
    useState(false);
  const [createPaymentLinkLoading, setCreatePaymentLinkLoading] =
    useState(false);
  const [paymentLinkCategories, setPaymentLinkCategories] = useState();
  const [selectedPaymentLinkStatus, setSelectedPaymentLinkStatus] =
    useState("status");
  const [paymentLinkPriceRange, setPaymentLinkPriceRange] = useState({
    min: "",
    max: "",
  });
  const [paymentLinkDateRange, setPaymentLinkDateRange] = useState({
    from: "",
    to: "",
  });
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
        // Remove existing userId and auth_token from localStorage if they exist
        localStorage.removeItem("userId");
        localStorage.removeItem("auth_token");
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
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
    }
  };

  // VOUCHER
  const getAllVouchersByUser = async () => {
    try {
      // console.log("🚀 ~ getAllVouchersByUser ~ userId:", userId, token);
      setFetchVouchersLoading(true);
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/user/vouchers/all?userId=${userId}&${
          selectedVoucherStatus !== "status" &&
          `status=${selectedVoucherStatus}`
        }&${
          voucherPriceRange.min !== "" && `minAmount=${voucherPriceRange.min}`
        }&${
          voucherPriceRange.max !== "" && `maxAmount=${voucherPriceRange.max}`
        }&${
          voucherDateRange.from !== "" && `fromDate=${voucherDateRange.from}`
        }&${voucherDateRange.to !== "" && `toDate=${voucherDateRange.to}`}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      // console.log("🚀 ~ getAllVouchersByUser ~ response:", response);
      setFetchVouchersLoading(false);
      if (response.status === 200) {
        setAllUserVouchers(response.data.data.vouchers);
      }
    } catch (err: any) {
      setFetchVouchersLoading(false);
      console.log("🚀 ~ getAllVouchersByUser ~ err:", err);
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
    }
  };

  const getVoucherById = async () => {
    try {
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
        // return response;
      }
    } catch (err: any) {
      console.log("🚀 ~ getVoucherById ~ err:", err);
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
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
        setOneVoucher(response?.data?.data?.voucher);
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
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
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

  // Transcation
  const getAllTransactionsByUser = async () => {
    try {
      setFetchTransactionsLoading(true);
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/utils/transactions/all?userId=${userId}&${
          selectedTransactionStatus !== "status" &&
          `status=${selectedTransactionStatus}`
        }&${
          transactionPriceRange.min !== "" &&
          `minAmount=${transactionPriceRange.min}`
        }&${
          transactionPriceRange.max !== "" &&
          `maxAmount=${transactionPriceRange.max}`
        }&${
          transactionDateRange.from !== "" &&
          `fromDate=${transactionDateRange.from}`
        }&${
          transactionDateRange.to !== "" && `toDate=${transactionDateRange.to}`
        }`,
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
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
      if (err?.response?.data?.message === "No transactions found") {
        // error("No transactions found!");
        setAllUserTransactions(err?.response?.data?.data);
      }
    }
  };

  const handleFundWallet = async (amount: any) => {
    setCreateTransactionLoading(true);
    // console.log("🚀 ~ handleFundWal ~ amount:", amount);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/wallet/fund`,
        {
          amount: amount,
          portal: process.env.NEXT_PUBLIC_PAYMENT_PORTAL || "flutterwave",
        },
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/wallet/verifyTrx?tx_ref=${transactionDetails?.tx_ref}&transaction_id=${transactionDetails?.transaction_id}&status=${transactionDetails?.status}&paymentReference=${transactionDetails?.paymentReference}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("auth_token"),
          },
        }
      );
      // console.log("🚀 ~ verifyFundWal ~ response:", response);
      setFetchTransactionsLoading(false);
      if (response.status === 200) {
        getAllTransactionsByUser();
        getOneUser();
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/user/links?${
          selectedPaymentLinkStatus !== "status" &&
          `status=${selectedPaymentLinkStatus}`
        }&${
          paymentLinkPriceRange.min !== "" &&
          `minAmount=${paymentLinkPriceRange.min}`
        }&${
          paymentLinkPriceRange.max !== "" &&
          `maxAmount=${paymentLinkPriceRange.max}`
        }&${
          paymentLinkDateRange.from !== "" &&
          `fromDate=${paymentLinkDateRange.from}`
        }&${
          paymentLinkDateRange.to !== "" && `toDate=${paymentLinkDateRange.to}`
        }`,
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
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
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
      // error(
      //   err.response?.data?.message
      //     ? err?.response?.data?.message
      //     : err.response?.data?.error
      // );
    }
  };

  const getOnePaymentLink = async () => {
    try {
      setFetchPaymentLinksLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/links/one?id=${paymentLInkId}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log("🚀 ~ getOnePaymentLink ~ response:", response);
      setFetchPaymentLinksLoading(false);
      if (response.status === 200) {
        // setOnePaymentLink(response.data.categories);
      }
    } catch (err: any) {
      console.log("🚀 ~ getOnePaymentLink ~ err:", err);
      setFetchPaymentLinksLoading(false);
      error(
        err.response?.data?.message
          ? err?.response?.data?.message
          : err.response?.data?.error
      );
    }
  };

  const deleteOnePaymentLink = async (id: any) => {
    try {
      setFetchPaymentLinksLoading(true);
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/utils/links/delete?id=${id}`,
        {
          headers: {
            "content-type": "application/json",
            "x-access-token": token,
          },
        }
      );
      console.log("🚀 ~ deleteOnePaymentLink ~ response:", response);
      setFetchPaymentLinksLoading(false);
      if (response.status === 200) {
        getAllPaymentLinksByUser();
        // setOnePaymentLink(response.data.categories);
      }
    } catch (err: any) {
      console.log("🚀 ~ deleteOnePaymentLink ~ err:", err);
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
      // console.log("🚀 ~ useEffect ~ userId:", userId);
      getOneUser();
      getAllVouchersByUser();
      getAllTransactionsByUser();
      getAllPaymentLinksByUser();
      getAllPaymentLinkCategories();
    }
  }, [userId]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ oneVoucherStatus:", oneVoucherStatus);
    if (oneVoucherId) getVoucherById();
  }, [oneVoucherId]);

  useEffect(() => {
    if (paymentLInkId) getOnePaymentLink();
  }, [paymentLInkId]);

  // ************************* //
  // ************************* //
  // ************* FILTER STUFF ************ //
  // ************************* //
  // ************************* //

  // ****************** //
  // Transaction STUFF
  // ****************** //
  useEffect(() => {
    if (userId) {
      console.log("🚀 ~ useEffect ~ transactionDetails:", transactionDetails);
      // if (transactionDetails?.tx_ref && transactionDetails?.status) {
      if (transactionDetails?.tx_ref && transactionDetails?.transaction_id) {
        verifyFundWallet();
      }
      if (transactionDetails?.paymentReference) {
        verifyFundWallet();
      }
    }
  }, [transactionDetails]);

  useEffect(() => {
    if (userId) {
      if (selectedTransactionStatus !== "Status") getAllTransactionsByUser();
    }
  }, [selectedTransactionStatus]);

  // prices
  useEffect(() => {
    if (userId) {
      if (transactionPriceRange.min !== "" && transactionPriceRange.max !== "")
        getAllTransactionsByUser();
      if (transactionPriceRange.min === "" && transactionPriceRange.max == "")
        getAllTransactionsByUser();
    }
  }, [transactionPriceRange]);

  // dates
  useEffect(() => {
    if (userId) {
      if (transactionDateRange.from !== "" && transactionDateRange.to !== "")
        getAllTransactionsByUser();
      if (transactionDateRange.from === "" && transactionDateRange.to == "")
        getAllTransactionsByUser();
    }
  }, [transactionDateRange]);

  // ****************** //
  // VOUCHER STUFF..
  // ****************** //

  useEffect(() => {
    if (userId) {
      if (selectedVoucherStatus !== "status") getAllVouchersByUser();
    }
  }, [selectedVoucherStatus]);

  // prices
  useEffect(() => {
    if (userId) {
      if (voucherPriceRange.min !== "" && voucherPriceRange.max !== "")
        getAllVouchersByUser();
      if (voucherPriceRange.min === "" && voucherPriceRange.max == "")
        getAllVouchersByUser();
    }
  }, [voucherPriceRange]);

  // dates
  useEffect(() => {
    if (userId) {
      if (voucherDateRange.from !== "" && voucherDateRange.to !== "")
        getAllVouchersByUser();
      if (voucherDateRange.from === "" && voucherDateRange.to == "")
        getAllVouchersByUser();
    }
  }, [voucherDateRange]);

  // ****************** //
  // PAYMENT STUFF
  // ****************** //
  useEffect(() => {
    if (userId) {
      if (selectedPaymentLinkStatus !== "status") getAllPaymentLinksByUser();
    }
  }, [selectedPaymentLinkStatus]);

  // prices
  useEffect(() => {
    if (userId) {
      if (paymentLinkPriceRange.min !== "" && paymentLinkPriceRange.max !== "")
        getAllPaymentLinksByUser();
      if (paymentLinkPriceRange.min === "" && paymentLinkPriceRange.max == "")
        getAllPaymentLinksByUser();
    }
  }, [paymentLinkPriceRange]);

  // dates
  useEffect(() => {
    if (userId) {
      if (paymentLinkDateRange.from !== "" && paymentLinkDateRange.to !== "")
        getAllPaymentLinksByUser();
      if (paymentLinkDateRange.from === "" && paymentLinkDateRange.to == "")
        getAllPaymentLinksByUser();
    }
  }, [paymentLinkDateRange]);

  return (
    <GeneralContext.Provider
      value={{
        // Misc
        name,
        user,
        token,
        allBanks,
        setAllBanks,
        homepageStats,
        airtimeBillers,
        setName,
        setUser,
        getOneUser,
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
        voucherDateRange,
        voucherPriceRange,
        voucherSpecialKey,
        fetchVouchersLoading,
        createVoucherLoading,
        selectedVoucherStatus,
        cashoutVoucherLoading,
        setOneVoucher,
        setRecipients,
        getVoucherById,
        setOneVoucherId,
        getVoucherByKey,
        setVoucherDateRange,
        setOneVoucherStatus,
        setVoucherPriceRange,
        setVoucherSpecialKey,
        getAllVouchersByUser,
        updateVoucherRecipients,
        setCreateVoucherLoading,
        setFetchVouchersLoading,
        setSelectedVoucherStatus,
        setCashoutVoucherLoading,
        handleRedeemVoucherAsCash,
        handleRedeemVoucherAsAirtime,

        // Transactions
        transactionDetails,
        allUserTransactions,
        transactionDateRange,
        transactionPriceRange,
        // newWithdrawTransaction,
        createTransactionLoading,
        fetchTransactionsLoading,
        selectedTransactionStatus,
        verifyFundWallet,
        handleFundWallet,
        setTransactionDetails,
        setAllUserTransactions,
        setTransactionDateRange,
        handleWithdrawFromWallet,
        setTransactionPriceRange,
        // setNewWithdrawTransaction,
        setCreateTransactionLoading,
        setFetchTransactionsLoading,
        setSelectedTransactionStatus,

        // Payment Links
        paymentLInkId,
        onePaymentLInk,
        payToLinkDetails,
        paymentLInksByUser,
        paymentLinkDateRange,
        paymentLinkCategories,
        paymentLinkPriceRange,
        createPaymentLinkLoading,
        fetchPaymentLinksLoading,
        selectedPaymentLinkStatus,
        handlePayToLink,
        setPaymentLinkId,
        setOnePaymentLink,
        setPayToLinkDetails,
        deleteOnePaymentLink,
        setPaymentLinksByUser,
        setPaymentLinkDateRange,
        handleCreatePaymentLink,
        setPaymentLinkPriceRange,
        setPaymentLinkCategories,
        getAllPaymentLinksByUser,
        setCreatePaymentLinkLoading,
        setFetchPaymentLinksLoading,
        setSelectedPaymentLinkStatus,
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
