import React from "react";

const ArrivedOrders = () => {
  return (
    <div>
      <p className="text-2xl text-center font-medium">Cancelled Orders</p>
      <section className="text-gray-600 body-font mx-8">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8 ">
            <div className="py-8 px-4 lg:w-1/3 ">
              <div className="h-full flex items-start">
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                    Jul
                  </span>
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">
                    18
                  </span>
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-md title-font font-medium text-teal-500 mb-1">
                    OrderID : as08sa97g8nasXZ123
                  </h2>
                  <h1 className="mt-4 title-font text-xl text-gray-900 mb-3">
                    Order Cost :{" "}
                    <span className=" font-medium"> ₱ 1,500.50 </span>
                  </h1>
                  <div className="inline-flex items-center">
                    <span className="flex-grow flex flex-col">
                      <p className="text-lg text-gray-600">
                        Chosen Courier{" "}
                        <span className="text-teal-700 font-medium">J&T</span>.
                      </p>
                    </span>
                  </div>
                  <div className="w-full bg-red-100 mt-2">
                    <p className="px-5 text-xs py-2">
                      Your Order Was Cancelled on  
                      <span className="font-medium"> December 18, 2021</span>
                    </p>
                  </div>
                  <div className="w-full bg-red-100">
                    <p className="px-5 text-xs py-2">
                      Reason : 
                      <span className=""> No Stock</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArrivedOrders;
