"use client";

import BusinessHero from "@/components/Business/BusinessHero";
import Claim from "@/components/Business/Claim";
import Features from "@/components/Business/Features";
import Brand from "@/components/Landing/Brand";
import FAQ from "@/components/Landing/FAQ";
import Find from "@/components/Landing/Find";
import Hero from "@/components/Landing/Hero";
import Metrics from "@/components/Landing/Metrics";
import Template from "@/components/Landing/Template";
import React from "react";

const Page = () => {
  return (
    <div className='w-full pt-12 pb-10 lg:pt-32'>
      <BusinessHero />
      <Brand />
      <Features />
      <Metrics />
      <Template />
      <Claim />
      <FAQ />
    </div>
  );
};

export default Page;
