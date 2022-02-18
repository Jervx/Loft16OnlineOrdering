import React from "react";

import { getUrl } from "../Helpers/uitils"
import { Link } from "react-router-dom"

const Footer = () => {

  return (
    <footer className="px-4 divide-y bg-gray-50 dark:bg-coolGray-800 dark:text-coolGray-100">
      <div className="text-teal-800 container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
              <img class="object-cover rounded-full ring-8 ring-pink-50" src={getUrl('/static/assets/logo.jpg')} alt="" />
            </div>
            <a
              className=" MoonTime defTextCOlorGreen lg:block ml-6 text-4xl font-bold text-gray-800 dark:text-gray-200"
              href="/"
            >
              Loft 16
            </a>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide text-gray-800 uppercase dark:text-coolGray-50">
              Navigation
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
              <Link to="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/faqs">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide  text-gray-800  uppercase dark:text-coolGray-50">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="uppercase  text-gray-800  dark:text-coolGray-50">Social media</div>
            <div className="flex justify-start space-x-3">
              <a
                className="ml-3 text-gray-500"
                href="https://www.instagram.com/loft__16/"
                target="_blank"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-teal-600 py-6 text-sm text-center dark:text-coolGray-400">
        © 2016 Loft16. All rights reserved.
      </div>
    </footer>

    // <footer className="text-gray-600 body-font">

    // </footer>
  );
};

export default Footer;
