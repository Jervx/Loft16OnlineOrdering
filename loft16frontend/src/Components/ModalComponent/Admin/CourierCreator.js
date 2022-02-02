import React, { useEffect, useState } from "react";
import HelperLabel from "../../HelperLabel";
import Informative from "../../Modal/Informative";
import { Input, Button } from "@windmill/react-ui";

import { useDispatch } from "react-redux";
import { closeInputModal, openAlertModal } from "../../../Features/uiSlice";

import API from "../../../Helpers/api";

const AddressCreator = ({ mode, gcourier, onSave, _id }) => {
  const dispatch = useDispatch();

  const [courier_name, setCourierName] = useState("");
  const [courier_email, setCourierEmail] = useState("");
  const [courier_contact, setCourierContact] = useState("");

  const checkIfGCourier = () => {
    if (gcourier) {
      setCourierName(gcourier.courier_name);
      setCourierEmail(gcourier.courier_email);
      setCourierContact(gcourier.courier_contact);
    }
  };

  useEffect(() => {
    checkIfGCourier();
  }, []);

  const saveAddress = async () => {
    try {
      const update = await API.post("/admin/updateCourier", {
        _id,
        courier: {
          courier_name,
          courier_email,
          courier_contact,
        },
        oldCourier: gcourier,
        mode,
      });
      onSave();
      dispatch(closeInputModal());
    } catch (e) {
      if (e.response) {
        //request was made but theres a response status code
        dispatch(
          openAlertModal({
            component: <></>,
            data: e.response.data,
          })
        );
      } else if (e.request) {
        // The request was made but no response was received
        dispatch(
          openAlertModal({
            component: <></>,
            data: {
              err: 500,
              description: "Sorry, but we can't reach the server",
              solution: "Please try again later",
            },
          })
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", e.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl">Courier Informations</h1>
      <HelperLabel
        isError={false}
        bg={"bg-teal-50"}
        txtbg={"text-teal-600"}
        msg={"Please make sure the information you provided is correct"}
      />
      <h1 className="text-xs mt-8 mb-4">Information</h1>
      <div>
        <div className="mt-4 relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
          {/* <div className="absolute inset-y-0 flex items-center pl-2">
            <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
          </div> */}
          <Input
            className=" rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-600 hover:text-gray-700 focus:text-gray-700"
            placeholder="courier name"
            aria-label="full"
            value={courier_name}
            required={true}
            onChange={(e) => {
              setCourierName(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
          {/* <div className="absolute inset-y-0 flex items-center pl-2">
            <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
          </div> */}
          <Input
            className=" rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-600 hover:text-gray-700 focus:text-gray-700"
            placeholder="courier email"
            required={true}
            aria-label="full"
            value={courier_email}
            onChange={(e) => {
              setCourierEmail(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
          {/* <div className="absolute inset-y-0 flex items-center pl-2">
            <MdEmail className="w-4 h-4 text-teal-600 cursor-pointer mr-4" />
          </div> */}
          <Input
            className=" rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-600 hover:text-gray-700 focus:text-gray-700"
            placeholder="courier contact"
            required={true}
            aria-label="full"
            value={courier_contact}
            onChange={(e) => {
              setCourierContact(e.target.value);
            }}
          />
        </div>
      </div>
      {courier_name.length === 0 ||
      courier_email.length === 0 ||
      courier_contact.length === 0 ? (
        <HelperLabel
          isError={true}
          msg={"Please fill up all the input above"}
        />
      ) : (
        ""
      )}
      <Button
        className="rounded-lg w-full mt-8"
        disabled={
          courier_name.length === 0 ||
          courier_email.length === 0 ||
          courier_contact.length === 0
        }
        onClick={() => saveAddress()}
      >
        Save
      </Button>
    </div>
  );
};

export default AddressCreator;
