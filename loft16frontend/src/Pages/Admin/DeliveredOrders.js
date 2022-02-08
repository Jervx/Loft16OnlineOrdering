import React, { useState, useEffect } from "react";
import { FaBullseye } from "react-icons/fa";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";
import API from "../../Helpers/api";

import { Avatar, Button, Dropdown, DropdownItem, Input } from "@windmill/react-ui";

import { RiTruckFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GiHandTruck, GiAirplaneArrival } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";

import { numberWithCommas, parseDate } from "../../Helpers/uitils";

const DeliveredOrders = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const [loadingData, setLoadingData] = useState(true);
  const [unmounted, setUnmounted] = useState(false);

  const [delivered, setDelivered] = useState([]);

  const [chosenIdx, setChosenIdx] = useState(-1);
  const [specificUpdate, setSpecificUpdate] = useState(-1);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/insights");
        if(unmounted) return
      } catch (e) {}
    }
  };

  const performSearch = async () => {
    try {
      if (search.length === 0) {

        setLoadingData(true);
        loadSomething();
        setSearching(false);
        return;
      }

      setLoadingData(true);
      setSearching(true);
      
      const response = await API.post("/admin/searchInProgress", {
        order_ID : search,
      });

      setLoadingData(false);
    } catch (e) {
      
    }
  };

  useEffect(() => {
    loadSomething();
    return ()=>{
        setUnmounted(true)
    }
  }, [adminData]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      {!adminData ? (
        <ProtectedLoader />
      ) : (
        <div>
          <h1 className="text-teal-900 mx-9 mt-14 font-medium text-3xl">
            Delivered Orders
          </h1>
          <section className="body-font">
            <div className=" pb-24 pt-2 md:pt-0 md:pr-0 md:pl-0">
              
                <div
                  className={`my-8 px-4 flex w-full flex-col flex-wrap sm:flex-row`}
                >
                  
                    <div
                      className={`w-full md:w-1/2 xl:w-1/3 ${
                        -1 === 1 && "filter blur-sm animate-pulse"
                      } `}
                    >
                      <div className="mb-4 mx-1">
                        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full border border-green-400">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <Avatar
                                className="rounded-xl relative p-2 bg-blue-100"
                                size="large"
                                src={''}
                              />
                              <div className="flex flex-col">
                                <span className="font-bold text-md text-black dark:text-white ml-2">
                                  <span className="font-normal">From </span>
                                  {'jerb'}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-white ml-2">
                                  {'jerb'}
                                </span>
                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-white ml-2">
                                  <span className="font-medium">via</span>
                                  <RiTruckFill className="text-teal-900 mx-2" />
                                  <span className="font-medium">
                                    {" "}
                                    {'jerb'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="relative flex space-x-2">
                              <button
                                disabled={true}
                                onClick={() => {
                                  
                                }}
                                className="relative flex  p-1 h-7 w-7 hover:text-teal-800 text-teal-500 "
                              >
                                <BsThreeDotsVertical className="h-full w-full " />
                              </button>
                              <Dropdown
                                className="absolute filter shadow-xl border p-5"
                                align="right"
                                isOpen={false}
                                onClose={() => {

                                }}
                              >
                                <div>
                                  <p className="text-left font-medium text-lg mb-3">
                                    Update Status
                                  </p>
                                </div>
                                <DropdownItem
                                  onClick={() =>
                                    {}
                                  }
                                  className="dark:text-gray-200 text-gray-500 hover:text-purple-600"
                                >
                                  <GiHandTruck
                                    className="w-5 h-5 mr-5"
                                    aria-hidden="true"
                                  />
                                  <span className=" font-normal">
                                    Delete Record
                                  </span>
                                </DropdownItem>
                                
                              </Dropdown>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4 space-x-12">
                            <span
                              className="px-2 filter shadow-md py-1 flex text-white items-center font-semibold text-xs rounded-md bg-green-500"
                            >
                              Delivered
                            </span>

                            <div className="space-y-2">
                            <span className="uppercase px-2 py-1 flex w-36 items-center text-xs rounded-md font-semibold text-yellow-400 bg-teal-100">
                              Placed :{" "}
                              {parseDate(new Date())}
                            </span>
                            <span className="uppercase px-2 py-1 flex w-36 items-center text-xs rounded-md font-semibold text-green-500 bg-teal-100">
                              Finish :{" "}
                              {parseDate(new Date())}
                            </span>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div className="w-full h-full text-center text-xs text-white bg-teal-600 rounded"></div>
                          </div>
                          <div className="flex items-center justify-between my-4 space-x-4">
                            <span className="px-2 py-1 flex items-center text-md rounded-md text-teal-500 bg-green-50">
                              <span className="mr-2 text-teal-600 dark:text-white font-bold">
                                {'jerb'}
                              </span>
                              Items
                            </span>
                            <span className="px-2 py-1 flex items-center text-md rounded-md text-blue-500 bg-blue-100">
                              <p className=" text-teal-700">
                                ₱{" "}
                                <span className="">
                                  {numberWithCommas(12.50)}
                                </span>
                              </p>
                            </span>
                          </div>
                          <p className="my-2 text-xs text-gray-600">Order ID : <span className="font-medium text-gray-900">{'2gasg23'}</span></p>

                          {/* <Button
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
                          </Button> */}
                        </div>
                      </div>
                    </div>
                </div>
              <div>
                {!loadingData && delivered.length === 0 && (
                  <p className="my-4 text-xs text-red-400 text-center">
                    { !searching ? "There's no pending orders" : "No matching order found" }
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;
