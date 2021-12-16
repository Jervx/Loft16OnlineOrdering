import React from "react";

import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";

/* Windmill UI Components */
import { Button } from "@windmill/react-ui";

/* Componentes/Pages */
import Header from "../../Components/Header";
import UserNav from "./UserNav";
import MyCart from "./MyCart";
import Orders from "./Orders";
import ArrivedOrders from "./ArrivedOrders";
import CancelledOrders from './CancelledOrders'

/* Protected Route */
import ProtectedRoute from "../../Components/ProtectedRoute";
import ProtectedLoader from "../../Components/ProtectedLoader"

/* Icons */
import { AiOutlineMail } from "react-icons/ai";
import { GoVerified, GoUnverified } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";

const AccountProfile = () => {
  const userData = useSelector((state) => state.user.userData);

  return (
    <div>
      <Header />
      {!userData ? (
        <ProtectedLoader />
      ) : (
        <>
          <div className="mx-8 mt-8 mb-0 md:flex justify-center items-center">
            <img
              className="border-8 rounded-full w-2/12 h-2/12 md:w-1/12 md:h-1/12"
              alt="pic"
              src={ userData.profile_picture !== null ? userData.profile_picture : 'https://cdn.discordapp.com/attachments/912411399458795593/921097628446498887/36..04.jpg' }
            />
            <div className="md:ml-8">
              <p className="text-xl md:text-4xl my-3 font-inter font-medium">
                {userData.user_name}
              </p>
              <div className="flex items-center text-gray-600 font-inter">
                <AiOutlineMail className="w-4 h-4 mr-2" />
                <p className="text-base">{userData.email_address}</p>
              </div>
              <div className="flex pt-3 mb-2 items-center text-gray-600 font-inter">
                {userData.isVerified ? (
                  <GoVerified className="w-5 h-5 mr-2 text-blue-400" />
                ) : (
                  <GoUnverified className="w-5 h-5 mr-2 text-orange-600" />
                )}
                <p className="text-base">
                  {userData.isVerified ? "Verified" : "Unverified"}
                </p>
              </div>
              <Button className="defBackground mt-2 rounded-lg">
                <IoIosSettings className="w-5 h-5 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
          <UserNav />
          <Switch>
            <ProtectedRoute exact path="/user/profile" component={MyCart} />
            <ProtectedRoute exact path="/user/mycart" component={MyCart} />
            <ProtectedRoute exact path="/user/myorders" component={Orders} />
            <ProtectedRoute exact path="/user/arrivedorders" component={ArrivedOrders} />
            <ProtectedRoute exact path="/user/cancelledorders" component={CancelledOrders} />
            <ProtectedRoute exact path="/user/" component={MyCart} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default AccountProfile;
