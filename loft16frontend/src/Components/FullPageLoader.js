import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const FullPageLoader = () => {
  return (
    <div className="w-full h-1/2 flex items-center">
      <AiOutlineLoading className="text-teal-600 filter blur-xs w-6/12 h-6/12 animate-spin  m-auto" />
    </div>
  );
};

export default FullPageLoader;
