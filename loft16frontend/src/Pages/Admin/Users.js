import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";

import { RiDeleteBin6Fill } from "react-icons/ri";


import API from "../../Helpers/api";
import { nShorter } from "../../Helpers/uitils";

import {
    Button,
    Input,
    Table,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
    TableContainer,
    Avatar
  } from "@windmill/react-ui";

const Users = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const [loadingData, setLoadingData] = useState(true);
  const [unmounted, setUnmounted] = useState(false)
  const [users, setUsers] = useState([])
  const [searching, setSearching] = useState(false)

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/users");
        if(unmounted) return
        setUsers(response.data.users)
        setLoadingData(false)
      } catch (e) {}
    }
  };

  useEffect(() => {
    loadSomething();
    return ()=>{
        setUnmounted(true)
    }
  }, [adminData]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      {!adminData ? (
        <ProtectedLoader />
      ) : (
        <div>
          <h1 className="text-teal-900 mx-9 mt-14 font-medium text-3xl">
            Users
          </h1>
          <section className="mx-4 body-font">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Completed Orders</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!loadingData &&
                    users.map((user, idx) => (
                      <TableRow
                        onClick={() => {
                        //   dispatch(
                        //     openInputModal({
                        //       title: "",
                        //       component: (
                        //         <CategoryCreator
                        //           mode={1}
                        //           onSave={loadSomething}
                        //           _id={adminData._id}
                        //           gcategory={user}
                        //         />
                        //       ),
                        //       onAccept: () => {},
                        //       acceptBtnText: "Save",
                        //       cancelBtnText: "Cancel",
                        //     })
                        //   );
                        }}
                        key={idx}
                        className="cursor-pointer transition hover:bg-gray-100 duration-400"
                      >
                          <TableCell>
                            <Avatar
                              className="border-2 border-teal-600"
                              src={user.profile_picture}
                            />
                          </TableCell>
                        <TableCell className="text-teal-900 ">
                          {user.user_name}
                        </TableCell>
                        <TableCell>
                          <p className="text-gray-500">
                            <span className=" font-medium">
                              {nShorter(user.n_completed_orders, 1)}
                            </span>
                          </p>
                        </TableCell>
                        <TableCell>
                          <RiDeleteBin6Fill
                            onClick={(e) => {
                              e.stopPropagation();
                            //   dispatch(
                            //     openNotifier({
                            //       title: "Remove Category",
                            //       message: (
                            //         <>
                            //           {`You are about to remove "${user.category_name}", are you sure to remove this user?`}
                            //           <div className="mx-8 my-4">
                            //             <HelperLabel
                            //               bg={"bg-gray-100"}
                            //               txtbg={"text-teal-700"}
                            //               isError={false}
                            //               msg={
                            //                 "Product associated with this user will not be updated/remove."
                            //               }
                            //             />
                            //             <HelperLabel
                            //               bg={"bg-gray-100"}
                            //               txtbg={"text-teal-700"}
                            //               isError={false}
                            //               msg={
                            //                 "User cannot search this user anymore"
                            //               }
                            //             />
                            //           </div>
                            //         </>
                            //       ),
                            //       onAccept: () => {
                            //         deleteCategory(adminData.id, user, -1);
                            //       },
                            //       acceptBtnText: "Yes, Remove it",
                            //       cancelBtnText: "Cancel",
                            //     })
                            //   );
                            }}
                            className="cursor-pointer  text-gray-400 hover:text-red-600 hover:shadow-2xl rounded-full"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  { loadingData && (
                    <TableRow className="transition filter blur-sm animate-pulse hover:bg-gray-100 duration-400">
                      <TableCell className="text-teal-900 ">---</TableCell>
                      <TableCell>
                        <p className="text-gray-500">
                          <span className=" font-medium">---</span>
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div>
              {!loadingData && !searching && users.length === 0 && (
                <p className="my-4 text-xs text-red-400 text-center">
                  There's no Users
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Users;
