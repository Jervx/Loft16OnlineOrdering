import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { openAlertModal } from '../../Features/uiSlice'
import { signin } from '../../Features/userSlice'

import { useParams } from "react-router-dom";

import { Badge, Input, Button, Avatar } from "@windmill/react-ui";

import API from "../../Helpers/api";

import FullPageLoader from "../../Components/FullPageLoader";

import Informative from "../../Components/Modal/Informative";

import {
  AiFillCloseCircle,
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
} from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import {
  BsFillCalendarCheckFill,
  BsShieldCheck,
  BsCheckCircle,
  BsFillClockFill,
} from "react-icons/bs";

const ProductView = () => {
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState();

  const [selectedVariant, setSelectedVariant] = useState(0);

  const [QTY,setQTY] = useState(1)

  const { prod_id } = useParams();

  const dispatch = useDispatch()

  const _cur_user = useSelector((state) => state.user);


  const addToCart = async () => {

    try{
        API.post("/user/addToCart",{
            _id : _cur_user.userData._id,
            item : {
                thumb : productDetail.Images[0],
                product_ID : prod_id,
                product_name : productDetail.name,
                qty : QTY,
                variant : productDetail.variants[selectedVariant].name,
                variant_price : productDetail.variants[selectedVariant].price,
                rated : false
            }
        })

        dispatch(
            openAlertModal({
            component: <Informative />,
            data: {
                description : "Add To Cart",
                solution : "The items was added to your cart!"
            },
            })
        );

        const response = await API.get(`/user/mydetails/${_cur_user.userData._id}`);

        dispatch(signin(response.data.userData));
    }catch(err){
        dispatch(
            openAlertModal({
            component: <Informative />,
            data: {
                description : "Add To Cart Failed",
                solution : "Please Try Again Later!"
            },
            })
        );
    }
  }

  const checkIfQtyGivenValid = () => { 
      return productDetail.variants[selectedVariant].stock < QTY || QTY <= 0
    }

  const chechkIsNew = (date1) => {
    var currentDate = new Date().toJSON().slice(0, 10);
    var from = new Date(date1);
    var basis = new Date(date1);
    var to = new Date(basis.setMonth(basis.getMonth() + 6));

    var check = new Date(currentDate);

    let res = check > from && check < to;

    return res;
  };

  const getRating = () => {
    const N_r = productDetail.n_ratings;
    const N_no = productDetail.n_no_ratings;

    if (N_r === 0) return 0

    let R = N_r / (N_no * 10) * 10;
    return R.toFixed(1) + "";
  };

  const selectVariant = (myVal) => {
    return selectedVariant === myVal
      ? "text-sm transition font-medium font-inter py-2 mx-1 px-5 ring-4 ring-inset ring-teal-400 border-teal-500 rounded-3xl"
      : "text-sm transition font-extralight font-inter py-2 mx-1 mr-1 px-5 border rounded-3xl";
  };

  const loadProductData = async (prod_id) => {
    try {
      setLoading(true);
      const resp = await API.get(`/browse/getproductdetail/${prod_id}`);
      let proddata = resp.data.productData;
      setProductDetail(proddata);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProductData(prod_id);
  }, []);

  return (
    <div>
      {loading ? (
        <FullPageLoader />
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={productDetail.Images[0]}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {productDetail.name}
                </h1>
                <div className="flex mb-4">
                  {productDetail.categories.map((cat, idx) => (
                    <p key={idx} className="text-sm text-cool-gray-500">
                      {(idx >= 1 ? ", #" : "#") + cat}
                    </p>
                  ))}
                </div>
                <div>
                  <Badge
                    type="danger"
                    className="py-2 mx-1 px-4 flex items-center"
                  >
                    <HiFire className="text-orange-600 h-4 w-4 mr-2" />
                    Top 1 Hot Product
                  </Badge>
                  {chechkIsNew(productDetail.cat) ? (
                    <Badge
                      type="success"
                      className="py-2 mx-1 px-4 flex items-center"
                    >
                      <BsFillCalendarCheckFill className="text-green-600 h-4 w-4 mr-2" />
                      New
                    </Badge>
                  ) : (
                    <></>
                  )}
                  {/* {productDetail.total_stock !== 0 ? (
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
                  )} */}
                </div>
                <div className="flex items-center">
                  <div className="flex justify-center my-4 mr-4 rounded-2xl bg-gray-100">
                    <h3 className="defText-Col-2 px-4 py-4 mx-8 text-4xl">
                      <span className="font-light text-xl mr-2">PhP</span>
                      {productDetail.variants[selectedVariant].price}
                    </h3>
                  </div>
                  <div>
                    {productDetail.variants[selectedVariant].stock !== 0 ? (
                      <div className="flex items-center">
                        <BsCheckCircle className="h-6 w-6 text-teal-400 mr-2" />
                        {productDetail.variants[selectedVariant].stock} items in
                        stock
                      </div>
                    ) : (
                      <Badge
                        type="danger"
                        className="rounded-full px-4 my-2 mr-2 text-white p-2  leading-none flex items-center"
                      >
                        No stock
                        <AiFillCloseCircle className="ml-2"></AiFillCloseCircle>
                      </Badge>
                    )}
                    <div className="flex items-center my-2">
                      {true ? (
                        <AiOutlineHeart className="transition duration-200 text-red-200 hover:text-red-500 w-7 h-7 cursor-pointer  " />
                      ) : (
                        <AiFillHeart className="text-red-400 w-7 h-7 cursor-pointer mr-2" />
                      )}
                      <p className="ml-1">{productDetail.likes} Likes</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <AiFillStar className="text-yellow-300 w-7 h-7 mr-2" />
                  <p>{getRating()} </p>
                  <div className="ml-5 flex items-center">
                    <BsShieldCheck className="text-teal-400 w-6 h-6 mr-2" />
                    {productDetail.replacement_day !== 0 ? (
                      <p>
                        {productDetail.replacement_day} Day(s) Defect
                        Replacement
                      </p>
                    ) : (
                      <p>Return of product is not available</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap my-5 defText-Col-2">
                  {productDetail.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={selectVariant(idx)}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
                <p className="leading-relaxed">{productDetail.description}</p>
                <div className="my-7 flex items-center">
                  <h1 className="text-2xl font-medium">Quantity</h1>
                  <div className="w-2/12">
                    <Input onChange={(e) => {
                        if(isNaN(e.target.value)) return
                        if(e.target.value.length === 0){
                            setQTY("")
                            return
                        }
                        let val = Number.parseInt(e.target.value)
                        setQTY(val)
                    }} value={QTY} className="ml-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></Input>
                  </div>
                  <div>
                    <Button
                      className="ml-7 rounded-xl defBackground hover:bg-green-500"
                      block
                      onClick={() => addToCart()}
                      disabled = {checkIfQtyGivenValid()}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
                <div className="flex mt-4 text-gray-400 mb-16 items-center">
                  <BsFillClockFill className="w-3 h-3  mr-2"></BsFillClockFill>
                  <p className="text-xs">
                    Last update
                    {" " +
                      new Date(productDetail.uat).toLocaleString("en-us", {
                        month: "long",
                      }) +
                      " " +
                      new Date(productDetail.uat).getDate() +
                      ", " +
                      new Date(productDetail.uat).getFullYear()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xl my-6">Ratings & Reviews</p>
                <div>
                  {productDetail.ratings.map((rating, idx) => (
                    <div className="" key={idx}>
                      <div className="flex items-center">
                        <Avatar
                          src={rating.profile_picture}
                          alt={rating.user_name}
                        />
                        <p className="text-md font-medium mx-4 text-gray-700">
                          {rating.user_name}
                        </p>
                        <div className="flex items-center  bg-gray-100 p-2 rounded-md">
                          <AiFillStar className="text-yellow-300 mr-2"/>
                          <p>{rating.score}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-gray-600 border-l-4 pl-2 border-gray-100 py-2">
                        <p>{rating.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductView;
