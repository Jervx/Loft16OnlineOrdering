/* Deps */
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  Avatar,
} from "@windmill/react-ui";
import { withRouter } from "react-router-dom";

/* Icons */
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

/*redux */
import { useSelector, useDispatch } from "react-redux";

/* userSlice */
import { adminOut, adminSign } from "../Features/adminSlice";
import { openNotifier } from "../Features/uiSlice";

import Loader from "../Components/Loader";

import { openInputModal } from "../Features/uiSlice";
import AdminProfile from "../Components/ModalComponent/Admin/AdminProfile";

import API from "../Helpers/api"

const AdminHeader = (props) => {
  const { history } = props;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dispatch = useDispatch();

  //current user
  const adminData = useSelector((state) => state.admin.adminData);
  const appState = useSelector((state) => state.app.appState);

  const reloadAdminData = async () => {
    try {
      let savedAdmin = JSON.parse(localStorage.getItem("adminData"));
      const adminResponse = await API.get(`/admin/mydetails/${savedAdmin._id}`);
      dispatch(adminSign(adminResponse.data.adminData));
    } catch (e) {}
  };

  const signOut = () => {
    dispatch(adminOut());
    props.history.push("/auth/admin_signin");
  };

  useEffect(()=>{
    reloadAdminData()
  },[])

  return (
    <header className="z-40 py-4 bg-white filter shadow-sm dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex items-center"></div>

        {/* User Avatar */}
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            {!adminData ? (
              <Loader />
            ) : (
              <button
                className="rounded-full hover:bg-gray-100 border-2 focus:shadow-outline-purple focus:ring-2 focus:outline-none"
                aria-label="Account"
                aria-haspopup="true"
                onClick={() => setIsProfileMenuOpen(true)}
              >
                {adminData.profile_picture ? (
                  <Avatar
                    className="align-middle"
                    src={adminData.profile_picture}
                    alt="User Profile"
                    aria-hidden="true"
                  />
                ) : (
                  <AiOutlineUser className="align-middle defTextCOlorGreen w-5 h-5" />
                )}
              </button>
            )}
            <Dropdown
              className="custom_shadow p-5"
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <h1 className="text-teal-700 mb-4 font-medium text-base">
                ADMIN
              </h1>
              <DropdownItem
                className="dark:text-gray-200 text-gray-500 bg-gray-50 dark:bg-gray-800 hover:text-green-600"
                tag="a"
                onClick={() => {
                  dispatch(
                    openInputModal({
                      title: "",
                      component: (
                        <AdminProfile
                          onUpdateSomething={reloadAdminData}
                          admin_id={adminData._id}
                        />
                      ),
                      onAccept: () => {},
                      acceptBtnText: "Save",
                      cancelBtnText: "Cancel",
                    })
                  );
                }}
              >
                {adminData ? (
                  <div className="flex items-center">
                    <Avatar
                      className="mr-5"
                      src={
                        adminData.profile_picture
                          ? adminData.profile_picture
                          : "https://cdn.discordapp.com/attachments/912411399458795593/921097628446498887/36..04.jpg"
                      }
                      alt=""
                      aria-hidden="true"
                    />
                    <h1>{adminData.name}</h1>
                  </div>
                ) : (
                  <></>
                )}
              </DropdownItem>

              <DropdownItem
                className="text-gray-500  dark:text-gray-200 hover:text-orange-600"
                onClick={() =>
                  dispatch(
                    openNotifier({
                      title: "Sign Out",
                      message:
                        "You are about to be signed out, Do you wish to proceed?",
                      onAccept: () => {
                        signOut();
                      },
                      acceptBtnText: "Yes",
                      cancelBtnText: "No",
                    })
                  )
                }
              >
                <MdOutlineLogout className="w-5 h-5 mr-5" aria-hidden="true" />
                <span className=" font-normal">Signout</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default withRouter(AdminHeader);
