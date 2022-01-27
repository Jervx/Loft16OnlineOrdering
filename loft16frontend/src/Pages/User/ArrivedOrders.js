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

  useEffect(() => {
    loadUserData();
  }, []);

  const removeCompleted = async (item) => {
    try {
      const deleteRecord = await API.post("/user/removeCompleted", {
        _id: userData._id,
        completed: item,
      });
      await loadUserData();
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

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <p className="text-2xl text-center font-medium">Arrived Orders</p>
          <section className="text-gray-600 body-font mx-8">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -mx-4 -my-8 ">
                {userData.past_transactions.length === 0 &&
                  userData.past_transactions.length === 0 && (
                    <>
                      <div className="w-full">
                        <p className="w-full text-center">
                          You have no completed/arrived orders
                        </p>
                      </div>
                    </>
                  )}
                {userData.past_transactions.map((completed, idx) => (
                  <div key={idx} className="py-8 px-4 lg:w-1/3 relative ">
                    <div className="h-full flex items-start">
                      <MdOutlineClose
                        onClick={() => {
                          dispatch(
                            openNotifier({
                              title: "Delete Completed/Arrived Record",
                              message: `Are you sure to delete this record?`,
                              onAccept: () => {
                                removeCompleted(completed);
                              },
                              acceptBtnText: "Yes",
                              cancelBtnText: "No",
                            })
                          );
                        }}
                        className="absolute right-5 cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                      />
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                          {new Date(completed.cat).toLocaleString("en-us", {
                            month: "short",
                          })}
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          {new Date(completed.cat).getDate()}
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-sm title-font font-medium text-teal-500 mb-1">
                          OrderID : {completed.order_ID}
                        </h2>
                        <h1 className="mt-4 title-font text-xl text-gray-900 mb-3">
                          Order Cost :
                          <span className=" font-medium">
                            {" "}
                            ₱{" "}
                            {completed.total_cost
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          </span>
                        </h1>
                        <div className="inline-flex items-center">
                          <span className="flex-grow flex flex-col">
                            <p className="text-lg text-gray-600">
                              Chosen Courier{" "}
                              <span className="text-teal-700 font-medium">
                                {completed.courier}
                              </span>
                              .
                            </p>
                          </span>
                        </div>
                        <div className="w-full rounded-lg filter drop-shadow-md bg-teal-200 mt-2">
                          <p className="px-5 text-xs py-2">
                            This order was delivered on
                            <span className="font-medium">
                              {" "}
                              {new Date(
                                completed.completed_date
                              ).toLocaleString("en-us", {
                                month: "long",
                              }) +
                                " " +
                                new Date(completed.completed_date).getDate() +
                                ", " +
                                new Date(
                                  completed.completed_date
                                ).getFullYear()}
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
