import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";
import { nShorter } from "../../Helpers/uitils";
import API from "../../Helpers/api";

const Couriers = () => {
    const adminData = useSelector((state) => state.admin.adminData);

  const [topProducts, setTopProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/insights");
        
      } catch (e) {}
    }
  };

  useEffect(() => {
    loadSomething();
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
          <section className=" body-font">
            
          </section>
        </div>
      )}
    </div>
  );
};

export default Couriers;
