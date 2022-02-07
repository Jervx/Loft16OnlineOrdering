import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openInputModal } from "../../Features/uiSlice"


import ProtectedLoader from "../../Components/ProtectedLoader";
import ViewOrderDetails from "../../Components/ModalComponent/Admin/ViewOrderDetails"

import API from "../../Helpers/api";

import { Avatar, Button, Dropdown, DropdownItem } from "@windmill/react-ui";

import { RiTruckFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiHandTruck, GiAirplaneArrival } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";

import { numberWithCommas, parseDate } from "../../Helpers/uitils";

const OrderInProgress = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const dispatch = useDispatch()

  const [loadingData, setLoadingData] = useState(true);
  const [unmounted, setUnmounted] = useState(false);

  const [inProgress, setInProgress] = useState([]);

  const [chosenIdx, setChosenIdx] = useState(-1);
  const [specificUpdate, setSpecificUpdate] = useState(-1);

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/inProgress");
        if (unmounted) return;
        setInProgress(response.data.inProgress);
        setLoadingData(false);
        setSpecificUpdate(-1);
        console.log("LOADING SOMETHINg");
      } catch (e) {}
    }
  };

  const updateInProgress = async (entry, mode, status, idx) => {
    try {
      if (entry.order_detailed_version.order_status === status) {
        setChosenIdx(-1);
        return;
      }

      setSpecificUpdate(idx);
      setChosenIdx(-1);
      const response = await API.post("/admin/updateInProgress", {
        _id: adminData._id,
        mode,
        status,
        entry,
      });
      console.log("Done Updating", response.data);
      loadSomething();
    } catch (e) {}
  };

  useEffect(() => {
    loadSomething();
    return () => {
      setUnmounted(true);
    };
  }, [adminData]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      {!adminData ? (
        <ProtectedLoader />
      ) : (
        <div>
          <h1 className="text-teal-900 mx-9 mt-14 font-medium text-3xl">
            Orders In Progress
          </h1>

          <hr className="my-10 mx-8 border-gray-200 dark:border-gray-700" />
          <section className="body-font">
            <div className=" pb-24 pt-2 md:pt-0 md:pr-0 md:pl-0">
              {loadingData && <ProtectedLoader />}
              {!loadingData && (
                <div
                  className={`my-8 px-4 flex w-full flex-col flex-wrap sm:flex-row`}
                >
                  {inProgress.map((order, idx) => (
                    <div
                      key={idx}
                      className={`w-full md:w-1/2 xl:w-1/3 ${
                        specificUpdate === idx && "filter blur-sm animate-pulse"
                      } `}
                    >
                      <div className="mb-4 mx-1">
                        <div className={`shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full ${order.order_detailed_version.order_status === 1 && 'border border-orange-400'}`}>
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <Avatar
                                className="rounded-xl relative p-2 bg-blue-100"
                                size="large"
                                src={order.user_profile.profile_picture}
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-md text-black dark:text-white ml-2">
                                  <span className="font-normal">From </span>
                                  {order.user_profile.user_name}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-white ml-2">
                                  {order.user_email}
                                </span>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-white ml-2">
                                  <span className="font-medium">via</span>
                                  <RiTruckFill className="text-teal-900 mx-2" />
                                  <span className="font-medium">
                                    {" "}
                                    {order.courier.courier_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="relative flex space-x-2">
                              <button
                                disabled={specificUpdate === idx}
                                onClick={() => {
                                  setChosenIdx(idx);
                                }}
                                className="relative flex  p-1 h-7 w-7 hover:text-teal-800 text-teal-500 "
                              >
                                <BsThreeDotsVertical className="h-full w-full " />
                              </button>
                              <Dropdown
                                className="absolute filter shadow-xl border p-5"
                                align="right"
                                isOpen={chosenIdx === idx}
                                onClose={() => {
                                  setChosenIdx(-1);
                                }}
                              >
                                <div>
                                  <p className="text-left font-medium text-lg mb-3">
                                    Update Status
                                  </p>
                                </div>
                                <DropdownItem
                                  onClick={() =>
                                    updateInProgress(order, 1, 1, idx)
                                  }
                                  className="dark:text-gray-200 text-gray-500 hover:text-purple-600"
                                >
                                  <GiHandTruck
                                    className="w-5 h-5 mr-5"
                                    aria-hidden="true"
                                  />
                                  <span className=" font-normal">
                                    set as Processing
                                  </span>
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    updateInProgress(order, 1, 2, idx)
                                  }
                                  className="dark:text-gray-200 text-gray-500 hover:text-green-500"
                                >
                                  <FaShippingFast
                                    className="w-5 h-5 mr-5"
                                    aria-hidden="true"
                                  />
                                  <span className=" font-normal">
                                    set as Shipped
                                  </span>
                                </DropdownItem>
                                <DropdownItem className="p-5 bg-teal-500 text-white ">
                                  <GiAirplaneArrival
                                    className="w-5 h-5 mr-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-normal py-2">
                                    Mark as Delivered
                                  </span>
                                </DropdownItem>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4 space-x-12">
                            <span
                              className={`px-2 filter shadow-md py-1 flex items-center font-semibold text-xs rounded-md ${
                                order.order_detailed_version.order_status === 1
                                  ? "bg-orange-400 text-gray-50"
                                  : "bg-teal-600 text-white"
                              }`}
                            >
                              Status :
                              {order.order_detailed_version.order_status === 1
                                ? " Processing"
                                : " Shipped"}
                            </span>

                            <span className="uppercase px-2 py-1 flex w-36 items-center text-xs rounded-md font-semibold text-yellow-400 bg-teal-100">
                              Placed :{" "}
                              {parseDate(order.order_detailed_version.cat)}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div className={`w-full h-full text-center text-xs text-white ${
                                order.order_detailed_version.order_status === 1
                                  ? "bg-orange-400 text-gray-50"
                                  : "bg-teal-600 text-white"
                              } rounded-full`}></div>
                          </div>
                          <div className="flex items-center justify-between my-4 space-x-4">
                            <span className="px-2 py-1 flex items-center text-md rounded-md text-teal-500 bg-green-50">
                              <span className="mr-2 text-teal-600 dark:text-white font-bold">
                                {order.n_items}
                              </span>
                              Items
                            </span>
                            <span className="px-2 py-1 flex items-center text-md rounded-md text-blue-500 bg-blue-100">
                              <p className=" text-teal-700">
                                ₱{" "}
                                <span className="">
                                  {numberWithCommas(order.total_cost)}
                                </span>
                              </p>
                            </span>
                          </div>
                          <p className="my-2 text-xs text-gray-600">Order ID : <span className="font-medium text-gray-900">{order.order_ID}</span></p>

                          <Button
                            onClick={() => {
                              dispatch(
                                openInputModal({
                                  title: "Checkout Details",
                                  component: (
                                    <ViewOrderDetails
                                        order={order}
                                    />
                                  ),
                                  onAccept: () => {},
                                  acceptBtnText: "Place Order",
                                  cancelBtnText: "Cancel",
                                })
                              );
                            }}
                            className="bg-teal-400 text-white w-full rounded-md"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default OrderInProgress;
