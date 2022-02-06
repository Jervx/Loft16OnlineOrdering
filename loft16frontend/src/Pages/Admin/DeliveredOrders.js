import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";
import API from "../../Helpers/api";

const DeliveredOrders = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const [loadingData, setLoadingData] = useState(true);
  const [unmounted, setUnmounted] = useState(false)

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/insights");
        if(unmounted) return
      } catch (e) {}
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
          <section className=" body-font"></section>
        </div>
      )}
    </div>
  );
};

export default DeliveredOrders;
