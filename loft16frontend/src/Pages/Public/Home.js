import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

/* Swipedesu */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";

/* AXIOS API */
import API from "../../Helpers/api";

/*Windmill Components*/
import { Badge, Button } from "@windmill/react-ui";

/* Icons */
import { FaCheckCircle } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import {
  BsFillCalendarCheckFill,
  BsArrowRightShort,
  BsFillClockFill,
} from "react-icons/bs";
import {
  AiFillHeart,
  AiFillCloseCircle,
  AiOutlineHeart,
  AiFillCheckCircle,
} from "react-icons/ai";

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);
const Home = (props) => {
  const [hotProducts, setHotProducts] = useState([]);
  const { history } = props;
  useEffect(() => {
    const getHotProducts = async () => {
      try {
        const data = await API.get("/browse/gethotproducts");
        setHotProducts(data.data);
      } catch (e) {
        console.log("ERR", e);
      }
    };
    getHotProducts();
  }, []);

  return (
    <div>
      <section className=" text-gray-600 body-font overflow-hidden">
        {hotProducts.length !== 0 ? (
          <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
            <div className="max-w-xl mx-auto lg:max-w-screen-xl">
              <div className="mb-16 lg:max-w-lg lg:mb-0">
                <div className="max-w-xl mb-6">
                  <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                      LOFT
                    </p>
                  </div>
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                    Home accessories
                    <br className="hidden md:block" />
                    for your home{" "}
                    <span className="inline-block text-deep-purple-accent-400">
                      & business
                    </span>
                  </h2>
                  <p className="text-base text-gray-700 md:text-lg">
                    We offer a wide range of products that will provide great
                    accent to your home & business premises.
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() => history.push("/products")}
                    className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  >
                    Browse Product
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
              <img
                src="https://192.168.1.5:3001/static/assets/hero.jpeg"
                className="object-cover object-top w-full h-64 max-w-xl -mb-8 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
                alt=""
              />
            </div>
          </div>
        ) : (
          //   <div className="container px-5 py-24 mx-auto">
          //     <div className="lg:w-4/5 mx-auto flex flex-wrap">
          //       <img
          //         alt="ecommerce"
          //         className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded-lg"
          //         src={hotProducts[0].Images[0]}
          //       />
          //       <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          //         <h1 className="defText-Col-2 text-3xl  title-font font-medium mb-1">
          //           {hotProducts[0].name}
          //         </h1>
          //         <h1 className="defText-Col-2 my-6 text-3xl NotoSerif font-medium">
          //           <span className="text-gray-600 text-xl">for </span>
          //           <span
          //             className="font-medium text-4xl "
          //             style={{ color: "#C26144" }}
          //           >
          //             ₱ {hotProducts[0].variants[0].price}
          //           </span>
          //         </h1>
          //         <p className="flex items-center font-medium text-xl text-green-700">
          //           <span className="text-gray-600 mr-2">
          //             {hotProducts[0].total_stock}
          //           </span>{" "}
          //           Items Available (In Stock)
          //           <FaCheckCircle className="m-2 w-4 h-4 text-green-400" />
          //         </p>
          //         <div className="flex flex-row my-4">
          //           <Badge
          //             type="danger"
          //             className="py-2 mx-1 px-4 flex items-center"
          //           >
          //             <HiFire className="text-orange-600 h-4 w-4 mr-2" />
          //             Top 1 Hot Product
          //           </Badge>
          //           <Badge
          //             type="success"
          //             className="py-2 mx-1 px-4 flex items-center"
          //           >
          //             <BsFillCalendarCheckFill className="text-green-600 h-4 w-4 mr-2" />
          //             New
          //           </Badge>
          //           {/* <Badge className="py-2 mx-1 px-4 flex items-center">
          //           <IoWalletSharp className="text-purple-600 h-4 w-4 mr-2" />
          //           Best Deal
          //         </Badge> */}
          //         </div>
          //         <p className="leading-relaxed my-4 font-inter">
          //           {hotProducts[0].description}
          //         </p>
          //         <Link
          //           className="flex items-center text-purple-400 hover:underline"
          //           to={`/productdetail/${hotProducts[0]._id}`}
          //         >
          //           More Info <BsArrowRightShort className="w-5 h-5" />
          //         </Link>
          //         <div className="flex"></div>
          //       </div>
          //     </div>
          //   </div>
          <></>
        )}
      </section>
      <div class="max-w-screen-xl p-4 bg-white dark:bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:mt-20">
        <div class="relative">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div class="lg:col-start-2 lg:max-w-2xl ml-auto">
              <p class="text-base leading-6 text-teal-500 font-semibold uppercase">
                Why Loft16?
              </p>
              <h4 class="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                We offer latest trends, unique and stylish home accessories for a cheaper price 
              </h4>
              <ul class="mt-8 md:grid md:grid-cols-2 gap-6">
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Cheap but quality products
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                        Courier Flexibility
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Safe & easy transaction
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
              <div class="relative space-y-4">
                <div class="flex items-end justify-center lg:justify-start space-x-4">
                  <img
                    class="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="https://192.168.1.5:3001/static/assets/furnit.jpeg"
                    alt="1"
                  />
                  <img
                    class="rounded-lg shadow-lg w-40 md:w-64"
                    width="260"
                    src="https://192.168.1.5:3001/static/assets/hello.jpeg"
                    alt="2"
                  />
                </div>
                <div class="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                  <img
                    class="rounded-lg shadow-lg w-24 md:w-40"
                    width="170"
                    src="https://192.168.1.5:3001/static/assets/furnit2.jpeg"
                    alt="3"
                  />
                  <img
                    class="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="https://192.168.1.5:3001/static/assets/cooktool.jpeg"
                    alt="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font md:mx-16">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 defText-Col-2">
                Our <span className="text-orange-400">Featured</span> Products
              </h1>
              <div className="h-1 w-20 bg-orange-500 rounded"></div>
            </div>
          </div>
          <Swiper
            className="p-5"
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            tag="div"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            slidesPerView={3}
            spaceBetween={20}
          >
            {hotProducts.map((prod, idx) => (
              <SwiperSlide key={idx} className="">
                <Link
                  to={`/productdetail/${prod._id}`}
                  className="rounded-lg m"
                >
                  <img
                    className="h-60 rounded-lg w-full object-cover object-center mb-4"
                    src={prod.Images[0]}
                    alt="content"
                  />
                  <h1 className="text-lg font-inter font-semibold defText-Col-2">
                    {prod.name}
                  </h1>
                  <p className="text-xs mt-2">Wood Sign</p>
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
                  <div className="flex mt-4 text-gray-400 mb-16">
                    <BsFillClockFill className="w-3 h-3  mr-2"></BsFillClockFill>
                    <p className="text-xs">
                      Last update{" "}
                      {new Date(prod.uat).toLocaleString("en-us", {
                        month: "long",
                      }) +
                        " " +
                        new Date(prod.uat).getDate() +
                        ", " +
                        new Date(prod.uat).getFullYear()}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* <section className="hero-bg text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
           <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://images.unsplash.com/photo-1481622254766-0f0a35bf6e77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ></img>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Loft 16 Offers High Quality Home Accessories
            </h1>
            <p className="mb-8 leading-relaxed">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button onClick={test} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default withRouter(Home);
