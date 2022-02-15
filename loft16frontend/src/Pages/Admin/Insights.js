import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";
import { nShorter, numberWithCommas } from "../../Helpers/uitils";
import API from "../../Helpers/api";


import {
  Table,
  TableContainer,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  Avatar,
} from "@windmill/react-ui";


import { BsHeartFill } from "react-icons/bs";

const Insights = () => {
  const adminData = useSelector((state) => state.admin.adminData);

  const [topProducts, setTopProducts] = useState([]);
  const [stats, setStats] = useState({
    total_pending_orders: 0,
    total_in_progress: 0,
    total_completed: 0,
    total_products: 0,
    total_available_products: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  const loadInsightsData = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/insights");
        setTopProducts(response.data.topProducts);
        setStats(response.data.stats);
        setLoadingData(false);
      } catch (e) {}
    }
  };

  useEffect(() => {
    loadInsightsData();
  }, [adminData]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      {!adminData ? (
        <ProtectedLoader />
      ) : (
        <div>
          <h1 className="text-teal-900 mx-9 mt-14 font-medium text-3xl">
            Quick Insights
          </h1>
          <section className=" body-font">
            <div className="px-5 py-16 mx-8 mt-8 rounded-lg shadow-xl bg-white">
              <div className={`flex flex-wrap -m-10 text-center`}>
                <div className="p-4 sm:w-1/4 w-1/2 ">
                  <h2
                    className={`title-font font-medium sm:text-4xl text-3xl text-teal-700 ${
                      loadingData && "animate-pulse filter blur-xs"
                    }`}
                  >
                    {!loadingData
                      ? nShorter(stats.total_pending_orders, 1)
                      : "----"}
                  </h2>
                  <p className="leading-relaxed  text-gray-600">
                    Pending Orders
                  </p>
                </div>
                <div className="p-4 sm:w-1/4 w-1/2">
                  <h2
                    className={`title-font font-medium sm:text-4xl text-3xl text-teal-700 ${
                      loadingData && "animate-pulse filter blur-xs"
                    }`}
                  >
                    {!loadingData
                      ? nShorter(stats.total_in_progress, 1)
                      : "----"}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    Order in Progress
                  </p>
                </div>
                <div className="p-4 sm:w-1/4 w-1/2">
                  <h2
                    className={`title-font font-medium sm:text-4xl text-3xl text-teal-700 ${
                      loadingData && "animate-pulse filter blur-xs"
                    }`}
                  >
                    {!loadingData ? nShorter(stats.total_completed, 1) : "----"}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    Delivered Orders
                  </p>
                </div>
                <div className="p-4 sm:w-1/4 w-1/2">
                  <h2
                    className={` title-font font-medium sm:text-4xl text-3xl text-teal-700 ${
                      loadingData && "animate-pulse filter blur-xs"
                    }`}
                  >
                    {!loadingData
                      ? nShorter(stats.total_available_products, 1)
                      : "---"}
                    /{!loadingData ? nShorter(stats.total_products, 1) : "---"}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    Available Products
                  </p>
                </div>
              </div>
            </div>
            <div className="my-9 mx-9">
              <h1 className="text-teal-900 my-8 font-medium text-xl">
                Product Ranking (Top 20)
              </h1>
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell> </TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Sold</TableCell>
                      <TableCell>Earnings</TableCell>
                      <TableCell> Likes </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!loadingData &&
                      topProducts.map((product, idx) => (
                        <TableRow key={idx} className="transition hover:bg-gray-100 duration-400">
                          <TableCell>
                            <Avatar
                              className="border-2 border-teal-600"
                              src={product.Images[0]}
                            />
                          </TableCell>
                          <TableCell className="text-teal-900 ">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <p className="text-gray-500">
                              <span className=" font-medium">
                                {nShorter(product.total_item_sold, 1)}
                              </span>
                            </p>
                          </TableCell>
                          <TableCell>
                          {/* <div className="flex text-orange-500 font-medium items-center h-full">
                            <BsHeartFill className="text-red-400 mr-4" />
                            {nShorter(product.likes, 2)}{" "}
                          </div> */}
                          <p><span className="font-quicksand">Php</span> {numberWithCommas(product.generated_sale)}</p>
                        </TableCell>
                          <TableCell>
                            <div className="flex text-orange-500 font-medium items-center h-full">
                              <BsHeartFill className="text-red-400 mr-4" />
                              {nShorter(product.likes, 2)}{" "}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                    {loadingData && (
                      <TableRow className="filter blur-sm">
                        <TableCell>
                          <Avatar className="border-2 border-teal-600" />
                        </TableCell>
                        <TableCell className="text-teal-900 ">000k</TableCell>
                        <TableCell>
                          <p className="text-gray-500">
                            <span className=" font-medium">000k</span>
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-teal-500">000k</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex text-orange-500 font-medium justify-between w-4/12 items-center h-full">
                            000k <BsHeartFill className="text-red-400 ml-4" />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
                { !loadingData && topProducts.length === 0 && (
                  <p className="my-4 text-xs text-red-400 text-center">
                    There's no enough data to compute
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

export default Insights;
