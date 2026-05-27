import { Spinner } from "@/components/ui/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <Spinner className="w-10 h-10"  />
    </div>
  );
};

export default loading;
