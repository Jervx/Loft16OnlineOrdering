import React, { useEffect, useState } from "react";

import { MdOutlineClose } from "react-icons/md";

import Informative from "../../Components/Modal/Informative";
import FullPageLoader from "../../Components/FullPageLoader";
import API from "../../Helpers/api";

import { useSelector, useDispatch } from "react-redux";
import { signin, signout } from "../../Features/userSlice";
import { openNotifier } from "../../Features/uiSlice";

import { openAlertModal, openInputModal } from "../../Features/uiSlice";

const ArrivedOrders = () => {
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

  const removeCancelled = async (item) => {
    try {
      const deleteRecord = await API.post("/user/removeCancelled", {
        _id: userData._id,
        cancelled: item,
      });
      await loadUserData()
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

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <p className="text-2xl text-center font-medium">Cancelled Orders</p>
          <section className="text-gray-600 body-font mx-8">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -my-8 ">
                {userData.cancelled.length === 0 && (
                  <>
                    <div className="w-full">
                      <p className="w-full text-center">
                        You have no cancelled orders
                      </p>
                    </div>
                  </>
                )}
                {userData.cancelled.map((cancelled, idx) => (
                  <div
                    key={idx}
                    className="py-8 px-4 sm:w-full lg:w-1/3 rounded-md relative"
                  >
                    <MdOutlineClose
                      onClick={() => {
                        dispatch(
                          openNotifier({
                            title: "Delete Cancelled Record",
                            message: `Are you sure to delete this record?`,
                            onAccept: () => {
                              removeCancelled(cancelled);
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
                          {new Date(cancelled.cat).toLocaleString("en-us", {
                            month: "short",
                          })}
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          {new Date(cancelled.cat).getDate()}
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-sm title-font font-medium text-teal-500 mb-1">
                          OrderID : {cancelled.order_ID}
                        </h2>
                        <h1 className="mt-4 title-font text-xl text-gray-900 mb-3">
                          Order Cost :{" "}
                          <span className=" font-medium">
                            {" "}
                            ₱{" "}
                            {cancelled.total_cost
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          </span>
                        </h1>
                        <div className="inline-flex items-center">
                          <span className="flex-grow flex flex-col">
                            <p className="text-lg text-gray-600">
                              Chosen Courier{" "}
                              <span className="text-teal-700 font-medium">
                                {cancelled.courier}
                              </span>
                              .
                            </p>
                          </span>
                        </div>
                        <div className="rounded-lg filter drop-shadow-md bg-red-100 mt-2 px-1 py-2 text-xs">
                          <p className="px-5 text-xs py-2">
                            This order was cancelled on
                            <span className="font-medium">
                              {" "}
                              {new Date(cancelled.dat).toLocaleString("en-us", {
                                month: "long",
                              }) +
                                " " +
                                new Date(cancelled.dat).getDate() +
                                ", " +
                                new Date(cancelled.dat).getFullYear()}
                            </span>
                          </p>
                          <p className="px-5 text-xs py-2">
                            Reason :{" "}
                            <span className="font-medium">
                              {cancelled.reason}
                            </span>
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

export default ArrivedOrders;
