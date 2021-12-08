import React, { useState, useEffect } from "react";

import { Link, withRouter } from "react-router-dom";
import { Button, Label, Input } from "@windmill/react-ui";
import Loader from "../../Components/Loader";

import { BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

/* redux */
import { useDispatch } from "react-redux";
import { signin } from "../../Features/userSlice";
import {
  openAlertModal,
  openInputModal,
  openLoader,
  closeLoader,
} from "../../Features/uiSlice";
import {
  setSignInCredential,
  cleanSignInCredential,
} from "../../Features/authSlice";

/* API */
import API from "../../Helpers/api";
import TwoFactorAuthConfirm from "../../Components/ModalComponent/TwoFactorAuthConfirm";

/* GLogin - OneTap and Login */ 
import { GoogleLogin, GoogleLogout } from "react-google-login";
import googleOneTap from 'google-one-tap';

/* GAssets */
//import GLogo from "../../assets/google_signin_buttons/g_logo_transparent.svg";

/* env */
require("dotenv").config();

const Singin = (props) => {
  
  const CLID = process.env.REACT_APP_GCLIENTID;
  const AUTO_SIGNIN = process.env.REACT_APP_AUTO_SIGN_IN

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const signInUser = async () => {
    try {
      //dispatch save logindata
      dispatch(openLoader({ state: true, message: "checking.." }));
      dispatch(
        setSignInCredential({
          email_address: email,
          password,
        })
      );

      const response = await API.post(
        "/auth/signin",
        {
          email_address: email,
          password,
          oauth: false
        },
        { withCredentials: true }
      );

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
      const userData = response.data.userData;

      dispatch(signin(userData));
      dispatch(cleanSignInCredential());
      localStorage.setItem("userData", JSON.stringify(userData));
      props.history.push("/");
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

  /* G Login */
  const GOnSuccess = async (res) => {
    console.log("logon",res)
    try {
      //dispatch save logindata
      dispatch(openLoader({ state: true, message: "checking.." }));
      dispatch(
        setSignInCredential({
          email_address: email,
          password,
        })
      );

      const response = await API.post(
        "/auth/signin",
        {
          access_token : res.tokenId,
          client_id : CLID
        },
        { withCredentials: true }
      );

      console.log("LOGGED IN BOII!",response);

      dispatch(closeLoader());
      const userData = response.data.userData;
      dispatch(signin(userData));
      dispatch(cleanSignInCredential());
      localStorage.setItem("userData", JSON.stringify(userData));
      props.history.push("/");
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

  const GOnFailure = (res) => {
    console.log(res)
  };

  const options = {
    client_id: CLID, // required
    auto_select: AUTO_SIGNIN, // optional
    cancel_on_tap_outside: false, // optional
    context: 'signin', // optional
  };
  
  googleOneTap(options, (response) => {
    // Send response to server
    console.log("THIS",response);
  });

  return (
    <div id="auth_signin" className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="pacifico defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Sign in to Loft 16
              </h1>
              <GoogleLogin
                clientId={CLID}
                buttonText="Sign In"
                onSuccess={GOnSuccess}
                onFailure={GOnFailure}
                autoLoad={false}
                render={(renderProps) => (
                  <Button
                    className="mt-4 google_signin font-roboto rounded-xl text-gray-600 gbutton"
                    block
                    onClick={renderProps.onClick}
                  >
                    {/*<img className="w-5 mr-3" src={GLogo} alt='google icon' />*/}
                    <div className="mr-3">
                      <svg
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="#000" fill-rule="evenodd">
                          <path
                            d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
                            fill="#EA4335"
                          ></path>
                          <path
                            d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
                            fill="#34A853"
                          ></path>
                          <path fill="none" d="M0 0h18v18H0z"></path>
                        </g>
                      </svg>
                    </div>
                    Sign in with Google
                  </Button>
                )}
                cookiePolicy={"single_host_origin"} autoLoad={AUTO_SIGNIN}/>
                <p className="my-4 text-xs text-center  font-inter font-bold" style={{color : "#2A9E9A"}}>or</p>
              <Label>
                <span>Email</span>
                <div className="flex relative w-full max-w-xl focus-within:text-gray-700">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <MdAlternateEmail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8 bg-gray-100"
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </div>
              </Label>

              <Label className="pt-4">
                <span>Password</span>
                <div className="flex relative w-full max-w-xl focus-within:text-gray-700">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <BsFillLockFill className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type="password"
                    placeholder=""
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
                  to="/auth/recover"
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
