import React, { useState } from "react";

import { Link, withRouter } from "react-router-dom";
import { Button, Label, Input } from "@windmill/react-ui";

import { BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

/* redux */
import { useDispatch } from "react-redux";
import { signin } from "../../Features/userSlice";

const Singin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const signInUser = (e,
    user = {
      _id: "ds9jdsj9sd0gs9agg7ag182",
      schema_v: 1,
      name: "Jerbee",
      profile_picture:
        "https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-1/c0.38.100.100a/p100x100/245104592_4382075351877205_6178679693013083978_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeFZRudNAkk--B8CRcCwQNfd91FO_CXi4F33UU78JeLgXQtfspcckSLiD4MtyP5UafDpK8b4Tf6DEAIwBsBb7eVN&_nc_ohc=B72RawcHyXsAX8n0zRY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl17-4.fna&oh=94c772ba41df82895b5a94eaead9df5e&oe=61A254EF",
      user_name: "Jervx",
      email_address: "louellagracechua@gmail.com",
      isVerified: true,
      recovery_emails: [],
      mobild_numbers: [],
      login_count: 0,
      password:
        "936a185caaa266bb9cbe981e9e05cb78cd732b0b3280eb944412bb6f8f8f07af",
      password_change_date: "11-22-2021",
      two_factor_auth: false,
      shipping_address: {
        default_address: 0,
        addresses: [
          {
            address: "QC",
            postal_code: "1400",
            street: "A Bonifacio",
            barangay: "178",
            city: "Caloocan",
            province: "Metro Manila",
            region: "NCR",
            lon: 50,
            lat: 40,
          },
        ],
      },
      cart: {
        total_items: 1,
        total_cost: 230.5,
        items: [
          {
            product_ID: "ag8g6as015k",
            qty: 2,
            variant: "Var 1",
            variant_price: 115.25,
            rated: false,
          },
        ],
      },
      n_completed_transaction: 0,
      n_pending_orders: 0,
      pending_orders: [],
      in_progress: [],
      cencelled: [],
      past_transactions: [],
      cat: "11-11-2021",
      uat: "11-11-2021",
      uby: "fg9s7a62950g0sg8a9124asdg97350bm01",
      dat: "11-11-2021",
    }
  ) => {
    dispatch(signin(user))
    props.history.push('/')
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="pacifico defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Sign in to Loft 16
              </h1>
              <div className="flex justify-center"></div>
              <Label>
                <span>Email</span>
                <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <MdAlternateEmail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type="email"
                    placeholder="john@doe.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.currentTarget.value);
                    }}
                  />
                </div>
              </Label>

              <Label className="pt-4">
                <span>Password</span>
                <div className="flex relative w-full max-w-xl focus-within:text-purple-500">
                  <div className="absolute inset-y-0 flex items-center pl-2">
                    <BsFillLockFill className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="mt-1 pl-8"
                    type="password"
                    placeholder="********"
                    onChange={(e) => {
                      setPassword(e.currentTarget.value);
                    }}
                    value={password}
                  />
                </div>
              </Label>

              <Button
                className="mt-4 rounded-xl defBackground hover:bg-green-500"
                block
                onClick={signInUser}
              >
                Signin
              </Button>

              {/* <hr className="my-8" />

              <Button block layout="outline">
                <BsGithub className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <BsTwitter className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button> */}

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/auth/recover_account"
                >
                  Recover Account
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/auth/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Singin);
