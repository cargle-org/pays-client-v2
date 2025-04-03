import React from "react";
import { voucherTemplates } from "@/constants/voucherTemplates";
import { useGeneralContext } from "@/context/GenralContext";

interface VoucherTemplatesProps {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      voucherKey: string;
      expiryDate: string;
      logo: string;
      amountPerVoucher: string;
      totalNumberOfVouchers: string;
      backgroundStyle: string;
    }>
  >;
}

const VoucherTemplates: React.FC<VoucherTemplatesProps> = ({ setFormData }) => {
  const { user }: any = useGeneralContext();

  //Check user account type
  const userType = user?.isCompany ? "company" : "individual";

  // Functions to prefill voucher fields.
  const handleTemplateClick = (template: {
    title: string;
    description: string;
    voucherKey: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      title: template.title,
      description: template.description,
      voucherKey: template.voucherKey,
    }));
  };

  return (
    <div className="flex items-center justify-center bg-[#CCC] p-2 flex-col px-2 max-w-auto">
      <div className="bg-brand-white p-1 rounded-md space-x-1 w-auto">
        {voucherTemplates[userType].map(
          (
            template: {
              scenario: string;
              title: string;
              description: string;
              voucherKey: string;
            },
            index: React.Key
          ) => (
            <button
              type="button"
              key={index}
              onClick={() => handleTemplateClick(template)}
              className="font-semibold text-center text-[10px] p-1 bg-[#CCC] rounded-md border border-black tracking-tighter leading-[-0.32px]"
            >
              {template.scenario}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default VoucherTemplates;
