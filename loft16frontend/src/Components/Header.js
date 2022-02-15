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

const Header = (props) => {
  const { history } = props;
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const dispatch = useDispatch();

  //current user
  const _cur_user = useSelector((state) => state.user);
  const appState = useSelector((state) => state.app.appState);

  const signOut = () => {
    dispatch(signout());
    props.history.push("/");
  };

  const toggleMyCart = () => {
    if (!_cur_user.hasUser) {
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

  useEffect(() => {}, []);

  return (
    <header className="HHeader fixed bg-white top-0 w-full z-40 py-3 bg-whie shadow-bottom dark:bg-gray-800 border-b-2 border-gray-200 md:px-6">
      <div className=" container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <a
          className=" MoonTime defTextCOlorGreen lg:block ml-6 text-2xl font-bold text-gray-800 dark:text-gray-200"
          href="/"
        >
          Loft 16
        </a>

        {/* <!-- Embedded Routes --> */}
        <div className="flex text-gray-500 items-center justify-center flex-1">
          <h3
            onClick={() => history.push("/")}
            className={
              (useLocation().pathname === "/" ? "text-red-500" : "") +
              " cursor-pointer text-sm flex hover:text-red-500 items-center py-2 mx-4"
            }
          >
            <AiFillFire className="w-6 h-6 pr-2" aria-hidden="true" />
            <p className="hidden md:block transition duration-200 ease-linear">
              What's Hot
            </p>
          </h3>
          <h3
            onClick={() => history.push("/products")}
            className={
              (useLocation().pathname === "/products" ? "text-red-500" : "") +
              " cursor-pointer text-sm flex hover:text-red-500 items-center mx-4"
            }
          >
            <AiFillShopping className="w-6 h-6 pr-2" aria-hidden="true" />
            <p className="hidden md:block transition duration-200 ease-linear">
              Products
            </p>
          </h3>
          <h3
            onClick={() => history.push("/faqs")}
            className={
              (useLocation().pathname === "/faqs" ? "text-red-500" : "") +
              " cursor-pointer text-sm flex hover:text-red-500 items-center mx-4"
            }
          >
            <MdQuestionAnswer className="w-6 h-6 pr-2" aria-hidden="true" />
            <p className="hidden md:block transition duration-200 ease-linear">
              FAQs
            </p>
          </h3>
        </div>

        {/* <!-- Search input --> */}
        <div className="flex justify-end flex-1 mr-2 lg:mr-8">
          <div className="relative text-green-900 h-full md:w-7/12 mr-2  focus-within:text-green-700 ">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <BiSearch className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
              placeholder="Search Product"
              aria-label="Search"
              onChange={(e) => {
                dispatch(setUserSearch({ userSearch: e.target.value }));
              }}
              onKeyDown={onSearchEnter}
            />
          </div>
        </div>

        {/* User Avatar */}
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMyCart}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <ImCart
                className="w-5 h-5  defTextCOlorGreen"
                aria-hidden="true"
              />
              {_cur_user.hasUser && _cur_user.userData.cart.total_items > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-5 h-5 transform translate-x-3 -translate-y-3 bg-red-600 border-2 text-white border-white rounded-full dark:border-gray-800"
                >
                  <p className="text-white text-xs">
                    {_cur_user.userData.cart.total_items}
                  </p>
                </span>
              )}
            </button>
          </li>
          <li className="relative">
            {!_cur_user.hasUser ? (
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
                {_cur_user.userData.profile_picture ? (
                  <Avatar
                    className="align-middle"
                    src={_cur_user.userData.profile_picture}
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
                {_cur_user.hasUser ? (
                  <div className="flex items-center">
                    <Avatar
                      className="mr-5"
                      src={
                        _cur_user.userData.profile_picture
                          ? _cur_user.userData.profile_picture
                          : "https://cdn.discordapp.com/attachments/912411399458795593/921097628446498887/36..04.jpg"
                      }
                      alt=""
                      aria-hidden="true"
                    />
                    <h1>{_cur_user.userData.user_name}</h1>
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
        </ul>
      </div>
    </header>
  );
};

export default withRouter(Header);
