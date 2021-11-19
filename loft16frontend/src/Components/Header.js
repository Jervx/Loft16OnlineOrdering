/* Deps */
import React, { useState} from "react";
import { Input, Dropdown, DropdownItem, Avatar } from "@windmill/react-ui";
import { withRouter } from "react-router-dom";


/* Icons */
import {BiSearch} from "react-icons/bi";
import {AiFillFire, AiFillShopping } from "react-icons/ai";
import {RiUser6Fill} from 'react-icons/ri'
import {BsGearFill} from 'react-icons/bs'
import {MdOutlineLogout} from 'react-icons/md'
import {GoPackage} from 'react-icons/go'


const Header = (props) => {

  const { history } = props
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    
 
  return (
    <header className="header z-40 py-4 bg-whie shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <a
          className="hidden pacifico defTextCOlorGreen lg:block ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          href="/"
        >
          Loft 16
        </a>
        {/* <!-- Mobile hamburger --> */}
        {/* <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-green"
          //onClick={toggleSidebar}
          aria-label="Menu"
        >
          <BiMenu className="w-6 h-6 " aria-hidden="true" />
        </button> */}

        {/* <!-- Embedded Routes --> */}
        <div className="flex text-gray-400  justify-center flex-1 lg:mr-32">
          <h3 onClick={()=>history.push('/home')} className=" text-sm flex hover:text-red-500 items-center py-2 mb-2 ">
            <AiFillFire className="w-6 h-6 pr-2" aria-hidden="true" />
            <p
              className="hidden md:block transition duration-200 ease-linear"
            >
              What's Hot
            </p>
          </h3>
          <h3 onClick={()=>history.push('/home/products')} className="ml-4 hover:text-red-500 text-sm flex items-center py-2 mb-2 ">
            <AiFillShopping className="w-6 h-6 pr-2" aria-hidden="true" />
            <p
              className="hidden md:block transition duration-200 ease-linear"
            >
              Products
            </p>
          </h3>
        </div>

        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <BiSearch className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search Product"
              aria-label="Search"
            />
          </div>
        </div>

         {/* User Avatar */}
      <ul className="flex items-center flex-shrink-0 space-x-6">
        {/* <!-- Profile menu --> */}
        <li className="relative">
          <button
            className="rounded-full focus:shadow-outline-purple focus:outline-none"
            aria-label="Account"
            aria-haspopup="true"
            disabled={isProfileMenuOpen}
            onClick={()=>setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <Avatar
              className="align-middle"
              src="https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-1/c0.38.100.100a/p100x100/245104592_4382075351877205_6178679693013083978_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeFZRudNAkk--B8CRcCwQNfd91FO_CXi4F33UU78JeLgXQtfspcckSLiD4MtyP5UafDpK8b4Tf6DEAIwBsBb7eVN&_nc_ohc=J-rMdo_grx0AX9TgYdt&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fmnl17-4.fna&oh=9bcb7384643c674dd7e2011c235f4bb6&oe=619C662F"
              alt=""
              aria-hidden="true"
            />
          </button>
          <Dropdown align="right"
            isOpen={isProfileMenuOpen}
            onClose={()=>setIsProfileMenuOpen(false)}
          >
            <DropdownItem tag="a" href="#">
              <RiUser6Fill className="w-4 h-4 mr-3" aria-hidden="true" />
              <span>Profile</span>
            </DropdownItem>
            <DropdownItem tag="a" href="#">
              <BsGearFill className="w-4 h-4 mr-3" aria-hidden="true" />
              <span>Settings</span>
            </DropdownItem>
            <DropdownItem>
              <GoPackage className="w-4 h-4 mr-3" aria-hidden="true" />
              <span>Orders</span>
            </DropdownItem>
            <DropdownItem>
              <MdOutlineLogout className="w-4 h-4 mr-3" aria-hidden="true" />
              <span>Log out</span>
            </DropdownItem>
          </Dropdown>
        </li>
      </ul>
      </div>
    </header>
  );
};

export default withRouter(Header);
