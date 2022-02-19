import React from "react";

import { motion } from "framer-motion"

const Faqs = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-8">
        <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-teal-600 mb-12">
          FAQs
        </h2>
        <motion.ul className="flex items-start gap-8 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
        >
          <li className="w-full md:w-2/5">
            <p className="text-xl font-medium leading-6 text-teal-800 mb-4">
              What data do loft 16 collect?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Loft 16 only collects your profile picture, address, email address, and contact number. We don't collect birthdate or other 
                personal information to lessen the risk of hackers obtaining full information about you incase our system get attacked.
              </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-xl font-medium leading-6 text-teal-800 mb-4">
              How many day's I can return a product?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Most of Loft 16 products are inspected carefully before shipping therefore we ensure that every products are 
                perfect before packaging. The return day's are indicated in the product description you are viewing, most of which
                loft 16 products doesn't support return so please check carefully before adding to cart.
              </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-xl font-medium leading-6 text-teal-800 mb-4">
              What are mode of payment Loft 16 offers?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Currently our website only offer Cash On Delivery(COD). But in our physical store, we offer COD & Online payments like GCash
              </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-xl font-medium leading-6 text-teal-800 mb-4">
              Do Loft 16 have a physical store?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Yes, but because Loft 16 is a simple business, we only have 1 physical store located at <span className="font-medium text-gray-800 italic">249, U.P. Town Center, 216 Katipunan Ave, Diliman, Quezon City</span>. We are located at <span className="italic font-medium text-gray-800">Phase 2 bldg. Look for Happy Pill store neare Mango</span>
                <br /><br />We are open weekdays from 8:00 AM to 8:00 PM. We are looking to build more branches in the future
                 to further serve our dear customer.
                </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-xl font-medium leading-6 text-teal-800 mb-4">
              How can I recover my account?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                You can recover your account <a className="text-blue-500 underline" href="/auth/recover">Here</a>
              </p>
            </p>
          </li>
        </motion.ul>
      </div>
    </div>
  );
};

export default Faqs;
