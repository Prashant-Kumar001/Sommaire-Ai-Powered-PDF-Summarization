"use client";

import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isUploading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isUploading }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className="flex flex-col gap-6 w-full"
      >
        <div className="flex w-full justify-end items-center gap-1.5">

          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            required
            className={cn(isUploading && "pointer-events-none", "w-full")}
          />

          <Button
            type="submit"
            disabled={isUploading}
            className="animate-gradient-x"
            variant={'ai'}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  },
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
