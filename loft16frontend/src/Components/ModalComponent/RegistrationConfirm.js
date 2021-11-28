import React from "react";
import { Label, Input } from "@windmill/react-ui";
import { HiLockClosed } from "react-icons/hi";

import { useSelector, useDispatch } from "react-redux";
import { finalRegistration } from "../../Features/authSlice";

const RegistrationConfirm = () => {

  const authRegisterState = useSelector((state) => state.auth.registration)
  const dispatch = useDispatch()

  const saveCode = (e) =>{ dispatch(finalRegistration({ code : e.target.value })) }

  return (
    <div>
      <div className="flex-grow">
        <h2 className="text-gray-900 text-center text-xl title-font font-medium mb-8">
          Email Confirmation Code
        </h2>
        <p className="text-center leading-relaxed text-base">
          We've sent the confirmation code to your email<br></br>
          <span className="text-center font-medium">
            {authRegisterState.email}
          </span>
        </p>
      </div>
      <div className="flex sm:justify-center md:justify-center">
        <Label className="pt-4 mt-2 w-full sm:w-7/12 md:w-7/12">
          <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <HiLockClosed className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="mt-1 pl-8 font-semibold tracking-widest"
              type="text"
              placeholder="Confirmation Code"
              onChange={(e)=>saveCode(e)}
            />
          </div>
        </Label>
      </div>
      <div className='mt-5'>
        <p className="text-center text-gray-400 leading-relaxed text-base">
          Didn't receive a code?
        </p>
        <p className="text-center cursor-pointer text-blue-500 text-base">
          Resend
        </p>
      </div>
    </div>
  );
};

export default RegistrationConfirm;
