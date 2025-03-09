import React, { ReactNode, useRef } from "react";
import { Loader, NotebookPen, Plus } from "lucide-react";

interface VoucherPreviewModalProps {
  modalTitle: string;
  children: ReactNode;
  closeModal: () => void;
  handleSaveToDraft?: (e: React.MouseEvent) => void;
  createVoucherDraftLoading?: boolean;
  fetchVoucherDraftsLoading?: boolean;
}

const VoucherPreviewModal: React.FC<VoucherPreviewModalProps> = ({
  children,
  modalTitle,
  closeModal,
  handleSaveToDraft,
  createVoucherDraftLoading,
  fetchVoucherDraftsLoading,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-1 flex items-center justify-center bg-black bg-opacity-70 z-50"
    >
      <div className="bg-white p-3 md:px-6 md:py-4 rounded shadow-lg w-11/12 md:w-3/4">
        <div className="flex justify-between items-center border-b my-1">
          <h2 className="text-sm font-semibold">{modalTitle}</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 sm:text-base text-xl"
          >
            &times;
          </button>
        </div>
        {children}
        {!fetchVoucherDraftsLoading && (
          <div className="flex items-center justify-end mt-1">
            <button
              type="button"
              onClick={(e) => handleSaveToDraft?.(e)}
              className="py-1 px-2 sm:px-1.5 bg-transparent text-[#DE2626] border-[0.3px] border-[#DE2626] font-medium text-[11px] md:text-xs w-max font-geistsans rounded-3xl capitalize cursor-pointer hover:bg-[#DE2626] hover:text-brand-white hover:font-semibold"
            >
              {createVoucherDraftLoading ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Saving...</span>
                  <Loader className="animate-spin size-4 stroke-[#DE2626]" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 font-semibold">
                  <span>Save drafts</span>
                  <NotebookPen className="size-3.5" />
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherPreviewModal;
