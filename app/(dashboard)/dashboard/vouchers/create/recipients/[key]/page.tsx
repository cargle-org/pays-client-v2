"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "@/assets/imgs/auth/pays_logo.png";
import login1 from "@/assets/imgs/auth/pays_login_1.png";
import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";
import Manual from "./Manual";
import Bulk from "./Bulk";
import { Timer } from "lucide-react";
import ScheduleDelivery from "./ScheduleDelivery";
import Recipients from "./Recipients";
// import IndividualLogin from "./individual/page";
// import CompanyLogin from "./company/page";

interface RecipientProps {
  params: { key: string };
}

export default function Page({ params }: RecipientProps) {
  return <Recipients params={params?.key} />;
}
