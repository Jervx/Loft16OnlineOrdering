import React, { useState, useEffect } from "react";

import API from "../../../Helpers/api";
import ProtectedLoader from "../../../Components/ProtectedLoader";

import { GoPrimitiveDot } from "react-icons/go";
import { MdEmail, MdOutlineClose } from "react-icons/md";
import { FaKey, FaEyeSlash, FaEye } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

import { Button, Input, Label } from "@windmill/react-ui";
import HelperLabel from "../../HelperLabel";

import { useDispatch } from "react-redux";
import { openAlertModal, closeInputModal } from "../../../Features/uiSlice";

import Informative from "../../Modal/Informative";

const AdminProfile = ({
  admin_id,
  editor_id,
  uneditable,
  onUpdateSomething,
}) => {
  const dispatch = useDispatch();

  const [loadingData, setLoadingData] = useState(true);
  const [adminData, setAdminData] = useState();
  const [unmounted, setUnmounted] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("Create New Password");
  const [hidden, setHidden] = useState(true);
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const loadAdminData = async () => {
    try {
      const response = await API.post("/admin/loadAdminData", {
        _id: admin_id,
      });
      setAdminData(response.data.adminData);
      setNewName(response.data.adminData.name);
      setLoadingData(false);
    } catch (e) {
        dispatch(
            openAlertModal({
              component: <Informative />,
              data: {
                description: "Sorry, but we can't update right now",
                solution: `Please try again later.. Description : ${e}`,
              },
            })
          );
    }
  };

  const updateAdmin = async (mode, infos) => {
    if (
      mode === 1 &&
      adminData.mobile_numbers.find((num) => num === newNumber)
    ) {
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
      let passed = {};

      if (newPassword !== "Create New Password") passed.isChangedPass = true;

      const update = await API.post("/admin/updateAdmin", {
        _id: editor_id,
        mode,
        ...passed,
        info: {
          ...infos,
        },
      });
      onUpdateSomething();
      loadAdminData();
      setNewNumber("");
      setNewEmail("");
      setNewPassword("Create New Password");
    } catch (e) {}
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <div className="transition duration-200 max-h-xl overflow-y-auto h-5/6">
      {loadingData && <ProtectedLoader />}
      {!loadingData && (
        <div className="mt-4 px-4">
          <div className="flex flex-col items-center">
            <div
              className="relative w-full h-48 bg-no-repeat bg-cover "
              style={{ backgroundImage: `url(${adminData.profile_picture})` }}
            >
              <div className=" flex items-center justify-center w-full h-full backdrop-filter backdrop-blur-xl">
                <img
                  className="border  filter shadow-xl absolute -bottom-16 object-cover w-48 h-48 rounded-full "
                  src={adminData.profile_picture}
                  alt=""
                />
              </div>
            </div>

            <h1 className="mt-20 font-quicksand text-3xl font-medium text-gray-700 capitalize dark:text-white">
              {adminData.name}
            </h1>

            <div className="flex mt-3 -mx-2 items-center">
              <p className="font-medium italic text-xs text-gray-500 capitalize dark:text-gray-300">
                {adminData.role}
              </p>
              <GoPrimitiveDot className="text-gray-400 mx-2" />
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {adminData.email_address}
              </p>
            </div>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-300">
              {adminData.action_count}{" "}
              <span className="font-medium"> Actions</span>
            </p>
          </div>

          <hr className="my-6 mx-8 border-gray-200 dark:border-gray-700" />
          {uneditable && (
            <>
              <HelperLabel
                bg={"bg-red-100"}
                txtbg={"text-red-700"}
                isError={false}
                msg={
                  "Only root admin has the permission to edit other admin"
                }
              />
              <HelperLabel
                bg={"bg-gray-100"}
                txtbg={"text-teal-700"}
                isError={false}
                msg={"You can only edit your own account"}
              />
            </>
          )}
          <div className=" border-b-2 pb-4 my-4">
            <div>
              <div className="w-full px-4">
                <label className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  Name
                </label>
                <input
                  disabled={uneditable}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  value={newName}
                  className="w-full mt-2 px-2 py-1 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="text"
                />
              </div>
            </div>
            {adminData.name !== newName && newName.length > 0 ? (
              <Button
                className="rounded-lg w-full mt-8"
                onClick={async (e) => {
                  e.stopPropagation();
                  updateAdmin(1, {
                    ...adminData,
                    name: newName,
                  });
                  setNewName("");
                  await loadAdminData();
                  onUpdateSomething()
                }}
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </div>

          <div className="border-b-2 mt-8 pb-4">
            <p className="text-md text-teal-700 font-medium">Contact Number</p>
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
                  disabled={uneditable}
                  className="pl-8 rounded-lg border-1 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
                  placeholder="New Number"
                  aria-label="New Number"
                  value={newNumber}
                  onChange={(e) => {
                    setNewNumber(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.stopPropagation();
                      if (
                        adminData.mobile_numbers.find(
                          (num) => num === newNumber
                        )
                      ) {
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
                      updateAdmin(1, {
                        ...adminData,
                        mobile_numbers: [
                          ...adminData.mobile_numbers,
                          newNumber,
                        ],
                      });
                    }
                  }}
                />
              </div>

              <Button
                className="rounded-lg h-full w-2/12"
                disabled={newNumber.length === 0}
                onClick={() => {
                  if (
                    adminData.mobile_numbers.find((num) => num === newNumber)
                  ) {
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
                  updateAdmin(1, {
                    ...adminData,
                    mobile_numbers: [...adminData.mobile_numbers, newNumber],
                  });
                }}
              >
                Add
              </Button>
            </div>
            <div className="rounded-xl shadow-md p-4 max-h-44 overflow-y-auto">
              {adminData.mobile_numbers.length === 0 ? (
                <p className=" text-xs text-red-500 text-center">
                  Please add contact number
                </p>
              ) : (
                <></>
              )}

              {adminData.mobile_numbers.map((number, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer hover:bg-gray-100  flex justify-between items-center px-4 py-2  shadow-md rounded-sm my-2"
                >
                  <div className="flex items-center">
                    <BsFillTelephoneFill className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                    <p className="text-gray-600">{number}</p>
                  </div>
                  <MdOutlineClose
                    disabled={uneditable}
                    onClick={() => {
                      updateAdmin(1, {
                        ...adminData,
                        mobile_numbers: adminData.mobile_numbers.filter(
                          (num) => {
                            return num !== number;
                          }
                        ),
                      });
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
                  className="pl-8 rounded-lg border-1 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
                  placeholder="Add Recovery Email"
                  aria-label="Add Recovery Email"
                  value={newEmail}
                  disabled={uneditable}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      if (
                        adminData.recovery_emails.find(
                          (email) => email === newEmail
                        ) ||
                        newEmail === adminData.email_address
                      ) {
                        dispatch(
                          openAlertModal({
                            component: <Informative />,
                            data: {
                              description: "Email is already added",
                              solution: "Please use other email",
                            },
                          })
                        );
                        return;
                      }

                      updateAdmin(1, {
                        ...adminData,
                        recovery_emails: [
                          ...adminData.recovery_emails,
                          newEmail,
                        ],
                      });
                    }
                  }}
                />
              </div>

              <Button
                disabled={uneditable}
                className="rounded-lg h-full w-2/12"
                disabled={newEmail.length === 0}
                onClick={() => {
                  if (
                    adminData.recovery_emails.find(
                      (email) => email === newEmail
                    ) ||
                    newEmail === adminData.email_address
                  ) {
                    dispatch(
                      openAlertModal({
                        component: <Informative />,
                        data: {
                          description: "Email is already added",
                          solution: "Please use other email",
                        },
                      })
                    );
                    return;
                  }

                  updateAdmin(1, {
                    ...adminData,
                    recovery_emails: [...adminData.recovery_emails, newEmail],
                  });
                }}
              >
                Add
              </Button>
            </div>

            <div className="mt-4 rounded-xl shadow-md p-4 max-h-44 overflow-y-auto">
              {adminData.recovery_emails.length === 0 ? (
                <p className=" text-xs text-gray-400 text-center">
                  You have no recovery email, your main email will be used by
                  default
                </p>
              ) : (
                <></>
              )}
              {adminData.recovery_emails.map((email, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer hover:bg-gray-100 flex justify-between items-center px-4 py-2 bg-gray-50 shadow-md rounded-sm my-2"
                >
                  <div className="flex items-center">
                    <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
                    <p className="">{email}</p>
                  </div>
                  <MdOutlineClose
                    disabled={uneditable}
                    onClick={() => {
                      updateAdmin(1, {
                        ...adminData,
                        recovery_emails: adminData.recovery_emails.filter(
                          (mail) => {
                            return mail !== email;
                          }
                        ),
                      });
                    }}
                    className="right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="my-4 border-b-2 pb-4">
            <div className="flex mt-8 items-center">
              <p className="text-md text-teal-700 font-medium mr-4">Security</p>
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
                  disabled={uneditable}
                  className={`pl-8 text-base rounded-lg border-1 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700 ${
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
                  newPassword === "Create New Password" ||
                  newPassword === "" ||
                  uneditable
                }
                onClick={async () => {
                  updateAdmin(1, {
                    ...adminData,
                    password: newPassword,
                  });
                }}
              >
                Save
              </Button>
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
              className={`mt-4 cursor-pointer ${
                uneditable && "cursor-not-allowed"
              }`}
              onClick={async () => {
                if (uneditable) return;
                updateAdmin(1, {
                  ...adminData,
                  two_factor_auth: !adminData.two_factor_auth,
                });
              }}
            >
              <Input
                type="checkbox"
                disabled={uneditable}
                onChange={()=>{}}
                checked={adminData.two_factor_auth}
              />
              <span className="ml-2 text-gray-600">
                Enable Two Factor Authentication
              </span>
            </Label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
