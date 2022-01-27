import React, { useEffect, useState } from "react";

import { MdOutlineClose } from "react-icons/md";

import Informative from "../../Components/Modal/Informative";
import FullPageLoader from "../../Components/FullPageLoader";
import HelperLabel from "../../Components/HelperLabel";
import API from "../../Helpers/api";

import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "../../Features/userSlice";
import { openNotifier } from "../../Features/uiSlice";

import { openAlertModal, openInputModal } from "../../Features/uiSlice";

const Orders = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [pendingOrder, setPendingOrders] = useState();

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
      setLoading(true);
      const response = await API.get(`/user/mydetails/${_id}`);
      dispatch(signin(response.data.userData));
      setPendingOrders(userData.pending_orders);
      setLoading(false);
    } catch (error) {
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

  const cancelOrder = async (item) => {
    try {
      await API.post("/user/cancelOrder", {
        _id: userData._id,
        order_object: item,
        order_ID: item.order_ID,
      });

      await loadUserData();
    } catch (err) {
      dispatch(
        openAlertModal({
          component: <Informative />,
          data: {
            description: "Failed",
            solution:
              "Sorry, but the system failed to cancell this order! try again later",
          },
        })
      );
      console.log(err);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <p className="text-2xl text-center font-medium">Your Orders</p>

          <section className="text-gray-600 body-font mx-8">
            <div className="mx-auto md:w-2/6 w-1/2 mt-4">
              <HelperLabel
                isError={false}
                msg={
                  "You can cancel an order if it is not yet approved by admin"
                }
              />
            </div>
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -my-8 ">
                {userData.pending_orders.length === 0 &&
                  userData.in_progress.length === 0 && (
                    <>
                      <div className="w-full">
                        <p className="w-full text-center">You have no orders</p>
                      </div>
                    </>
                  )}
                {userData.pending_orders.map((pendings, idx) => (
                  <div
                    key={idx}
                    className="py-8 px-4 sm:w-full lg:w-1/3 rounded-md relative"
                  >
                    <MdOutlineClose
                      onClick={() => {
                        dispatch(
                          openNotifier({
                            title: "Cancel Order",
                            message: `Are you sure to cancel this order?`,
                            onAccept: () => {
                              cancelOrder(pendings, idx);
                            },
                            acceptBtnText: "Yes",
                            cancelBtnText: "No",
                          })
                        );
                      }}
                      className="absolute right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                    />
                    <div className="h-full flex items-start">
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                          {new Date(pendings.cat).toLocaleString("en-us", {
                            month: "short",
                          })}
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          {new Date(pendings.cat).getDate()}
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-sm title-font font-medium text-teal-500 mb-1">
                          OrderID : {pendings.order_ID}
                        </h2>
                        <h1 className="mt-4 title-font text-xl text-gray-900 mb-3">
                          Order Cost :{" "}
                          <span className=" font-medium">
                            {" "}
                            ₱{" "}
                            {pendings.total_cost
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          </span>
                        </h1>
                        <div className="inline-flex items-center">
                          <span className="flex-grow flex flex-col">
                            <p className="text-lg text-gray-600">
                              Chosen Courier{" "}
                              <span className="text-teal-700 font-medium">
                                {pendings.courier}
                              </span>
                              .
                            </p>
                          </span>
                        </div>
                        <div className="flex">
                          <p className="rounded-lg filter drop-shadow-md bg-yellow-200 mt-2 px-5 py-2 text-xs">
                            Waiting for admin approval
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {userData.in_progress.map((in_progress, idx) => (
                  <div
                    key={idx}
                    className="py-8 px-4 sm:w-full lg:w-1/3 relative"
                  >
                    <MdOutlineClose
                      onClick={() => {
                        dispatch(
                          openAlertModal({
                            component: <Informative />,
                            data: {
                              description: "Failed to cancel order",
                              solution:
                                "This order is already accepted/processed/On The Way, you cannot cancel this anymore",
                            },
                          })
                        );
                      }}
                      className="filter blur-xs absolute right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                    />
                    <div className="h-full flex items-start">
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                          {new Date(in_progress.cat).toLocaleString("en-us", {
                            month: "short",
                          })}
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          {new Date(in_progress.cat).getDate()}
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-sm title-font font-medium text-teal-500 mb-1">
                          OrderID : {in_progress.order_ID}
                        </h2>
                        <h1 className="mt-4 title-font text-xl text-gray-900 mb-3">
                          Order Cost :{" "}
                          <span className=" font-medium">
                            {" "}
                            ₱{" "}
                            {in_progress.total_cost
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          </span>
                        </h1>
                        <div className="inline-flex items-center">
                          <span className="flex-grow flex flex-col">
                            <p className="text-lg text-gray-600">
                              Chosen Courier{" "}
                              <span className="text-teal-700 font-medium">
                                {in_progress.courier}
                              </span>
                              .
                            </p>
                          </span>
                        </div>
                        <div className="flex">
                          <p className="rounded-lg filter drop-shadow-md bg-blue-200 mt-2 px-5 py-2 text-xs">
                            {in_progress.order_status === 0
                              ? "Processed"
                              : "On The Way"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Orders;
