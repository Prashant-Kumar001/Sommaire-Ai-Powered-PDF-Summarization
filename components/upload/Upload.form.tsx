"use client";

import React, { useRef, useState } from "react";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { extractPdfText, storePDFSummary } from "@/action/uploadAction";
import { generateGeminiSummary } from "@/lib/gemini";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((f) => f.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((f) => f.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 24 MB",
    }),
});

const TOAST_ID = "upload-toast";

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: () => toast.loading("Uploading PDF…", { id: TOAST_ID }),
    onUploadError: () => {
      toast.error("Upload failed", { id: TOAST_ID });
      setLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!(file instanceof File)) {
      toast.error("No file selected", { id: TOAST_ID });
      setLoading(false);
      return;
    }

    const parsed = schema.safeParse({ file });
    if (!parsed.success) {
      toast.error(
        parsed.error.flatten().fieldErrors.file?.[0] ?? "Invalid file",
        { id: TOAST_ID },
      );
      setLoading(false);
      return;
    }

    try {
      toast.loading("Uploading PDF…", { id: TOAST_ID });
      const uploadRes = await startUpload([file]);
      if (!uploadRes?.[0]) throw new Error("Upload returned empty");

      const {
        serverData: { fileUrl },
      } = uploadRes[0];

      toast.loading("Extracting text…", { id: TOAST_ID });
      const extracted = await extractPdfText(uploadRes[0].serverData);
      if (!extracted?.success || !extracted.data) {
        throw new Error(extracted?.message || "Extraction failed");
      }

      const pdfText = extracted.data;

      toast.loading("Summarising PDF…", { id: TOAST_ID });

      const summary = await generateGeminiSummary(pdfText).catch(() => null);

      if (!summary) {
        throw new Error("Both OpenAI and Gemini failed");
      }


      toast.success("✨✨ Summary successfully generated", {
        description: undefined,
      });

      const res = await storePDFSummary({
        pdfSummary: summary,
        fileUrl: fileUrl,
        title: file.name,
        fileName: file.name,
      });


      if (!res.success) {
        toast.error("Failed to store PDF summary", {
          description: undefined,
        });
      }

      formRef.current?.reset();
      router.push(`/summary/${res.data.id}`);
    } catch (err) {
      console.log("error from the frontend side", err);
      const msg = err instanceof Error ? err.message : "Unexpected error";
      toast.error(msg);
      console.error("Upload/summary flow error:", err);
    } finally {
      setLoading(false);
      toast.dismiss(TOAST_ID);
    }
  };

  return (
    <div className="flex w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        onSubmit={handleSubmit}
        isUploading={loading}
      />
    </div>
  );
};

export default UploadForm;
