import React, { useState } from "react";

import { Link } from "react-router-dom";
import { Button, Label, Input } from "@windmill/react-ui";

import {  BsFillLockFill } from "react-icons/bs";
import { MdAlternateEmail } from 'react-icons/md'

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto ">
          <main className="flex items-center justify-center p-6 sm:p-12 ">
            <div className="w-full">
              <h1 className="pacifico defTextCOlorGreen mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create Loft 16 Account
              </h1>
              <div className="flex justify-center">
                
              </div>
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
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    console.log(email);
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
                    console.log(password);
                  }}
                  value={password}
                />
                </div>
              </Label>

              <Button className="mt-4 defBackground hover:bg-green-500" block tag={Link} to="/">
                Log in
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
                  to="/recover_account"
                >
                  Recover Account
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/auth/signin"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signup;
