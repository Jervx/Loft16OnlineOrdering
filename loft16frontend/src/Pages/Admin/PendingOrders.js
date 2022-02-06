import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openInputModal, closeInputModal } from "../../Features/uiSlice";

import ProtectedLoader from "../../Components/ProtectedLoader";
import API from "../../Helpers/api";
import { numberWithCommas } from "../../Helpers/uitils";

import { RiTruckFill } from "react-icons/ri";

import { Avatar, Button } from "@windmill/react-ui";
import HelperLabel from "../../Components/HelperLabel";
import CancelOrderForm from "../../Components/ModalComponent/Admin/CancelOrderForm";

import { BsCheckCircleFill } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";

const PendingOrders = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const [loadingData, setLoadingData] = useState(true);
  const [unmounted, setUnmounted] = useState(false);
  const [pendings, setPendings] = useState([]);

  const [chosenIdx, setChosenIdx] = useState(-1);
  const [specificUpdate, setSpecificUpdate] = useState(-1);

  const dispatch = useDispatch();

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/pendings");
        if (unmounted) return;
        setPendings(response.data.pendings);
        setLoadingData(false);
        setSpecificUpdate(-1);
      } catch (e) {}
    }
  };

  const updatePendingOrder = async (entry, mode, reason, idx) => {
    try {
      setSpecificUpdate(idx);
      setChosenIdx(-1);
      dispatch(closeInputModal());
      const response = await API.post("/admin/updatePending", {
        _id: adminData._id,
        mode,
        entry,
        reason,
      });
      if (unmounted) return;
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
            Pending Orders
          </h1>
          <div className="mx-8 my-4">
            <HelperLabel
              bg={"bg-gray-100"}
              txtbg={"text-teal-700"}
              isError={false}
              msg={
                "When user placed an order, it needed your final review & approval of the products being requested"
              }
            />
            <HelperLabel
              bg={"bg-gray-100"}
              txtbg={"text-teal-700"}
              isError={false}
              msg={
                "You can Accept, or Cancel an order. If you cancel an order, you must provide a reason for the cancellation & it will automatically notify the user"
              }
            />
          </div>
          <hr className="my-10 mx-8 border-gray-200 dark:border-gray-700" />
          <section className="body-font">
            <div className=" pb-24 pt-2 md:pt-0 md:pr-0 md:pl-0">
              {loadingData && <ProtectedLoader />}
              {!loadingData && (
                <div
                  className={`my-8 px-4 flex w-full flex-col flex-wrap sm:flex-row `}
                >
                  {pendings.map((order, idx) => (
                    <div
                      key={idx}
                      className={`w-full md:w-1/2 xl:w-1/3 ${
                        specificUpdate === idx && "filter blur-sm animate-pulse"
                      }`}
                    >
                      <div className="mb-4 mx-1">
                        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
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
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updatePendingOrder(order, 0, "", idx)
                                }
                                className="relative border p-1 h-8 w-8 hover:text-teal-500 text-teal-400 border-teal-200 rounded-full"
                              >
                                <BsCheckCircleFill className="h-full w-full " />
                              </button>
                              <button
                                className="text-gray-200 "
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(
                                    openInputModal({
                                      title: "Checkout Details",
                                      component: (
                                        <CancelOrderForm
                                          entry={order}
                                          record_index={idx}
                                          onRemove={updatePendingOrder}
                                        />
                                      ),
                                      onAccept: () => {},
                                      acceptBtnText: "Place Order",
                                      cancelBtnText: "Cancel",
                                    })
                                  );
                                }}
                              >
                                <TiCancel className="text-orange-200 hover:text-orange-400 h-8 w-8" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-4 space-x-12">
                            <span className="px-2 py-1 flex items-center font-semibold text-xs rounded-md text-gray-500 bg-gray-200">
                              Pending Order
                            </span>

                            <span className="px-2 py-1 flex w-36 items-center text-xs rounded-md font-semibold text-yellow-400 bg-teal-100">
                              PLACED ON : 18 JUN
                            </span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div className="w-full h-full text-center text-xs text-white bg-purple-400 rounded-full"></div>
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

                          <Button className="bg-teal-400 text-white w-full rounded-md">
                            View Order Details
                          </Button>
                          {/* <div className="flex items-center justify-start my-4 space-x-4">
                          <span className="px-4 py-2 flex items-center text-xs rounded-md font-semibold text-green-500 bg-green-50">
                            Accept
                          </span>
                          <span className="px-4 py-2 flex items-center text-xs rounded-md text-blue-500 font-semibold bg-blue-100">
                            Decline
                          </span>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div>
                {!loadingData && pendings.length === 0 && (
                  <p className="my-4 text-xs text-red-400 text-center">
                    There's no pending orders
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

export default PendingOrders;
