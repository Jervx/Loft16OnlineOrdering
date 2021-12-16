import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Badge, Input } from "@windmill/react-ui";

import { BiSearch } from "react-icons/bi";

import FullPageLoader from "../../Components/ProtectedLoader";

import { useDispatch, useSelector } from "react-redux";
import { setUserSearch, setData, setFilter } from "../../Features/appSlice";

import API from "../../Helpers/api";

/* Icons */
import { BsFillClockFill } from "react-icons/bs";
import {
  AiFillHeart,
  AiFillCloseCircle,
  AiOutlineHeart,
  AiFillCheckCircle,
} from "react-icons/ai";
import { GiWindpump } from "react-icons/gi";

const Products = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app.appState);

  const [loading, setLoading] = useState(true);
  const [toShow, setToShow] = useState(false);
  const [scope, setScope] = useState("all");

  const setFilterScope = (scope) => {
    dispatch(
      setFilter({
        filter: {
          max: 50,
          scope,
          availability: "all",
          sortBy: "all",
        },
      })
    );
    setScope(scope);
    getProducts2(scope);
  };

  const getProducts2 = async (scope) => {
    setLoading(true);
    try {
      let filter = { ...appState.filter, scope: scope };
      const req = await API.post("/browse/getproduct", {
        userSearch: appState.userSearch,
        filter: filter,
      });
      dispatch(setData({ data: req.data.products }));
      setLoading(false);
      setToShow(true);
    } catch (e) {
      console.log("ERR", e);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      let filter = { ...appState.filter };
      filter.scope = scope;
      const req = await API.post("/browse/getproduct", { ...appState, filter });
      dispatch(setData({ data: req.data.products }));
      setLoading(false);
      setToShow(true);
    } catch (e) {
      console.log("ERR", e);
    }
  };

  const onSearchEnter = (event) => {
    if (event.key === "Enter") getProducts();
  };

  const typing = (event) => {
    let txt = event.target.value;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    setToShow(false);
    if (format.test(txt)) return;

    dispatch(setUserSearch({ userSearch: txt }));
    if (event.target.value.length === 0) {
      dispatch(setUserSearch({ userSearchText: "" }));
    }
  };

  const amIFilter = (myscope) =>
    scope.toLowerCase() === myscope.toLowerCase()
      ? "bg-gray-100 text-gray-800 font-medium px-4 py-2 hover:bg-gray-100 rounded-xl mx-2"
      : " px-4 py-2 hover:bg-gray-100 rounded-xl mx-2 ";

  useEffect(() => {
    getProducts();
    console.log("T");
  }, []);

  return (
    <div>
      <div className="flex justify-center my-8">
        <div className="relative text-green-900 h-full md:w-3/12 mr-2  focus-within:text-green-700 ">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <BiSearch className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
            placeholder=""
            aria-label="Search"
            value={appState.userSearch}
            onChange={(e) => {
              typing(e);
            }}
            onKeyDown={onSearchEnter}
          />
        </div>
      </div>
      <div className="flex flex-wrap flex-col my-8">
        <div className="mx-auto flex-wrap mb-8 bg-gray-50 flex text-gray-500 items-center rounded-xl border px-7 py-2">
          <button
            onClick={() => setFilterScope("all")}
            className={amIFilter("all")}
          >
            All
          </button>
          <button
            onClick={() => setFilterScope("accessories")}
            className={amIFilter("accessories")}
          >
            Accessories
          </button>
          <button
            onClick={() => setFilterScope("wood sign")}
            className={amIFilter("wood sign")}
          >
            Wood Sign
          </button>
          <button
            onClick={() => setFilterScope("Metal Sign")}
            className={amIFilter("Metal sign")}
          >
            Metal Sign
          </button>
          <button className={amIFilter("t")}>Filters</button>
        </div>
      </div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <section className="text-gray-600 mx-8 body-font">
          <div class="container px-5 py-4 mx-auto">
            <div class="flex flex-wrap -m-4">
              {appState.data.map((prod, idx) => (
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full" key={idx}>
                  <Link to={`/productdetail/${prod._id}`}  ><img
                    className="h-60 rounded-lg cursor-pointer w-full object-cover object-center mb-4"
                    src={prod.Images[0]}
                    alt="content"
                  /></Link>
                  <h1 className="text-lg font-inter font-semibold defText-Col-2">
                    {prod.name}
                  </h1>
                  <p className="text-xs mt-2">{prod.categories[0]}</p>
                  <div className="flex justify-between mt-3">
                    <div className="flex items-center">
                      {prod.total_stock !== 0 ? (
                        <Badge className="rounded-full px-4 mr-2 defBackground-nohover text-white p-2  leading-none flex items-center">
                          In Stock
                          <AiFillCheckCircle className="ml-2"></AiFillCheckCircle>
                        </Badge>
                      ) : (
                        <Badge
                          type="danger"
                          className="rounded-full px-4 mr-2 text-white p-2  leading-none flex items-center"
                        >
                          No stock
                          <AiFillCloseCircle className="ml-2"></AiFillCloseCircle>
                        </Badge>
                      )}

                      {true ? (
                        <AiOutlineHeart className="transition duration-200 text-red-200 hover:text-red-500 w-7 h-7 cursor-pointer" />
                      ) : (
                        <AiFillHeart className="text-red-400 w-7 h-7 cursor-pointer" />
                      )}
                    </div>
                    <p className="font-inter defText-Col-2 text-xl">
                      <span className="font-semibold text-lg">Php</span>{" "}
                      {prod.variants[0].price}
                    </p>
                  </div>
                  <div className="flex mt-4 text-gray-400 mb-16 items-center">
                    <BsFillClockFill className="w-3 h-3  mr-2"></BsFillClockFill>
                    <p className="text-xs">
                      {new Date(prod.uat).toLocaleString("en-us", {
                        month: "long",
                      }) +
                        " " +
                        new Date(prod.uat).getDate() +
                        ", " +
                        new Date(prod.uat).getFullYear()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {toShow && appState.data.length === 0 ? (
            <div className="w-full h-6/12 flex flex-col items-center">
              <p className=" font-medium">
                We can't find "{appState.userSearch}" in {scope} category
              </p>
              <GiWindpump className="mt-11 w-32 h-32 m-auto" />
            </div>
          ) : (
            <></>
          )}
        </section>
      )}
    </div>
  );
};

export default Products;
