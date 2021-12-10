import React from "react";

import API from "../../Helpers/api";

/*Windmill Components*/
import { Badge } from "@windmill/react-ui";

/* Icons */
import { FaCheckCircle } from 'react-icons/fa'
import { HiFire } from 'react-icons/hi'
import { BsFillCalendarCheckFill, BsArrowRightShort } from 'react-icons/bs'
import { IoWalletSharp } from 'react-icons/io5'

const Home = () => {
  const test = async () => {
    const res = await API.get("/test");
    console.log(res);
  };

  return (
    <div>
      <section className="hero text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://cdn.discordapp.com/attachments/912411399458795593/918432266298994718/image_3.png"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="defText-Col-2 text-3xl  title-font font-medium mb-1">
              Metal Sign Medium 
              </h1>
              <h1 className="defText-Col-2 my-6 text-3xl NotoSerif font-medium">
                <span className="text-gray-600 text-xl">for </span><span className="font-medium text-4xl " style={{color : "#C26144"}}>₱250</span> 
              </h1>
              <p className="flex items-center font-medium text-xl text-green-700">
                <span className="text-gray-600 mr-2">50</span> Items Available (In Stock)  <FaCheckCircle className="m-2 w-4 h-4 text-green-400" />
              </p>
              <div className="flex flex-row my-4">
                <Badge type="danger" className="py-2 mx-1 px-4 flex items-center">
                  <HiFire className="text-orange-600 h-4 w-4 mr-2"/>
                  Top 1 Hot Product
                </Badge>
                <Badge type="success" className="py-2 mx-1 px-4 flex items-center">
                  <BsFillCalendarCheckFill className="text-green-600 h-4 w-4 mr-2"/>
                  New
                </Badge>
                <Badge className="py-2 mx-1 px-4 flex items-center">
                  <IoWalletSharp className="text-purple-600 h-4 w-4 mr-2"/>
                  Best Deal
                </Badge>
              </div>
              <p className="leading-relaxed my-4 font-inter">
              Special "vintage" scuffed, scratched, old, rusty, weathered, rustic, aged, discolored design, but the surface is smooth all over. Creative, contracted, fashionable Metal Sign design
              </p>
                <a className="flex items-center text-purple-400 hover:underline" href="#">More Info <BsArrowRightShort className="w-5 h-5" /></a>
              <div className="flex">
              </div>
            </div>
          </div>
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

export default Home;
