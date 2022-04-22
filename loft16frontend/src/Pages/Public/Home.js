import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

/* Swipedesu */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from "swiper";
import "swiper/swiper-bundle.css";

/* AXIOS API */
import API from "../../Helpers/api";
import { getUrl } from "../../Helpers/uitils"

/*Windmill Components*/
import { Badge, Button } from "@windmill/react-ui";

import {motion} from "framer-motion"

/* Icons */
import { FaCheckCircle } from "react-icons/fa";
import { HiFire } from "react-icons/hi";
import {
  BsFillCalendarCheckFill,
  BsArrowRightShort,
  BsFillClockFill,
} from "react-icons/bs";
import {
  AiFillCloseCircle,
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
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.75 }}>
      <section className=" text-gray-600 body-font overflow-hidden">
          <div className=" font-quicksand  px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
            <div className="max-w-xl mx-auto lg:max-w-screen-xl">
              <div className="mb-16  lg:max-w-lg lg:mb-0">
                <div className="max-w-xl mb-6">
                  <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                      LOFT
                    </p>
                  </div>
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-quicksand font-medium tracking-tight text-teal-800 sm:text-4xl sm:leading-none">
                    Home decorations
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
                    See Products
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
              <img
                src={getUrl('/static/assets/hero.jpeg')}
                className="object-cover object-top w-full h-64 max-w-xl -mb-8 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-5/6 lg:max-w-screen-md"
                alt=""
              />
            </div>
          </div>
      </section>

      <section className="text-gray-600 body-font md:mx-16 mt-20">
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

      <div className="max-w-screen-xl  p-4 bg-white dark:bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:mt-20">
        <div className="relative font-quicksand ">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
              <p className="text-base leading-6 text-teal-500 font-semibold uppercase">
                Why Loft16?
              </p>
              <h4 className="mt-2 text-2xl leading-8 font-extrabold text-teal-800 dark:text-white sm:text-3xl sm:leading-9">
                We offer latest trends, unique and stylish home decorations for
                a cheaper price
              </h4>
              <ul className="mt-8 md:grid md:grid-cols-2 gap-6">
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        className="h-4 w-4"
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
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Cheap but quality products
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        className="h-4 w-4"
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
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Courier Flexibility
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 drark:bg-transparent">
                      <svg
                        className="h-4 w-4"
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
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Safe & easy transaction
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
              <div className="relative space-y-4">
                <div className="flex items-end justify-center lg:justify-start space-x-4">
                  <motion.img 
                    className="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src={getUrl('/static/assets/furnit.jpeg')}
                    alt="1"
                  />
                  <img
                    className="rounded-lg shadow-lg w-40 md:w-64"
                    width="260"
                    src={getUrl('/static/assets/hello.jpeg')}
                    alt="2"
                  />
                </div>
                <div className="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                  <img
                    className="rounded-lg shadow-lg w-24 md:w-40"
                    width="170"
                    src={getUrl('/static/assets/furnit2.jpeg')}
                    alt="3"
                  />
                  <img
                    className="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src={getUrl('/static/assets/cooktool.jpeg')}
                    alt="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full h-screen flex items-center font-quicksand">
        <aside className="w-full mx-8 overflow-hidden h-5/6 text-gray-300 bg-gray-900 rounded-xl lg:flex">
          <div className="w-full lg:w-1/2 p-12 text-center sm:p-16 lg:p-24 lg:text-left flex items-center">
            <div className="max-w-xl mx-auto lg:ml-0">
              <p className="mt-2 text-2xl text-white sm:text-3xl">
                {" "}
                <span className=" font-bold "></span>
              </p>

              <p className="order-3 lg:mt-4 lg:block leading-8 text-xl text-justify italic">
                <span className="text-3xl font-bold">" </span>Way back in 2020,
                me and my friend started a small company and we rent a small
                unit for our startup company office. Loft 16 help us to decide
                what accessories may fill the emptyness of our small company
                office.<span className="text-3xl font-bold"> "</span>
              </p>
              <p className=" mt-8 text-xl text-gray-100">
                {" "}
                - Mr. Andrei Castro (Co-Founder of Lisa IT Tech)
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url('${getUrl('/static/assets/andrei.jpg')}')`
            }}
            className="flex items-center relative bg-cover w-full h-screen sm:h-96 lg:w-1/2 lg:h-auto"
          >
            <div className="flex items-center justify-center w-full h-full filter backdrop-filter backdrop-blur-sm">
              <img
               src={getUrl('/static/assets/andrei.jpg')}
                alt="Testimonial"
                className="mx-auto my-8 rounded-xl absolute inset-0 object-cover w-8/12 "
              />
            </div>
          </div>
        </aside>
      </div>

    </motion.div>
  );
};

export default withRouter(Home);
