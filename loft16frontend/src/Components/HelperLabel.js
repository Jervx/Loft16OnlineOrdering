import React from "react";
import { AiFillInfoCircle } from "react-icons/ai";


const HelperLabel = ({msg, isError}) => {
  return (
    <div className={` ${isError? "bg-red-100": "bg-blue-100"} flex items-center w-full mt-2 rounded-md px-2 py-1`}>
      <AiFillInfoCircle className={isError? "text-red-600" : "text-blue-600" }/>
      <p className={`ml-2 text-xs ${isError? "text-red-600" : "text-blue-600"}`}>
        {msg}
      </p>
    </div>
  );
};

export default HelperLabel;
