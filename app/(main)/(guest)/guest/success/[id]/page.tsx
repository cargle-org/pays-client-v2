import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-screen">
      <div className="font-medium text-xl">Success! 👍</div>
      <p className="text-lg">
        Thank you for using <span className="font-medium">Usepays.</span>
      </p>
      <div className="flex flex-col gap-1 items-center">
        <Link
          href="/guest/create-voucher"
          className="flex items-center gap-0.5 underline font-semibold text-brand-main"
        >
          Create a New voucher <Plus className="size-4" />
        </Link>
        or
        <Link href="/" className="underline font-semibold text-brand-main">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default page;
