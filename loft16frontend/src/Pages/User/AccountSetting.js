import React, { useEffect, useState } from "react";
import ProtectedLoader from "../../Components/ProtectedLoader";

import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "../../Features/userSlice";
import {
  openAlertModal,
  openNotifier,
  openInputModal,
} from "../../Features/uiSlice";

import API from "../../Helpers/api";

import Informative from "../../Components/Modal/Informative";
import HelperLabel from "../../Components/HelperLabel";
import AvatarChoser from "../../Components/ModalComponent/AvatarChoser";
import Footer from "../../Components/Footer";

import { Input, Label } from "@windmill/react-ui";

import Header from "../../Components/Header";

import { Button, Dropdown } from "@windmill/react-ui";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdFileUpload, MdEmail, MdOutlineClose, MdSave } from "react-icons/md";

import { FaMapMarkerAlt, FaKey, FaEyeSlash, FaEye } from "react-icons/fa";
import AddressCreator from "../../Components/ModalComponent/AddressCreator";

const AccountSetting = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [changeAvatarOpen, setAvatarChangerState] = useState(false);

  const [loading, setLoading] = useState(true);
  const [newNumber, setNewNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [newPassword, setNewPassword] = useState("Create New Password");
  const [hidden, setHidden] = useState(true);

  const [newUserName, setNewUserName] = useState("");
  const [newName, setNewName] = useState("");
  const userDataRaw = JSON.parse(localStorage.getItem("userData"));

  const [profilePicture, setProfilePicture] = useState();
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState("");


  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/user/mydetails/${userDataRaw._id}`);
      dispatch(signin(response.data.userData));
      setProfilePicture(response.data.userData.profile_picture)
      setLoading(false);
      setNewUserName(response.data.userData.user_name);
      setNewName(response.data.userData.name);
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(
          openAlertModal({
            component: <Informative />,
            data: {
              description: error.response.data.description,
              solution: error.response.data.solution,
            },
          })
        );
        return;
      }
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "We can't reach the server",
            solution: "Please try again later",
          },
        })
      );
    }
  };

  const changeImage = async () => {
    try {
      const formData = new FormData();
      formData.append("profile_picture", image);
      formData.append("path", "profile");
      formData.append("_id", userData._id);
      const response = await API.post("/user/uploadProfile", formData);
      loadUserData()
      setFileName("")
    } catch (e) {
      console.log(e);
    }
  };


  const notLoggedinModal = () => {
    dispatch(
      openAlertModal({
        component: <Informative />,
        data: {
          description: "This email is already added to your account",
          solution: "Please use another email",
        },
      })
    );
  };

  const avatarChoser = () => {
    dispatch(
      openInputModal({
        title: "Choose Avatar",
        component: <AvatarChoser onSave={loadUserData} />,
        onAccept: () => {},
        acceptBtnText: "Save",
        cancelBtnText: "Cancel",
      })
    );
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const updateNumber = async (mode, number) => {
    if (mode === 0 && userData.mobile_numbers.find((num) => num === number)) {
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "Mobile Number is already added",
            solution: "Please use other number",
          },
        })
      );
      return;
    }

    try {
      const update = await API.post("/user/mynumber", {
        _id: userData._id,
        mode,
        number,
      });
      loadUserData();
      setNewNumber("");
    } catch (e) {
      notLoggedinModal();
    }
  };

  const updateRecovery = async (mode, email) => {
    if (
      mode === 0 &&
      (userData.recovery_emails.find((mail) => mail === email) ||
        userData.email_address === email)
    ) {
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "This email is already added to your account",
            solution: "Please use another email",
          },
        })
      );
      return;
    }

    try {
      const update = await API.post("/user/myrecovery", {
        _id: userData._id,
        mode,
        email,
      });
      loadUserData();
      setNewEmail("");
    } catch (e) {
      notLoggedinModal();
    }
  };

  return (
    <div>
      <Header />
      {!userData ? (
        <ProtectedLoader />
      ) : (
        <div className="mx-8 mt-8 mb-0 md:flex justify-center items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-xl text-teal-700 font-medium">
              Account Settings
            </h1>

            <div className="mt-8">
              <div className="flex my-8 items-center">
                <img class="object-cover mr-4 w-32 h-32 rounded-full ring-8 ring-pink-50" src={profilePicture} alt="" />
                <div className="mr-6" className="relative">
                  <div className="w-1/2 my-4">
                    {fileName.length === 0 && (
                      <label className="relative mt-20 mb-2 w-5/12 ">
                        <input
                          className="w-full opacity-0"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                            setFileName(e.target.files[0].name);
                            setProfilePicture(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                        <div className="transition text-white duration-150 w-full absolute top-0 z-10 px-4 py-2 text-sm border cursor-pointer bg-teal-500 border-dashed hover:border-transparent hover:bg-teal-600 hover:text-white flex items-center justify-center rounded-md">
                          <MdFileUpload className="mr-5" />
                          <span>Change Photo</span>
                        </div>
                      </label>
                    )}
                    {fileName.length !== 0 && (
                      <div className="relative mt-20 my-2">
                        <button
                          onClick={() => {
                            changeImage()
                          }}
                          className=" animate-pulse transition duration-150 w-full px-4 py-2 text-sm border cursor-pointer bg-teal-500 border-dashed hover:border-transparent hover:bg-teal-600 text-white flex items-center justify-center rounded-md"
                        >
                          <MdSave className="mr-5" />
                          <span>Save</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {/* <Button className="rounded-lg" onClick={() => avatarChoser()}>
                    Change Avatar
                  </Button>
                  <Dropdown
                    className="custom_shadow p-5"
                    isOpen={changeAvatarOpen}
                    onClose={() => setAvatarChangerState(false)}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg text-black">Select</p>
                        <button className="bg-teal-500 px-3 py-2 rounded-md text-white">
                          Save
                        </button>
                      </div>
                    </div>
                  </Dropdown> */}
                  <div>
                    <p className="text-md text-cool-gray-500 mt-2">
                      {userData.email_address}{" "}
                      <span className="font-bold"> (Main)</span>
                    </p>
                    <div className="mx-auto ">
                      <HelperLabel
                        isError={false}
                        bg={"bg-teal-50"}
                        txtbg={"text-teal-600"}
                        msg={"You cannot change your main Email Address"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-md text-teal-700 font-medium mb-4">Basic</p>

            <div className="flex flex-wrap -m-2 border-b-2 pb-4 mb-4">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setNewUserName(e.target.value)}
                    value={newUserName}
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="name"
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    value={newName}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></input>
                </div>
              </div>
              {userData.user_name !== newUserName ||
              userData.name !== newName ? (
                <Button
                  className="rounded-lg w-full mt-8"
                  onClick={async (e) => {
                    e.stopPropagation();
                    const update = await API.post("/user/mybasics", {
                      _id: userData._id,
                      user_name: newUserName,
                      name: newName,
                    });
                    await loadUserData();
                  }}
                >
                  Save
                </Button>
              ) : (
                ""
              )}
            </div>

            <div className="border-b-2 mt-8 pb-4">
              <p className="text-md text-teal-700 font-medium">
                Contact Number
              </p>
              <div className="mx-auto ">
                <HelperLabel
                  isError={false}
                  bg={"bg-teal-50"}
                  txtbg={"text-teal-600"}
                  msg={"Courier uses these number to contact you"}
                />
              </div>
              <div className=" flex items-center mt-4  ">
                <div className="relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <BsFillTelephoneFill className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                  </div>
                  <Input
                    className="pl-8 rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
                    placeholder="New Number"
                    aria-label="New Number"
                    value={newNumber}
                    onChange={(e) => {
                      setNewNumber(e.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") updateNumber(0, newNumber);
                    }}
                  />
                </div>

                <Button
                  className="rounded-lg h-full w-2/12"
                  disabled={newNumber.length === 0}
                  onClick={() => updateNumber(0, newNumber)}
                >
                  Add
                </Button>
              </div>
              <div className="rounded-xl shadow-md p-4 max-h-44 overflow-y-auto">
                {userData.mobile_numbers.length === 0 ? (
                  <p className=" text-xs text-red-500 text-center">
                    You have no contact, please add
                  </p>
                ) : (
                  <></>
                )}

                {userData.mobile_numbers.map((number, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer hover:bg-gray-100  flex justify-between items-center px-4 py-2  shadow-md rounded-sm my-2"
                  >
                    <div className="flex items-center">
                      <BsFillTelephoneFill className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                      <p className="text-gray-600">{number}</p>
                    </div>
                    <MdOutlineClose
                      onClick={() => {
                        updateNumber(1, number);
                      }}
                      className="cursor-pointer text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4 border-b-2 pb-8">
              <p className="text-md text-teal-700 mt-8 font-medium">
                Recovery Emails
              </p>
              <div className="mx-auto ">
                <HelperLabel
                  isError={false}
                  bg={"bg-teal-50"}
                  txtbg={"text-teal-600"}
                  msg={
                    "This is where Loft 16 recovery & 2 factor auth code will be sent"
                  }
                />
              </div>
              <div className=" flex items-center mt-4  ">
                <div className="relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                  </div>
                  <Input
                    className="pl-8 rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
                    placeholder="Add Recovery Email"
                    aria-label="Add Recovery Email"
                    value={newEmail}
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter")
                        updateRecovery(0, newEmail.toLowerCase());
                    }}
                  />
                </div>

                <Button
                  className="rounded-lg h-full w-2/12"
                  disabled={newEmail.length === 0}
                  onClick={() => updateRecovery(0, newEmail.toLowerCase())}
                >
                  Add
                </Button>
              </div>
              <div className="mt-4 rounded-xl shadow-md p-4 max-h-44 overflow-y-auto">
                {userData.recovery_emails.length === 0 ? (
                  <p className=" text-xs text-gray-400 text-center">
                    You have no recovery email, your main email will be used by
                    default
                  </p>
                ) : (
                  <></>
                )}
                {userData.recovery_emails.map((email, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer hover:bg-gray-100 flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md rounded-sm my-2"
                  >
                    <div className="flex items-center">
                      <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                      <p className="">{email}</p>
                    </div>
                    <MdOutlineClose
                      onClick={() => {
                        updateRecovery(1, email);
                      }}
                      className="right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4 border-b-2 pb-4">
              <div className="flex mt-8 items-center">
                <p className="text-md text-teal-700 font-medium mr-4">
                  Shipping Address
                </p>
                <Button
                  className="rounded-lg w-4/12 md:w-2/12"
                  onClick={() => {
                    dispatch(
                      openInputModal({
                        title: "Choose Avatar",
                        component: (
                          <AddressCreator
                            mode={0}
                            onSave={loadUserData}
                            _id={userData._id}
                          />
                        ),
                        onAccept: () => {},
                        acceptBtnText: "Save",
                        cancelBtnText: "Cancel",
                      })
                    );
                  }}
                >
                  New Address
                </Button>
              </div>
              <div className="mx-auto ">
                <HelperLabel
                  isError={false}
                  bg={"bg-teal-50"}
                  txtbg={"text-teal-600"}
                  msg={"This is important for shipping your order"}
                />
              </div>
              <div className="mt-4 rounded-xl shadow-md p-4 max-h-44 overflow-y-auto">
                {userData.shipping_address.addresses.length === 0 ? (
                  <p className=" text-xs text-red-600 text-center">
                    You have no shipping address, Add now
                  </p>
                ) : (
                  <></>
                )}
                {userData.shipping_address.addresses.map((address, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      dispatch(
                        openInputModal({
                          title: "Choose Avatar",
                          component: (
                            <AddressCreator
                              gaddress={address}
                              mode={1}
                              onSave={loadUserData}
                              _id={userData._id}
                            />
                          ),
                          onAccept: () => {},
                          acceptBtnText: "Save",
                          cancelBtnText: "Cancel",
                        })
                      );
                    }}
                    className="cursor-pointer hover:bg-gray-100 flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md rounded-sm my-2"
                  >
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                      <p className="">{address.address}</p>
                    </div>
                    <MdOutlineClose
                      onClick={async (e) => {
                        e.stopPropagation();
                        const update = await API.post("/user/myaddress", {
                          _id: userData._id,
                          address,
                          mode: 2,
                        });
                        await loadUserData();
                      }}
                      className="right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="my-4 border-b-2 pb-4">
              <div className="flex mt-8 items-center">
                <p className="text-md text-teal-700 font-medium mr-4">
                  Security
                </p>
              </div>
              <div className="mx-auto ">
                <HelperLabel
                  isError={false}
                  bg={"bg-teal-50"}
                  txtbg={"text-teal-600"}
                  msg={"Make your account more secure"}
                />
              </div>

              <div className=" flex items-center mt-4  ">
                <div className="relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <FaKey className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                  </div>
                  <Input
                    className={`pl-8 text-base rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700 ${
                      hidden ? "tracking-widest" : ""
                    }`}
                    placeholder="Change Password"
                    aria-label="Change Password"
                    type={!hidden ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  {hidden ? (
                    <FaEyeSlash
                      onClick={() => setHidden(false)}
                      className="absolute right-2 inset-y-2 w-4 h-4 text-teal-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <FaEye
                      onClick={() => setHidden(true)}
                      className="absolute right-2 inset-y-2 w-4 h-4 text-teal-700"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <Button
                  className="rounded-lg h-full w-2/12"
                  disabled={
                    newPassword === "Create New Password" || newPassword === ""
                  }
                  onClick={async () => {
                    await API.post("/user/mypassword", {
                      _id: userData._id,
                      password: newPassword,
                    });
                    setNewPassword("Create New Password");
                    dispatch(
                      openAlertModal({
                        component: <Informative />,
                        data: {
                          description: "Password Changed",
                          solution: "Password has been changed successfuly",
                        },
                      })
                    );
                    await loadUserData();
                  }}
                >
                  Save
                </Button>

                {/* /mytwofactorauth */}
              </div>

              <div className="mx-auto ">
                {!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
                  newPassword
                ) && newPassword !== "Create New Password" ? (
                  <HelperLabel
                    isError={true}
                    msg={
                      "We recomend that your password contain more than 8 characters with Uppercase, Lowercase Symbols, & Numbers "
                    }
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="flex mt-8 items-center">
                <p className="text-md text-teal-700 font-medium mr-4">
                  Two Factor Authentication
                </p>
              </div>

              <div className="mx-auto ">
                <HelperLabel
                  isError={false}
                  bg={"bg-teal-50"}
                  txtbg={"text-teal-600"}
                  msg={
                    "Two Factor Auth will help you secure your account by having 2 step verification via your email address"
                  }
                />
              </div>
              <Label
                check
                className="mt-4"
                onClick={async () => {
                  await API.post("/user/mytwofactorauth", {
                    _id: userData._id,
                    two_factor_auth: !userData.two_factor_auth,
                  });
                  await loadUserData();
                }}
              >
                <Input type="checkbox" checked={userData.two_factor_auth} />
                <span className="ml-2 text-gray-600">
                  Enable Two Factor Authentication
                </span>
              </Label>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default AccountSetting;
