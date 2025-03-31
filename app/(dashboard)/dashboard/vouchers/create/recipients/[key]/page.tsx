"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

export default function Page() {
  const params = useParams();
  const { key } = params;

  return <Recipients params={key} />;
}
