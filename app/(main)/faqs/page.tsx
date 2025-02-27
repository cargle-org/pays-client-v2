"use client";

import React, { useState } from "react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is UsePays?",
      answer:
        "UsePays is a platform that allows you to create, personalize, and cash out gift vouchers quickly and securely.",
    },
    {
      question: "How do I create a voucher?",
      answer:
        "To create a voucher, simply sign up or log in, enter the voucher details including amount and recipient information, and customize your message.",
    },
    {
      question: "How does the recipient cash out a voucher?",
      answer:
        "Recipients receive their voucher code from the voucher creator via email or another method of delivery. Once they have the code, they can redeem valid vouchers by visiting usepays.co/cashout",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use advanced encryption and security protocols to protect your personal and financial information.",
    },
    {
      question: "What fees are associated with using UsePays?",
      answer:
        "Please refer to our pricing page for detailed information on any fees that may apply.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can e-mail us at hi@usepays.co or give us a call at +2347034560055 for any inquiries or assistance. Our office address: 6, Fadunsin avenue, Ikeja, Lagos, Nigeria.",
    },
    {
      question: "Where is Usepays located?",
      answer: " We are located at 6, fadunsin avenue, Ikeja, Lagos, Nigeria.",
    },
    {
      question: "Can I cancel or refund a voucher?",
      answer:
        "For information on cancellations and refunds, please review our terms and conditions or contact our support team.",
    },
    {
      question: "How long does it take to cash out a voucher?",
      answer:
        "Cashing out a voucher is instant once the recipient follows the provided instructions.",
    },
    {
      question: "Do vouchers have an expiration date?",
      answer:
        "Please check the specific terms of each voucher, as expiration dates may vary.",
    },
    {
      question: "Can I use UsePays internationally?",
      answer: "Currently, our services are available in Nigeria.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-12 pt-16 lg:pt-32">
      {/* <div className="w-full min-h-screen pt-16 pb-12 flex flex-col items-start justify-center gap-8 lg:pt-32"> */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto px-4 bg-brand-white rounded-lg p-8 shadow-xl border border-gray-200">
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                <span
                  className={`${
                    openIndex === index ? "font-bold" : "font-medium"
                  }`}
                >
                  {faq.question}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center group hover:bg-brand-main hover:text-white transition-colors">
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`px-6 py-4 bg-gray-50 transition-all duration-300 ${
                  openIndex === index ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 flex items-center justify-center gap-2 text-xl font-medium mt-8">
        Can&apos;t find what you want?
        <div className="group items-center text-xs font-semibold gap-2 cursor-pointer">
          <span className="text-brand-main text-xl font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover:after:w-full">
            Contact Us
          </span>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
