import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";
import API from "../../Helpers/api";
import { nShorter } from "../../Helpers/uitils";

import { Card, CardBody, Button } from "@windmill/react-ui";

import { MdModeEditOutline, MdEmail } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";

import { useDispatch } from "react-redux";
import {
  openInputModal,
  openNotifier,
  closeInputModal,
  openAlertModal,
} from "../../Features/uiSlice";

import CourierCreator from "../../Components/ModalComponent/Admin/CourierCreator";
import HelperLabel from "../../Components/HelperLabel";

const Couriers = () => {
  const adminData = useSelector((state) => state.admin.adminData);

  const dispatch = useDispatch();

  const [loadingData, setLoadingData] = useState(true);
  const [couriers, setCouriers] = useState([
    {
      courier_name: "Lalamove",
      courier_email: "lalamovePH@gmail.com",
      courier_contact: "09991612423",
      total_delivered_orders: 0,
    },
    {
      courier_name: "Toktok",
      courier_email: "toktokPH@gmail.com",
      courier_contact: "09991612423",
      total_delivered_orders: 0,
    },
    {
      courier_name: "Mang Kanor",
      courier_email: "magncanor@email.com",
      courier_contact: "0999151269",
      total_delivered_orders: 0,
    },
    {
      courier_name: "MangKanor2",
      courier_email: "kanortube2@gmail.com",
      courier_contact: "0999125125",
      total_delivered_orders: 0,
    },
  ]);

  const [unmounted, setUnmounted] = useState(false)

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/couriers");
        if(unmounted) return
        setCouriers(response.data.Couriers);
        setLoadingData(false);
      } catch (e) {}
    }
  };

  const deleteAddress = async (_id, gcourier, mode) => {
    try {
      const update = await API.post("/admin/updateCourier", {
        _id,
        oldCourier: gcourier,
        mode,
      });
      dispatch(closeInputModal());
      loadSomething();
    } catch (e) {
      if (e.response) {
        //request was made but theres a response status code
        dispatch(
          openAlertModal({
            component: <></>,
            data: e.response.data,
          })
        );
      } else if (e.request) {
        // The request was made but no response was received
        dispatch(
          openAlertModal({
            component: <></>,
            data: {
              err: 500,
              description: "Sorry, but we can't reach the server",
              solution: "Please try again later",
            },
          })
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", e.message);
      }
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
            Couriers
          </h1>
          <div className="mx-8 my-2">
            <HelperLabel
              bg={"bg-gray-100"}
              txtbg={"text-teal-700"}
              isError={false}
              msg={
                "This will be the store supported couriers that will help user to freely choose couriers he/she trust"
              }
            />
          </div>
          <Button
            className="rounded-md mx-9 my-8"
            disabled={loadingData}
            onClick={() => {
              dispatch(
                openInputModal({
                  title: "",
                  component: (
                    <CourierCreator
                      mode={0}
                      onSave={loadSomething}
                      _id={adminData._id}
                    />
                  ),
                  onAccept: () => {},
                  acceptBtnText: "Save",
                  cancelBtnText: "Cancel",
                })
              );
            }}
          >
            New Courier
          </Button>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-14 mx-auto">
              <div
                className={`flex flex-wrap w-full -mx-1 -my-8 ${
                  loadingData && "filter blur-sm animate-pulse"
                }`}
              >
                {couriers.map((courier, idx) => (
                  <div
                  key={idx}
                    onClick={() => {
                      dispatch(
                        openInputModal({
                          title: "",
                          component: (
                            <CourierCreator
                              mode={1}
                              gcourier={courier}
                              onSave={loadSomething}
                              _id={adminData._id}
                            />
                          ),
                          onAccept: () => {},
                          acceptBtnText: "Save",
                          cancelBtnText: "Cancel",
                        })
                      );
                    }}
                    className="relative cursor-pointer transform-gpu shadow-lg hover:scale-105 transition duration-100 text-teal-500 bg-white rounded-lg xl:w-1/4 md:w-1/2 my-2 w-full px-8 py-6 border-gray-200 border-opacity-60"
                  >
                    <div className="absolute flex space-x-1 right-4">
                      <RiCloseLine
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            openNotifier({
                              title: "Remove Courier?",
                              message: `You are about to remove ${courier.courier_name} from couriers`,
                              onAccept: () => {
                                deleteAddress(adminData.id, courier, -1);
                              },
                              acceptBtnText: "Yes, Remove It",
                              cancelBtnText: "Cancel",
                            })
                          );
                        }}
                        className="cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                      />
                    </div>
                    <h2
                      className={`text-lg mb-4 sm:text-xl text-gray-500 font-medium title-font ${
                        loadingData && "bg-teal-500 rounded-md"
                      }`}
                    >
                      {courier.courier_name}
                    </h2>
                    <div className="flex space-x-4 my-2 text-sm">
                      <FaTruckLoading />
                      <p
                        className={`${
                          loadingData && "w-1/4 h-4 bg-teal-500 rounded-md"
                        }`}
                      >
                        <span className="font-medium">
                          {nShorter(courier.total_delivered_orders, 1)}{" "}
                        </span>{" "}
                        Delivered Orders
                      </p>
                    </div>
                    <div className="flex space-x-4 my-2 text-sm">
                      <IoMdCall />
                      <p
                        className={`${
                          loadingData && "w-1/2 h-4 bg-teal-500 rounded-md"
                        }`}
                      >
                        {courier.courier_contact}
                      </p>
                    </div>
                    <div className="flex space-x-4 my-2 text-sm">
                      <MdEmail />
                      <p
                        className={`${
                          loadingData && "w-full h-4 bg-teal-500 rounded-md"
                        }`}
                      >
                        {courier.courier_email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {!loadingData && couriers.length === 0 && (
                  <p className="my-4 text-xs text-red-400 text-center">
                    There's no couriers
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* {!loadingData &&
            couriers.map((courier, idx) => (
              <Card className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <p className="text-teal-700 text-xl">{courier.courier_name}</p>
              </Card>
            ))} */}
        </div>
      )}
    </div>
  );
};

export default Couriers;
