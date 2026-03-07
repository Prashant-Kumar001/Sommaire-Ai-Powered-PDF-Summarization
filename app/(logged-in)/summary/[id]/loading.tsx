import { Spinner } from "@/components/ui/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Spinner />
    </div>
  );
};

export default loading;
