"use client";

import React from "react";

function TermsAndConditionsPage() {
  return (
    <>
      <section
        id="terms"
        className="max-w-5xl mx-auto my-8 p-4 flex flex-col gap-6 md:p-24"
      >
        <h1 className="font-extrabold text-2xl my-8 text-center">
          Terms and Conditions
        </h1>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-2">Introduction</h2>
          <p>
            Welcome to UsePays. By accessing or using our website, you agree to
            comply with and be bound by the following terms and conditions.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Acceptance of Terms</h2>
          <p>
            By using UsePays, you acknowledge that you have read, understood,
            and agree to be bound by these terms.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">User Accounts</h2>
          <p className="ml-4">
            <strong>Eligibility:</strong> You must be at least 18 years old to
            create an account.
          </p>
          <p className="ml-4">
            <strong>Account Security:</strong> You are responsible for
            maintaining the confidentiality of your account and password.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Use of Services</h2>
          <p className="ml-4">
            <strong>Permitted Use:</strong> You may use our services for
            personal, non-commercial purposes.
          </p>
          <p className="ml-4">
            <strong>Prohibited Use:</strong> You may not use our services for
            any illegal or unauthorized purpose.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Voucher Creation and Redemption</h2>
          <p className="ml-4">
            <strong>Creation:</strong> Users can create vouchers by following
            the steps on our platform.
          </p>
          <p className="ml-4">
            <strong>Redemption:</strong> Vouchers can be cashed out by
            recipients according to the instructions provided.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Fees and Payments</h2>
          <p className="ml-4">
            <strong>Fees:</strong> Any applicable fees will be clearly
            disclosed.
          </p>
          <p className="ml-4">
            <strong>Payments:</strong> All payments are processed securely
            through our payment gateway.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Privacy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Intellectual Property</h2>
          <p>
            All content on the website, including text, graphics, and logos, is
            the property of UsePays and protected by intellectual property laws.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Limitation of Liability</h2>
          <p>
            UsePays is not liable for any indirect, incidental, or consequential
            damages arising from your use of our services.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Governing Law</h2>
          <p>
            These terms are governed by the laws of the Federal Republic of
            Nigeria, without regard to its conflict of law principles.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be posted on this page and will take effect immediately.
          </p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-">Contact Information</h2>
          <p>
            For any questions about these terms, please contact us at{" "}
            <a href="mailto:support@usepays.co" className="text-blue-500">
              support@usepays.co
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}

export default TermsAndConditionsPage;
