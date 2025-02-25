"use client";

import React, { useState } from "react";
import QuestionMark from "../atoms/Icons/QuestionMark";
import { faqs } from "@/data/faqData";
import PlusIcon from "../atoms/Icons/PlusIcon";
import MinusIcon from "../atoms/Icons/MinusIcon";

const FAQCard = ({
  question,
  answer,
  onClick,
  open,
}: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}) => {
  return (
    <div className='w-full bg-white text-brand-gray200 p-4 mb-4 rounded-lg shadow-sm'>
      <div className='flex items-center justify-between cursor-pointer gap-4' onClick={onClick}>
        <h3 className='text-lg font-medium text-brand-grayish'>{question}</h3>
        {open ? <MinusIcon /> : <PlusIcon />}
      </div>
      {open && <p className='mt-6 text-brand-gray500 text-[14px]'>{answer}</p>}
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='w-full bg-white py-[50px] mb-24'>
      <div className='w-full bg-brand-gray600 max-w-[1200px] mx-auto flex justify-between items-center sm:flex-col sm:justify-center px-6 py-16'>
        <div className='sm:max-w-[600px] sm:mx-auto sm:w-full l:w-[50%] md:w-[50%] md:px-16 flex flex-col gap-4 sm:text-center sm:gap-2 sm:flex-row justify-between items-stretch h-full sm:items-center'>
          <h2 className='lg:text-[48px] font-medium w-[90%] md:text-[40px] text-[26px] text-left'>
            Frequently Asked Questions <span className='font-extralight'>(FAQ)</span>
          </h2>
          <div className='sm:w-[40%] md:mt-20'>
            <QuestionMark className='sm:w-[50px] sm:mx-auto' />
          </div>
        </div>
        <div className='w-full max-w-[600px]'>
          {faqs.map((faq, index) => (
            <FAQCard
              question={faq.question}
              answer={faq.answer}
              key={index}
              onClick={() => handleToggle(index)}
              open={openIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
