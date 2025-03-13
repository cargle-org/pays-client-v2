import React, { useCallback, useEffect } from "react";
import { format } from "date-fns";
import { useGeneralContext } from "@/context/GenralContext";

interface VoucherDraftsProps {
  _id: string;
  userId: string;
  title: string;
  description: string;
  logo: string | null;
  createdAt: Date | string | number;
  voucherKey: string;
  amountPerVoucher: string;
  totalNumberOfVouchers: string;
  backgroundStyle: string;
}

const ViewDrafts = ({
  allDrafts,
  closeModal,
}: {
  closeModal: () => void;
  allDrafts: VoucherDraftsProps[];
}) => {
  const { draftId, setDraftId, getVoucherDraftById }: any = useGeneralContext();

  const handleDraftClick = useCallback(
    (draft: VoucherDraftsProps) => {
      setDraftId(draft._id);
      setTimeout(() => {
        closeModal();
      }, 500);
    },
    [setDraftId]
  );

  useEffect(() => {
    if (draftId) {
      getVoucherDraftById();
    }
  }, [draftId]);

  return (
    <div className="flex gap-3 justify-center items-center flex-wrap p-2">
      {allDrafts.map((draft, index) => {
        const draftDate = draft.createdAt;
        const formattedDraftDate = format(
          new Date(draftDate),
          "MMMM d, yyyy h:mma"
        ).toLowerCase();

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleDraftClick(draft)}
            className="flex items-start justify-start flex-col p-2.5 w-[320px] md:w-[47%] xl:w-[30%] text-xs font-normal border border-gray-300 rounded-md bg-slate-50 gap-0.5 shadow hover:bg-gray-200 hover:font-medium capitalize"
          >
            <div>
              Title: <span className="">{draft.title}</span>
            </div>
            <div className="text-start">Description: {draft.description}</div>
            <div>Created on: {formattedDraftDate}</div>
          </button>
        );
      })}
      {!allDrafts ||
        (allDrafts.length === 0 && (
          <p className="text-sm font-medium">No Drafts Found!</p>
        ))}
    </div>
  );
};

export default ViewDrafts;
