import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { Button, Label, Input } from "@windmill/react-ui";
import Loader from "../../Components/Loader"

import { BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

/* redux */
import { useDispatch } from "react-redux";
import { signin } from "../../Features/userSlice";
import { openAlertModal, openInputModal, openLoader, closeLoader } from "../../Features/uiSlice";
import { setSignInCredential, cleanSignInCredential } from "../../Features/authSlice";

/* API */
import API from "../../Helpers/api";
import TwoFactorAuthConfirm from "../../Components/ModalComponent/TwoFactorAuthConfirm";

const Singin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const signInUser = async () => {
    try {
      //dispatch save logindata
      dispatch(openLoader({ state: true, message: "checking.." }))
      dispatch(
        setSignInCredential({
          email_address: email,
          password,
        })
      );

      const response = await API.post("/auth/signin", {
        email_address: email,
        password,
      });

      console.log(response);
      dispatch(closeLoader());

      // if twofactorrequired
      if (response.data.twoFactorRequired) {
        //  👍 show inputmodal with custom TODO:  component two factor code
        //  this component should contain function for saving user data like below
        dispatch(closeLoader());
        dispatch(
          openInputModal({
            title: "Verification Code",
            component: <TwoFactorAuthConfirm />,
            onAccept: () => {},
            acceptBtnText: "Finish",
            cancelBtnText: "Cancel",
          })
        );
        return;
      }

      dispatch(closeLoader());

      // get user data
      // dispatch signin
      // dispatch clear signin
      // history push / or home
      const userData = response.data.userData
      dispatch(signin(userData))
      dispatch(cleanSignInCredential())
      props.history.push("/")
    } catch (error) {
      //👍 TODO: propper error handling
      // No Request At All
      // error codes get err response data
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
              <h1 className="pacifico defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Sign in to Loft 16
              </h1>
              <div className="flex justify-center"></div>
              <Label>
                <span>Email</span>
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
                <span>Password</span>
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
                    value={password}
                  />
                </div>
              </Label>
              <Loader />
              <Button
                className="mt-4 rounded-xl defBackground hover:bg-green-500"
                block
                onClick={signInUser}
              >
                Signin
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
                  to="/auth/recover_account"
                >
                  Recover Account
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
};

export default withRouter(Singin);
