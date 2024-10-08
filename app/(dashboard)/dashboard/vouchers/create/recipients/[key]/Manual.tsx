"use client";

import Spinner from "@/components/spinner/Spinner";
import { useGeneralContext } from "@/context/GenralContext";
import React, { useState } from "react";

const Manual = ({ setDisplay }: any) => {
  const {
    token,
    recipients,
    setRecipients,
    createVoucherLoading,
    updateVoucherRecipients,
  }: any = useGeneralContext();

  const [newRecipient, setNewRecipient] = useState({
    // recipient_name: "",
    recipient_email: "",
    // recipient_phone: "",
  });
  const [error, setError] = useState("");

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecipient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddRecipient = () => {
    // const { recipient_name, recipient_email, recipient_phone } = newRecipient;
    const { recipient_email } = newRecipient;

    // Validate if all fields are filled
    if (!recipient_email) {
      setError("All fields are required.");
      return;
    }

    setRecipients((prev: any) => [...prev, newRecipient]);
    setNewRecipient({
      // recipient_name: "",
      recipient_email: "",
      // recipient_phone: "",
    }); // Clear the form after adding
    setError(""); // Clear error message
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddRecipient();
  };

  const handleBack = () => {
    setDisplay("");
  };

  return (
    <>
      <div className="flex gap-2 items-start justify-between">
        {/* left */}
        <div className="flex flex-col w-max lg:w-[50%]">
          <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start h-[80vh]">
            <div className="flex flex-col gap-2 justify-start w-full">
              <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                Step 3 of 3
              </div>
              <span className="font-bold font-geistsans text-3xl text-brand-dark">
                Add Manual Recipients
              </span>
            </div>
            {/* input fields */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 justify-start"
            >
              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}
              {/* <div className="flex flex-col justify-start">
                <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                  Recipient Name <span className="text-red-400">*</span>
                </span>
                <input
                  type="text"
                  name="recipient_name"
                  id="recipient_name"
                  placeholder="Enter recipient name"
                  onChange={onchangeHandler}
                  value={newRecipient.recipient_name}
                  className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                />
              </div>
              <div className="flex flex-col justify-start">
                <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                  Recipient Phone Number <span className="text-red-400">*</span>
                </span>
                <input
                  type="text"
                  name="recipient_phone"
                  id="recipient_phone"
                  placeholder="Enter recipient phone number"
                  onChange={onchangeHandler}
                  value={newRecipient.recipient_phone}
                  className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                />
              </div> */}
              <div className="flex flex-col justify-start">
                <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                  Recipient Email <span className="text-red-400">*</span>
                </span>
                <div className="flex w-full items-center gap-4">
                  <input
                    type="email"
                    name="recipient_email"
                    id="recipient_email"
                    placeholder="Enter recipient email"
                    onChange={onchangeHandler}
                    value={newRecipient.recipient_email}
                    className="w-[353px] h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                  <span
                    onClick={handleAddRecipient}
                    className="transition-fx flex items-center gap-2 p-2 px-4 rounded-3xl bg-brand-main text-brand-white font-geistsans text-base font-normal cursor-pointer hover:bg-brand-main/50"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 0C6.12902 0 6.25276 0.0512546 6.344 0.142489C6.43523 0.233722 6.48649 0.357462 6.48649 0.486486V5.51351H11.5135C11.6425 5.51351 11.7663 5.56477 11.8575 5.656C11.9487 5.74724 12 5.87098 12 6C12 6.12902 11.9487 6.25276 11.8575 6.344C11.7663 6.43523 11.6425 6.48649 11.5135 6.48649H6.48649V11.5135C6.48649 11.6425 6.43523 11.7663 6.344 11.8575C6.25276 11.9487 6.12902 12 6 12C5.87098 12 5.74724 11.9487 5.656 11.8575C5.56477 11.7663 5.51351 11.6425 5.51351 11.5135V6.48649H0.486486C0.357462 6.48649 0.233722 6.43523 0.142489 6.344C0.0512546 6.25276 0 6.12902 0 6C0 5.87098 0.0512546 5.74724 0.142489 5.656C0.233722 5.56477 0.357462 5.51351 0.486486 5.51351H5.51351V0.486486C5.51351 0.357462 5.56477 0.233722 5.656 0.142489C5.74724 0.0512546 5.87098 0 6 0Z"
                        fill="white"
                      />
                    </svg>
                    Add
                  </span>
                </div>
              </div>
            </form>
            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15 mt-auto">
              <span
                onClick={handleBack}
                className="py-3 px-8 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
              >
                Back
              </span>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col w-max lg:w-[50%]">
          <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start h-[80vh]">
            <span className="font-bold text-base text-brand-main p-2 rounded-lg">
              Recipients
            </span>
            <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
              <thead className="divide-y divide-gray-200 font-bold text-sm text-brand-grayish p-4 mb-2">
                <tr className="rounded-lg">
                  <th className="py-2">S/N</th>
                  {/* <th className="py-2">Name</th>
                  <th className="py-2">Number</th> */}
                  <th className="py-2">Email Address</th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm text-brand-grayish/80">
                {recipients.length > 0 ? (
                  recipients.map((item: any, i: number) => (
                    <tr key={i} className="mb-4 rounded-lg">
                      <td className="py-2">{i + 1}</td>
                      {/* <td className="py-2">{item.recipient_name}</td>
                      <td className="py-2">{item.recipient_phone}</td> */}
                      <td className="py-2">{item.recipient_email}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="mb-4 rounded-lg">
                    <td className="py-2" colSpan={4}>
                      No recipients yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-end mt-auto items-center border border-brand-grayish/15">
              {createVoucherLoading ? (
                <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                recipients?.length > 0 && (
                  <button
                    type="submit"
                    onClick={() => updateVoucherRecipients()}
                    className="p-3 px-8 bg-brand-main text-brand-white font-normal text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
                  >
                    Continue
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manual;
