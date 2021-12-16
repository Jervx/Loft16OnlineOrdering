import React, { useEffect, useState } from "react";

import { BsFillGrid1X2Fill } from "react-icons/bs";

import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../Features/userSlice";

import FullPageLoader from "../../Components/FullPageLoader";

/* Axios API */
import API from "../../Helpers/api";

const MyCart = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [userCart, setUserCart] = useState();

  useEffect(() => {
    const loadUserData = async () => {
      let _id = userData._id;
      if (!_id) return;
      try {
        const response = await API.get(`/user/mydetails/${_id}`);
        dispatch(signin(response.data.userData));
        setUserCart(userData.cart);
        setLoading(false);
      } catch (error) {}
    };
    loadUserData();
  }, []);

  return (
    <div className="">
      {loading ? (
        <FullPageLoader />
      ) : (
        <>
          <div className="flex justify-evenly items-center defText-Col-2">
            <div className="flex justify-center items-center">
              <BsFillGrid1X2Fill className="h-5 w-5 mr-4 " />
              <p className="font-inter text-2xl defText-Col-2 font-light tracking-wider">
                {userCart.total_items} Item(s)
              </p>
            </div>
            {userCart.total_items === 0 ? (
              <></>
            ) : (
              <div>
                <p className="font-inter text-xl defText-Col-2 font-light tracking-wider">
                  Total : {userCart.total_cost}
                </p>
                <button className="mt-3 px-4 py-2 text-base w-full bg-teal-400 hover:bg-teal-500 rounded-lg text-white">
                  Checkout
                </button>
              </div>
            )}
          </div>
          <section className="text-gray-600 body-font mx-10">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                <div className="p-4 md:w-1/3">
                  {userCart.total_items > 0 ? (
                    userCart.items.map((item, idx) => (
                      <div>
                        
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyCart;
