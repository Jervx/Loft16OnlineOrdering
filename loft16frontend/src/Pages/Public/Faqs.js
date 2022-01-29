import React from "react";

const Faqs = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-8">
        <h2 className="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-teal-600 mb-12">
          FAQs
        </h2>
        <ul className="flex items-start gap-8 flex-wrap">
          <li className="w-full md:w-2/5">
            <p className="text-lg font-medium leading-6 text-teal-600">
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
            <p className="text-lg font-medium leading-6 text-teal-600">
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
            <p className="text-lg font-medium leading-6 text-teal-600">
              What are mode of payment Loft 16 offers?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Currently our website only offer Cash On Delivery(COD). But in our physical store, we offer COD & Online payments like GCash
              </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-justify text-lg font-medium leading-6 text-teal-600">
              Can i upload my personal profile picture?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
              For now, Loft 16 can't let you customize or upload your personal photo. But if you signed in via google, Loft 16 will use your google photo instead. On the other hand, if you've signed in manually, Loft 16 will give you a random pre-created artwork avatar. 
              </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-lg font-medium leading-6 text-teal-600">
              Where can I find other Loft 16 Physical Store?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                Because Loft 16 is a simple business, we only have 1 physical store located at Quezon City.
                We are open weekdays from 8:00 AM to 8:00 PM. We are looking to build more branches in the future
                 to further serve our dear customer.
                </p>
            </p>
          </li>
          <li className="w-full md:w-2/5">
            <p className="text-lg font-medium leading-6 text-teal-600">
              How can I recover my account?
            </p>
            <p className="mt-2">
              <p className="text-justify text-base leading-6 text-gray-500">
                You can recover your account <a className="text-blue-500 underline" href="/auth/recover">Here</a>
              </p>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
