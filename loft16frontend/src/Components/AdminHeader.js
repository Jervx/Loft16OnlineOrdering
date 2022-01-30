/* Deps */
import React, { useEffect, useState } from "react";
import {
  Input,
  Dropdown,
  DropdownItem,
  Avatar,
  Button,
} from "@windmill/react-ui";
import { withRouter, Link, useLocation } from "react-router-dom";

/* Icons */
import { BiSearch } from "react-icons/bi";
import { AiFillFire, AiFillShopping, AiOutlineUser } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { ImCart } from "react-icons/im";
import { MdOutlineLogout, MdQuestionAnswer } from "react-icons/md";
import { GoPackage } from "react-icons/go";

/*redux */
import { useSelector, useDispatch } from "react-redux";
import { setUserSearch, setData } from "../Features/appSlice";

/* userSlice */
import { signout } from "../Features/userSlice";
import { openNotifier } from "../Features/uiSlice";

import API from "../Helpers/api";

const AdminHeader = (props) => {
  const { history } = props;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dispatch = useDispatch();

  //current user
  const adminData = useSelector((state) => state.admin.adminData);
  const appState = useSelector((state) => state.app.appState);

  const signOut = () => {
    dispatch(signout());
    props.history.push("/");
  };

  const toggleMyCart = () => {
    if (!adminData.hasUser) {
      dispatch(
        openNotifier({
          title: "No User",
          message: "Please Sign In First",
          onAccept: () => {
            history.push("/auth/signin");
          },
          acceptBtnText: "Sign In",
          cancelBtnText: "No, Thanks",
        })
      );
      return;
    }

    // else continue to cart page
    history.push("/user/mycart");
  };

  const onSearchEnter = async (event) => {
    if (event.key === "Enter") {
      props.history.push("/products");
      try {
        const req = await API.post("/browse/getproduct", appState);
        dispatch(setData({ data: req.data.products }));
      } catch (e) {
        console.log("ERR", e);
      }
    }
  };

  const loadAdminData = async () => {
      
  }

  useEffect(() => {
      loadAdminData()
  }, []);

  return (
    <header className="HHeader z-40 py-3 bg-whie shadow-bottom dark:bg-gray-800 border-b-2 border-gray-200 md:px-6">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <div className="flex items-center">
          <Link
            className=" MoonTime defTextCOlorGreen lg:block ml-6 text-2xl font-bold text-gray-800 dark:text-gray-200"
            to="/admin"
          >
            Loft 16
          </Link>
          <Link
            to="/admin"
            className="ml-4 font-extrabold text-xl text-teal-600"
          >
            ADMIN
          </Link>
        </div>

        {/* User Avatar */}
        {/* <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            {!adminData.hasUser ? (
              <Button
                className="rounded-xl defBackground focus:outline-none focus:ring hover:bg-green-500"
                block
                tag={Link}
                to="/auth/signin"
              >
                Signin
              </Button>
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
              <DropdownItem
                className="dark:text-gray-200 text-gray-500 bg-gray-50 dark:bg-gray-800 hover:text-green-600"
                tag="a"
                onClick={() => {
                  props.history.push("/user/profile");
                }}
              >
                {adminData ? (
                  <div className="flex items-center">
                    <Avatar
                      className="mr-5"
                      src={
                        adminData.userData.profile_picture
                          ? adminData.userData.profile_picture
                          : "https://cdn.discordapp.com/attachments/912411399458795593/921097628446498887/36..04.jpg"
                      }
                      alt=""
                      aria-hidden="true"
                    />
                    <h1>{adminData.user_name}</h1>
                  </div>
                ) : (
                  <></>
                )}
              </DropdownItem>

              <DropdownItem
                className="dark:text-gray-200 text-gray-500 hover:text-green-600"
                tag={Link}
                to="/account"
              >
                <BsGearFill className="w-5 h-5 mr-5" aria-hidden="true" />
                <span className=" font-normal">Settings</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={() => {
                  props.history.push("/user/myorders");
                }}
                className="dark:text-gray-200 text-gray-500 hover:text-green-600"
              >
                <GoPackage className="w-5 h-5 mr-5 " aria-hidden="true" />
                <span className=" font-normal">Orders</span>
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
        </ul> */}
      </div>
    </header>
  );
};

export default withRouter(AdminHeader);
