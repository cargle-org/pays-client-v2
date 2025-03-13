"use client";

import { useState } from "react";
import { Loader, Trash2 } from "lucide-react";
import { success, error } from "@/helpers/Alert";

interface LogoUploaderProps {
  onUploadSuccess: (url: string) => void;
  logo: File | null;
  logoUrl: string | null;
  setLogo: React.Dispatch<React.SetStateAction<File | null>>;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
}

export function LogoUploader({
  onUploadSuccess,
  logo,
  logoUrl,
  setLogo,
  setLogoUrl,
}: LogoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  //Reset Logo Uploader
  const handleLogoUploadReset = () => {
    setLogo(null);
    setLogoUrl("");
  };

  //Handle Upload
  // Convert file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (logo: File) => {
    setIsUploading(true);
    try {
      if (!logo) return error("Please select a file first.");

      const base64Image = await convertToBase64(logo);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        setUploaded(true);
        success("Logo Successully Uploaded!");
      } else {
        error("Logo Upload Failed! Try Again.");
        setIsUploading(false);
        throw new Error("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-auto h-[40px] px-2 py-[12px] border border-brand-grayish/15 rounded-lg text-brand-grayish bg-transparent outline-brand-main/40 font-geistsans font-normal text-[10px] md:text-xs tracking-tighter md:tracking-normal">
      {/* File Input */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          if (selectedFile) {
            setLogo(selectedFile);
            handleUpload(selectedFile); // Upload immediately
          }
        }}
        className=""
      />

      {logoUrl && (
        <div className="flex justify-between items-center space-x-6">
          <img
            src={logoUrl}
            alt="brand_logo"
            className="h-full max-h-[30px] w-full max-w-[90px]"
          />
          <button type="button" onClick={handleLogoUploadReset}>
            <Trash2 className="size-3.5 stroke-[#DE2626] cursor-pointer hidden md:flex" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {isUploading && (
        <button
          type="button"
          disabled={isUploading || uploaded || !logo}
          className={`p-1.5 text-white font-bold rounded ${
            isUploading && "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isUploading && <Loader className="size-3 animate-spin" />}
        </button>
      )}
    </div>
  );
}
