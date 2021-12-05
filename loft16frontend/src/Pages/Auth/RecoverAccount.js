import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Button, Label, Input } from "@windmill/react-ui";
import Loader from "../../Components/Loader"

import { BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

/* redux */
import { useDispatch } from "react-redux";
import { openAlertModal, openInputModal, openLoader, closeLoader } from "../../Features/uiSlice";
import { setRecoveryAccount } from "../../Features/authSlice";

/* API */
import API from "../../Helpers/api";
import RecoveryCodeConfirm from "../../Components/ModalComponent/RecoveryCodeConfirm";

const RecoverAccount = (props) => {
    const [email, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
  
    const dispatch = useDispatch();
  
    const signInUser = async () => {
      try {
        //dispatch save logindata
        // email_address, newPassword, recovery_code
        dispatch(openLoader({ state: true, message: "checking.." }))
        dispatch(
          setRecoveryAccount({
            email_address: email,
            newPassword,
          })
        );
  
        const response = await API.post("/auth/recover", {
          email_address: email,
          newPassword,
        });
  
        console.log(response);
        dispatch(closeLoader());
  
        // if twofactorrequired
        if (response.data.recovery_code_sent) {
          //  👍 show inputmodal with custom TODO:  component two factor code
          //  this component should contain function for saving user data like below
          dispatch(closeLoader());
          dispatch(
            openInputModal({
              title: "Recovery Code",
              component: <RecoveryCodeConfirm />,
              onAccept: () => {},
              acceptBtnText: "Change Password",
              cancelBtnText: "Cancel",
            })
          );
          return;
        }
        dispatch(closeLoader());
      } catch (error) {
        //👍 TODO: propper error handling
        dispatch(closeLoader());
        if (error.response) {
          //request was made but theres a response status code
          dispatch(
            openAlertModal({
              component: <></>,
              data: error.response.data,
            })
          );
        } else if (error.request) {
          // The request was made but no response was received
          dispatch(
            openAlertModal({
              component: <></>,
              data: {
                err: 500,
                description: "Sorry, but we can't reach the server",
                solution: "Please try again later",
              },
            })
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
    };
  
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto ">
            <main className="flex items-center justify-center p-6 sm:p-12 ">
              <div className="w-full">
                <h1 className="MoonTime defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Recover Account
                </h1>
                <div className="flex justify-center"></div>
                <Label>
                  <span>Email*</span>
                  <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      <MdAlternateEmail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <Input
                      className="mt-1 pl-8"
                      type="email"
                      placeholder="john@doe.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.currentTarget.value);
                      }}
                    />
                  </div>
                </Label>
  
                <Label className="pt-4">
                  <span>New Password*</span>
                  <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      <BsFillLockFill className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <Input
                      className="mt-1 pl-8"
                      type="password"
                      placeholder="********"
                      onChange={(e) => {
                        setPassword(e.currentTarget.value);
                      }}
                      value={newPassword}
                    />
                  </div>
                </Label>
                <Loader />
                <Button
                  className="mt-4 rounded-xl defBackground hover:bg-green-500"
                  block
                  onClick={signInUser}
                >
                  Next
                </Button>
  
                {/* <hr className="my-8" />
  
                <Button block layout="outline">
                  <BsGithub className="w-4 h-4 mr-2" aria-hidden="true" />
                  Github
                </Button>
                <Button className="mt-4" block layout="outline">
                  <BsTwitter className="w-4 h-4 mr-2" aria-hidden="true" />
                  Twitter
                </Button> */}
  
                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/auth/signin"
                  >
                    Sign In
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
}

export default RecoverAccount
