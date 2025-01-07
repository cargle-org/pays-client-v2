"use client";

import React from "react";

function PrivacyPolicyPage() {
  return (
    <>
      <section
        id="privacy-policy"
        className="max-w-5xl mx-auto my-8 p-4 flex flex-col gap-6 md:p-24"
      >
        <h1 className="font-extrabold text-2xl my-8 text-center">
          Privacy Policy
        </h1>
        <div className="flex flex-col w-full gap-2">
          <h2 className="font-bold my-2">Introduction</h2>
          <p>
            At UsePays, we are committed to protecting your privacy. This policy
            explains how we collect, use, and safeguard your information.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Information Collection</h2>
          <p className="ml-4">
            <strong>Personal Information:</strong> We collect personal
            information you provide when creating an account or using our
            services.
          </p>
          <p className="ml-4">
            <strong>Usage Data:</strong> We collect data on how you interact
            with our website to improve our services.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Use of Information</h2>
          <p className="ml-4">
            <strong>Service Delivery:</strong> We use your information to
            provide and improve our services.
          </p>
          <p className="ml-4">
            <strong>Communication:</strong> We may use your contact information
            to send updates and promotional materials.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Information Sharing</h2>
          <p className="ml-4">
            We do not sell or rent your personal information to third parties.
            We may share your information with trusted partners to facilitate
            our services.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Security</h2>
          <p className="ml-4">
            We implement robust security measures to protect your information
            from unauthorized access.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Cookies</h2>
          <p className="ml-4">
            Our website uses cookies to enhance your experience. You can control
            cookie settings through your browser.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">User Rights</h2>
          <p className="ml-4">
            You have the right to access, modify, or delete your personal
            information. Contact us at{" "}
            <a href="mailto:hi@usepays.co" className="text-blue-500">
              hi@usepays.co
            </a>{" "}
            for assistance.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Changes to Policy</h2>
          <p className="ml-4">
            We may update this privacy policy from time to time. Changes will be
            posted on this page and will take effect immediately.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-bold my-2">Contact Information</h2>
          <p className="ml-4">
            For any questions about this privacy policy, please contact us at{" "}
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

export default PrivacyPolicyPage;
