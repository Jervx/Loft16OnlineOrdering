import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import ProtectedLoader from "../../Components/ProtectedLoader";

import API from "../../Helpers/api";
import { nShorter } from "../../Helpers/uitils"

import { Button, Input, Table, TableBody, TableRow, TableHeader, TableCell, TableContainer} from "@windmill/react-ui";
import HelperLabel from "../../Components/HelperLabel";

const Categories = () => {
  const adminData = useSelector((state) => state.admin.adminData);
  const [loadingData, setLoadingData] = useState(true);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('')

  const loadSomething = async () => {
    if (adminData) {
      try {
        const response = await API.get("/admin/categories");
        setCategories(response.data.categories);
        setLoadingData(false);
      } catch (e) {}
    }
  };

  useEffect(() => {
    loadSomething();
  }, [adminData]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      {!adminData ? (
        <ProtectedLoader />
      ) : (
        <div>
          <h1 className="text-teal-900 mx-9 mt-14 font-medium text-3xl">
            Categories
          </h1>
          <div className="mx-8 my-4">
            <HelperLabel
              bg={"bg-gray-100"}
              txtbg={"text-teal-700"}
              isError={false}
              msg={
                "This will help you easily categorize your categorys as well as help user to filter result in Loft 16 website"
              }
            />
          </div>
          <div className="w-1/2 flex mx-9 my-8 space-x-4 items-center">
            <Button
              className="rounded-md "
              disabled={loadingData}
              onClick={() => {
                //   dispatch(
                //     openInputModal({
                //       title: "",
                //       component: (
                //         <CourierCreator
                //           mode={0}
                //           onSave={loadSomething}
                //           _id={adminData._id}
                //         />
                //       ),
                //       onAccept: () => {},
                //       acceptBtnText: "Save",
                //       cancelBtnText: "Cancel",
                //     })
                //   );
              }}
            >
              New Category
            </Button>
            <div className=" flex items-center ">
              <div className="relative w-full mr-3 text-green-900 h-full  focus-within:text-green-700 ">
                <Input
                  className=" rounded-lg border-0 bg-gray-100 transition duration-500 text-gray-400 hover:text-gray-700 focus:text-gray-700"
                  placeholder="Search Category"
                  aria-label="New Number"
                  value={search}
                  onChange={(e) => {
                      setSearch(e.target.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        // TODO: Search
                    }
                  }}
                />
              </div>

              <Button disabled={loadingData} className="rounded-lg h-full w-2/12" onClick={() => {}}>
                Search
              </Button>
            </div>
          </div>
          <section className="mx-4 body-font">
          <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Category Name</TableCell>
                      <TableCell>Associated Products</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!loadingData &&
                      categories.map((category, idx) => (
                        <TableRow key={idx} className="transition hover:bg-gray-100 duration-400">
                          
                          <TableCell className="text-teal-900 ">
                            {category.category_name}
                          </TableCell>
                          <TableCell>
                            <p className="text-gray-500">
                              <span className=" font-medium">
                                {nShorter(category.associated_products.length, 1)}
                              </span>
                            </p>
                          </TableCell>
                        </TableRow>
                      ))}
                    {loadingData && (
                      <TableRow className="transition filter blur-sm animate-pulse hover:bg-gray-100 duration-400">
                          
                          <TableCell className="text-teal-900 ">
                            ---
                          </TableCell>
                          <TableCell>
                            <p className="text-gray-500">
                              <span className=" font-medium">
                               ---
                              </span>
                            </p>
                          </TableCell>
                        </TableRow>
                    )} 
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
                { !loadingData && categories.length === 0 && (
                  <p className="my-4 text-xs text-red-400 text-center">
                    There's no categories
                  </p>
                )}
              </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Categories;
