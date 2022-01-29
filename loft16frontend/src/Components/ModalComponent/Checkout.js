import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { ImTruck } from "react-icons/im";
import { FcInfo } from "react-icons/fc";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Label, Select } from "@windmill/react-ui";

import HelperLabel from "../HelperLabel";

import API from "../../Helpers/api";
import { closeInputModal } from "../../Features/uiSlice";
import { setCheckOut } from "../../Features/appSlice";
import { openAlertModal, openInputModal } from "../../Features/uiSlice";
import Informative from "../../Components/Modal/Informative";
import { signin, signout } from "../../Features/userSlice";

const Checkout = () => {
  const inputModalState = useSelector((state) => state.ui.inputModal);
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const userCheckout = useSelector((state) => state.app.appState.userCheckout);

  const userAddresses = useSelector(
    (state) => state.user.userData.shipping_address
  );

  const [couriers, setCouriers] = useState([]);

  const [chosenAddress, setChosenAddress] = useState({});
  const [chosenCourier, setChosenCourier] = useState({});

  const loadUserData = async () => {
    let _id = userData._id;
    if (!_id) {
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "Look's Like You Are Not Logged In",
            solution: "Your access has expired, please sign in again!",
          },
        })
      );
      dispatch(signout());
      return;
    }
    try {
      const response = await API.get(`/user/mydetails/${_id}`);
      const data = await API.get("/browse/getCouriers");
      setCouriers(data.data.couriers);

      dispatch(signin(response.data.userData));
      dispatch(
        setCheckOut({
          chosenCourier: data.data.couriers[0],
          chosenAddress: userData.shipping_address.addresses[userData.shipping_address.default_address],
        })
      );
    } catch (error) {   }
  };

  const changeAddress = (idx) => {
    setChosenAddress(userData.shipping_address.addresses[idx]);
    dispatch(
      setCheckOut({
        ...userCheckout,
        chosenAddress: userData.shipping_address.addresses[idx],
      })
    );
  };

  const placeOrder = async () => {
    try {
      if (userData.mobile_numbers.length === 0) {
        dispatch(
          openAlertModal({
            component: <Informative />,
            data: {
              description: "Sorry",
              solution:
                "We found that you have not provided any contact number yet, please provide atleast 1 mobile number so that the courier can contact you during shipment of your order",
            },
          })
        );
        return;
      }

      //  logic of placing order
      const placed = await API.post("/user/placeOrder", {
        _id: userData._id,
        order: {
          user_ID: userData._id,
          user_mobile: userData.mobile_numbers,
          n_items: userData.cart.total_items,
          total_cost: userData.cart.total_cost,
          payment_mode: "COD",
          courier: userCheckout.chosenCourier,
          items: userData.cart.items,
          address: userCheckout.chosenAddress,
        },
      });

      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "Success",
            solution:
              "Your order has been sent to store admin, please wait for an email for order approval",
          },
        })
      );
      loadUserData();
    } catch (err) {
      console.log(err);
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "Failed",
            solution: err.response.data.solution
          },
        })
      );
    }
  };

  const changeCourier = (idx) => {
    setChosenCourier(couriers[idx]);
    dispatch(
      setCheckOut({
        ...userCheckout,
        chosenCourier: couriers[idx],
      })
    );
  };

 

  useEffect(() => {
    
    loadUserData();
  }, []);

  return (
    <div className="mx-2">
      <div>
        <div className="flex-grow">
          <h2 className="defText-Col-2 text-3xl title-font  mb-1">
            {inputModalState.title}
          </h2>
          <p className="text-xs leading-relaxed text-blue-400">
            please check the details below before confirming
          </p>
        </div>
        <div className="flex sm:justify-center md:justify-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center my-6  ">
              <h2 className="text-xl font-medium mb-1">Courier Options</h2>
              <ImTruck className="w-6 h-6 ml-4" />
            </div>
            <div className="w-1/2">
              <Select
                onChange={(e) => {
                  changeCourier(Number.parseInt(e.target.value));
                }}
                className="mt-1"
                disabled={couriers.length === 0}
              >
                {couriers.map((item, idx) => (
                  <option value={idx} key={idx}>
                    {item.courier_name}
                  </option>
                ))}
                {couriers.length === 0 && <option>No Courier Available</option>}
              </Select>
            </div>
          </div>
          {/*
        </div>
        <div className="mt-5">
          <p className="text-center text-gray-400 leading-relaxed text-base">
            Didn't receive a code?
          </p>
          <p className="text-center cursor-pointer text-blue-500 text-base">
            Resend
          </p>
        </div> */}
        </div>

        <div className="flex  w-full items-center mt-2">
          <h2 className="text-xl font-medium mb-1">Shipping Address</h2>
          <div className="ml-4 flex items-center bg-blue-100 rounded-md px-4 py-2">
            <FcInfo />
            <p className="ml-2 text-xs w-full text-blue-600">
              You can add new address at profile settings
            </p>
          </div>
        </div>

        <a className=" text-xs text-blue-500 " href="/account">
          Create New Address
        </a>
        <div className="flex my-4 w-full items-center">
          <FaMapMarkerAlt className="w-6 h-6 text-teal-500" />
          <div className="ml-4 w-full">
            <Select
              className="mt-1"
              onChange={(e) => {
                changeAddress(Number.parseInt(e.target.value));
              }}
              disabled={userAddresses.default_address === -1}
            >
              {userAddresses.addresses.map((address, idx) => (
                <option value={idx} key={idx}>
                  {address.address}
                </option>
              ))}
              {userAddresses.default_address === -1 && (
                <option>You have no shipping address on your account</option>
              )}
            </Select>
          </div>
        </div>
        <div className="bg-gray-100 rounded-md p-4">
          <p className="text-lg mb-2 font-medium">Total</p>
          <p className="text-xl">
            Php{" "}
            <span className="text-2xl">
              {userData.cart.total_cost
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </p>
        </div>

        <div className="mt-6 mb-2 flex items-center">
          <h2 className="text-xl font-medium mb-1 mr-3">Mode Of Payment</h2>
        </div>
        <HelperLabel isError={false} msg={" For now, we only support COD"} />

        {userData.shipping_address.default_address === -1 && (
          <HelperLabel
            isError={true}
            msg={"Please add 1 shipping address to your account"}
          />
        )}
        {userData.mobile_numbers.length === 0 && (
          <HelperLabel
            isError={true}
            msg={"Please add 1 contact number to your account"}
          />
        )}
        <div className="flex justify-center mt-4">
          <Button
            className={
              "mt-4 rounded-md defBackground hover:bg-green-500" +
              (userData.shipping_address.default_address === -1 ||
              userData.mobile_numbers.length === 0 ||
              couriers.length === 0
                ? " filter blur-xs"
                : "")
            }
            block
            disabled={
              userData.shipping_address.default_address === -1 ||
              userData.mobile_numbers.length === 0 ||
              couriers.length === 0
            }
            onClick={() => {
              placeOrder();
              inputModalState.onAccept();
              dispatch(closeInputModal());
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
