import React, { useState } from "react";

import { useGeneralContext } from "@/context/GenralContext";
import Spinner from "@/components/spinner/Spinner";

const ScheduleDelivery = ({
  setDisplay,
  isGuest,
}: {
  setDisplay: any;
  isGuest?: boolean;
}) => {
  const {
    token,
    recipients,
    oneVoucher,
    setRecipients,
    createVoucherLoading,
    updateVoucherRecipients,
    updateGuestVoucherRecipients,
  }: any = useGeneralContext();

  const [newRecipient, setNewRecipient] = useState({
    schedule_date: "",
    recipient_email: "",
    time_zone: "",
  });
  const [error, setError] = useState("");
  const [scheduled, setScheduled] = useState(false);

  //Current Date
  const currentDate = new Date().toISOString().split("T")[0];
  // Combine with fixed 12:00 PM
  const dateTimeString = `${currentDate}T12:00:00`;

  // Get user's time zone
  function getUserTimeZone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      console.error("Error getting time zone:", error);
      return null;
    }
  }

  const timeZone = getUserTimeZone();

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecipient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddRecipient = () => {
    const { recipient_email, schedule_date } = newRecipient;
    // Validate if all fields are filled
    if (!recipient_email || !schedule_date) {
      setError("All fields are required.");
      return;
    }

    setRecipients((prev: any) => [
      ...prev,
      {
        ...newRecipient,
        schedule_date: dateTimeString,
        time_zone: timeZone,
      },
    ]);
    setNewRecipient({
      schedule_date: "",
      recipient_email: "",
      time_zone: "",
    });
    setScheduled(true);
    setError(""); // Clear error messag
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddRecipient();
  };

  const handleBack = () => {
    setDisplay("");
  };

  //Delete inputs and schedules
  const handleReset = () => {
    setRecipients("");
    setNewRecipient({
      schedule_date: "",
      recipient_email: "",
      time_zone: "",
    });
    setScheduled(false);
  };

  //handle Submit function
  const handleUpdateRecipients = () => {
    if (!isGuest) {
      updateVoucherRecipients();
    } else {
      updateGuestVoucherRecipients();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 items-start justify-between">
        {/* left */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start h-screen md:h-[80vh]">
            <div className="flex flex-col gap-2 justify-start w-full">
              <div className="p-2 px-4 bg-brand-main text-brand-white font-normal text-xs w-max font-geistsans rounded-2xl">
                Step 3 of 3
              </div>
              <span className="font-bold font-geistsans text-2xl sm:text-3xl text-brand-dark">
                Schedule Voucher Delivery
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

              <div className="flex flex-col gap-4 justify-start">
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Recipient Email <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="email"
                    name="recipient_email"
                    id="recipient_email"
                    placeholder="Enter recipient email"
                    onChange={onchangeHandler}
                    value={newRecipient.recipient_email}
                    className="w-full sm:w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-gray-500 font-geistsans mb-2">
                    Schedule Date <span className="text-red-400">*</span>
                  </span>
                  <input
                    type="date"
                    name="schedule_date"
                    id="schedule_date"
                    placeholder="Enter schedule date"
                    onChange={onchangeHandler}
                    value={newRecipient.schedule_date}
                    min={currentDate}
                    className="w-auto sm:w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-xs"
                  />
                </div>
                {!scheduled && (
                  <button
                    type="button"
                    onClick={handleAddRecipient}
                    className={`transition-fx w-auto flex items-center justify-center gap-2 p-1 px-2.5 sm:p-2 sm:px-4 rounded-3xl bg-brand-main text-brand-white font-geistsans text-base font-normal cursor-pointer hover:bg-brand-main/50 ${
                      scheduled &&
                      "disabled cursor-not-allowed bg-brand-main/50"
                    }`}
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
                    Add Schedule Date
                  </button>
                )}
              </div>
            </form>
            {/* bottom buttons */}
            <div className="rounded-b-xl bg-brand-white p-4 flex justify-between items-center border border-brand-grayish/15 mt-auto">
              <span
                onClick={handleBack}
                className="p-1.5 sm:p-3 px-6 sm:px-4 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-sm md:text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
              >
                Back
              </span>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="rounded-xl bg-brand-white p-4 flex flex-col gap-4 justify-start h-[80vh]">
            <span className="font-bold text-base text-brand-main p-2 rounded-lg">
              Recipients
            </span>
            <table className="text-center p-2 rounded-lg w-full overflow-y-auto">
              <thead className="divide-y divide-gray-200 font-bold text-sm  text-brand-grayish p-4 mb-2">
                <tr className="rounded-lg">
                  <th className="py-2"></th>
                  {/* <th className="py-2">Name</th>
                  <th className="py-2">Number</th> */}
                  <th className="py-2 text-start">Email Address</th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm text-brand-grayish/80">
                {recipients.length > 0 ? (
                  recipients.map((item: any, i: number) => (
                    <tr key={i} className="mb-4 rounded-lg">
                      <td className="py-2 text-red-600">*</td>
                      {/* <td className="py-2">{item.recipient_name}</td>
                      <td className="py-2">{item.time_zone}</td> */}
                      <td className="py-2 text-start">
                        {item.recipient_email}
                      </td>
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
              <thead className="divide-y divide-gray-200 font-bold text-sm  text-brand-grayish p-4 mb-2">
                <tr className="rounded-lg">
                  <th className="py-2 text-start"></th>
                  <th className="py-2 text-start">Schedule Date</th>
                </tr>
              </thead>
              <tbody className="font-normal text-sm text-brand-grayish/80">
                {recipients.length > 0 ? (
                  recipients.map((item: any, i: number) => (
                    <tr key={i} className="mb-4 rounded-lg">
                      <td className="py-2 text-red-600">*</td>
                      <td className="py-2 text-start">{item.schedule_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="mb-4 rounded-lg">
                    <td className="py-2" colSpan={4}>
                      No schedule date yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* bottom buttons */}
            <div className="flex justify-between rounded-b-xl bg-brand-white pr-4 mt-auto items-center border border-brand-grayish/15">
              <div className=" bg-brand-white p-4 flex justify-between items-center mt-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 sm:p-3 px-6 sm:px-4 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-normal text-sm md:text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-[#DE2626] hover:text-brand-white"
                >
                  Reset
                </button>
              </div>
              {createVoucherLoading ? (
                <span className="w-[150px] p-3 px-8 h-[44px] flex items-center justify-center text-brand-white">
                  <Spinner />
                </span>
              ) : (
                recipients?.length > 0 && (
                  <button
                    type="submit"
                    onClick={handleUpdateRecipients}
                    className="p-1.5 sm:p-3 px-6 sm:px-4 bg-brand-main text-brand-white font-normal text-sm md:text-base w-max font-geistsans rounded-3xl uppercase cursor-pointer hover:bg-brand-main/25"
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

export default ScheduleDelivery;
