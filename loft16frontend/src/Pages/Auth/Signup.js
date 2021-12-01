import React, { useState } from "react";

/* Components */
import RegistrationConfirm from "../../Components/ModalComponent/RegistrationConfirm";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { Button, Label, Input, Alert } from "@windmill/react-ui";

/* Icons */
import { BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { CgUserlane } from "react-icons/cg";
import { RiUser6Fill } from "react-icons/ri";
import { FaEyeSlash, FaEye } from "react-icons/fa";

/* Redux, Reducers */
import { useDispatch, useSelector } from "react-redux";
import { closeLoader, openInputModal, openAlertModal } from "../../Features/uiSlice";
import { openLoader } from "../../Features/uiSlice";
import { partialRegistration } from "../../Features/authSlice";

/* API */
import API from "../../Helpers/api"


const Signup = () => {

  const dispatch = useDispatch();
  const uiState = useSelector((state) => state.ui);

  const [name, setName] = useState("");
  const [user_name, setUserName] = useState("");
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [validation, setValidation] = useState(true);
  const [validMsg, setValidMsg] = useState("");

  const [passVis, setPassVis] = useState(false);
  const [passVis2, setPassVis2] = useState(false);

  //validate the form inputs
  const validate = () => {
    if (name === "") {
      setValidMsg("Name is empty!");
      return false;
    }

    if (user_name === "") {
      setValidMsg("username is empty!");
      return false;
    }

    if (email_address === "") {
      setValidMsg("email address is empty!");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email_address)) {
      setValidMsg("email address is not valid!");
      return false;
    }

    if (password !== rePassword) {
      setValidMsg("Password doesn't match");
      return false;
    } else if (password.length === 0 || rePassword.length === 0) {
      setValidMsg("Password should not be empty");
      return false;
    }

    if (
      !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
        password
      ))
    ) {
      setValidMsg(
        "Password should have 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number"
      );
      return false;
    }

    setValidation(true)
    return true;
  };

  //Partial Registration
  const submitPartialRegistration = () => {
    dispatch(openLoader({ state: true, message: "please wait.." }));

    if (!validate()) {
      dispatch(closeLoader());
      setValidation(false);
      return;
    }

    API.post("/auth/confirm_email", {
        name,
        user_name,
        email_address,
        password,
      })
      .then((response) => {
        dispatch(closeLoader());
        dispatch(
          partialRegistration({
            name,
            user_name,
            email_address,
            password,
          })
        );
        dispatch(
          openInputModal({
            title: "Verification Code",
            component: <RegistrationConfirm />,
            onAccept: () => {},
            acceptBtnText: "Finish",
            cancelBtnText: "Cancel",
          })
        );
      })
      .catch((error) => {
        dispatch(closeLoader());
        if (error.response) {
          //request was made but theres a response status code
          dispatch(openAlertModal({
            component : (<></>),
            data : error.response.data
          }))
        
        } else if (error.request) {
          // The request was made but no response was received
          dispatch(openAlertModal({
            component : (<></>),
            data : {
              err: 500,
              description: "Sorry, but we can't reach the server",
              solution : "Please try again later"
            }
          }))
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
        
  };

  //Toggle password Visibility
  const togglePassVis = () => { setPassVis(!passVis); };

  //Toggle retype pass Visibility2
  const togglePassVis2 = () => { setPassVis2(!passVis2); };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="pacifico defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create Loft 16 Account
              </h1>
              <div className="flex justify-center"></div>

              <div className="flex">
                <Label>
                  <span>Name*</span>
                  <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      <RiUser6Fill className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <Input
                      className="mt-1 pl-8"
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.currentTarget.value);
                      }}
                    />
                  </div>
                </Label>
                <Label>
                  <span>Username*</span>
                  <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                    <div className="absolute inset-y-0 flex items-center pl-2">
                      <CgUserlane className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <Input
                      className="mt-1 pl-8"
                      type="text"
                      placeholder="username"
                      value={user_name}
                      onChange={(e) => {
                        setUserName(e.currentTarget.value);
                      }}
                    />
                  </div>
                </Label>
              </div>
              <Label className="pt-4">
                <span>Email*</span>
                <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <MdAlternateEmail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type="email"
                    placeholder="john@doe.com"
                    value={email_address}
                    onChange={(e) => {
                      setEmailAddress(e.currentTarget.value);
                    }}
                  />
                </div>
              </Label>
              <Label className="pt-4">
                <span>Password *</span>
                <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <BsFillLockFill className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type={!passVis ? "password" : "text"}
                    placeholder=""
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                    value={password}
                  />
                  <div
                    onClick={togglePassVis}
                    className="absolute cursor-pointer right-2 inset-y-2 flex items-center pl-2"
                  >
                    {!passVis ? (
                      <FaEyeSlash className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <FaEye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </Label>
              <Label className="pt-4">
                <span>Confirm Password*</span>
                <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <BsFillLockFill className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type={!passVis2 ? "password" : "text"}
                    placeholder=""
                    onChange={(e) => {
                      setRePassword(e.currentTarget.value);
                    }}
                    value={rePassword}
                  />
                  <div
                    onClick={togglePassVis2}
                    className="absolute cursor-pointer right-2 inset-y-2 flex items-center pl-2"
                  >
                    {!passVis2 ? (
                      <FaEyeSlash className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <FaEye className="w-4 h-4" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </Label>
              <Loader />
              <Alert
                className={!validation ? "block mt-3" : "hidden"}
                type="danger"
              >
                {validMsg}
              </Alert>
              <Button
                disabled={uiState.loader.state}
                onClick={submitPartialRegistration}
                className="mt-4 rounded-md defBackground hover:bg-green-500"
                block
              >
                Sign Up
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
                  to="/auth/signin"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signup;
