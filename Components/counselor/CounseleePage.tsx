"use client";
import React, { useState } from "react";
import { useGlobalState } from "../context/state";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

interface Child {
  name: string;
  age: number;
}

interface Data {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: number;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: Date;
  harinamInitiationPlace: string;
  recommendedBy: string;
  currentCounselor: string;
  connectedToCounselorSinceYear: Date;
  husband: string;
  children: Child[];
  createdAt: Date;
  updatedAt: Date;
}

interface DataTableProps {
  data: Data[];
}

const CounseleePage: React.FC<DataTableProps> = ({ data }) => {
  const { state } = useGlobalState();
  const [expandedRow, setExpandedRow] = useState<number>(-1);

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1); // Collapse the row if it's already expanded
    } else {
      setExpandedRow(index); // Expand the clicked row
    }
  };

  return (
    <div className="lg:px-10 md:w-[98vw] w-[98vw] px-2">
      <div
        className={`p-5 rounded-xl ${
          state.theme.theme === "LIGHT"
            ? "bg-gray-50  border-gray-200"
            : "bg-stone-900 bg-opacity-50 border-stone-800"
        }`}
      >
        <div className={`overflow-x-auto`}>
          <table className={``}>
            <thead
              className={
                state.theme.theme === "LIGHT" ? `bg-gray-50` : "bg-stone-950"
              }
            >
              <tr>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  firstName
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  lastName
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Contact Number
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Marital Status
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Joining Date
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Email
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Address
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Gender
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Age
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  address
                </th>
                <th
                  className={`py-2 px-4 border-b text-sm font-[800] ${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-200 text-black"
                      : "border-stone-800 text-white"
                  } text-left font-medium  uppercase`}
                >
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <React.Fragment key={index}>
                  <tr
                    className={`border-b ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300"
                        : "border-stone-800"
                    }`}
                  >
                    <td
                      className={`border-r border-l px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.firstName ? (
                        <div>{item.firstName}</div>
                      ) : (
                        <p>null</p>
                      )}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.lastName ? <div>{item.lastName}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.phoneNumber ? (
                        <div>{item.phoneNumber}</div>
                      ) : (
                        <p>null</p>
                      )}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.maritalStatus ? (
                        <div>
                          {item.maritalStatus === "MARRIED" ? (
                            <p
                              className={` py-1.5 min-w-[100px] px-2 rounded-lg ${
                                state.theme.theme === "LIGHT"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-yellow-900"
                              }`}
                            >
                              MARRIED
                            </p>
                          ) : (
                            <p
                              className={` py-1.5 min-w-[100px] px-2 rounded-lg ${
                                state.theme.theme === "LIGHT"
                                  ? "bg-emerald-500 text-white"
                                  : "bg-emerald-900"
                              }`}
                            >
                              UNMARRIED
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>null</p>
                      )}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.createdAt ? (
                        <div>{item.createdAt.toString()}</div>
                      ) : (
                        <p>null</p>
                      )}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.email ? <div>{item.email}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.address ? <div>{item.address}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.gender ? <div>{item.gender}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.age ? <div>{item.age}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      {item.address ? <div>{item.address}</div> : <p>null</p>}
                    </td>
                    <td
                      className={`border-r px-3 ${
                        state.theme.theme === "LIGHT"
                          ? "border-gray-300"
                          : "border-stone-800"
                      }`}
                    >
                      <div
                        className="flex items-center"
                        onClick={() => toggleRow(index)}
                      >
                        <p>Details</p>
                        <p>
                          <ChevronDownIcon
                            className={`h-5 w-5 transition-all duration-300 ${
                              expandedRow === index
                                ? " rotate-180"
                                : "-rotate-90"
                            }`}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td className="border-b" colSpan={10}>
                        <div>something</div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounseleePage;
