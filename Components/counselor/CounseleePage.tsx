"use client";
import React, { useState } from "react";
import { useGlobalState } from "../context/state";

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
}

interface DataTableProps {
  data: Data[];
}

const CounseleePage: React.FC<DataTableProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const { state } = useGlobalState();

  const toggleRow = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="px-10">
      <div className="overflow-x-auto">
        <table
          className={`min-w-full border ${
            state.theme.theme === "LIGHT"
              ? "bg-white  border-gray-200"
              : "bg-stone-950 border-stone-800"
          }`}
        >
          <thead
            className={
              state.theme.theme === "LIGHT" ? `bg-gray-50` : "bg-stone-950"
            }
          >
            <tr>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                firstName
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                lastName
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                initiatedName
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                phoneNumber
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                gender
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                age
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                email
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                maritalStatus
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                address
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                profession
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                yourInitiatingSpiritualMaster
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                harinamInitiationDate
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                harinamInitiationPlace
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                recommendedBy
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                currentCounselor
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                connectedToCounselorSinceYear
              </th>
              <th
                className={`py-2 px-4 border-b text-sm font-bold ${
                  state.theme.theme === "LIGHT"
                    ? "border-gray-200 text-gray-500"
                    : "border-stone-800 text-white"
                } text-left font-medium  uppercase`}
              >
                husband
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.firstName ? (
                    <div>{item.firstName}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.lastName ? (
                    <div>{item.lastName}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.initiatedName ? (
                    <div>{item.initiatedName}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.phoneNumber ? (
                    <div>{item.phoneNumber}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.gender ? (
                    <div>{item.gender}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.age ? (
                    <div>{item.age}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.email ? (
                    <div>{item.email}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.maritalStatus ? (
                    <div>{item.maritalStatus}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.address ? (
                    <div>{item.address}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.profession ? (
                    <div>{item.profession}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.yourInitiatingSpiritualMaster ? (
                    <div>{item.yourInitiatingSpiritualMaster}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.harinamInitiationDate ? (
                    <div>{item.harinamInitiationDate.toString()}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.harinamInitiationPlace ? (
                    <div>{item.harinamInitiationPlace}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.recommendedBy ? (
                    <div>{item.recommendedBy}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.currentCounselor ? (
                    <div>{item.currentCounselor}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.connectedToCounselorSinceYear ? (
                    <div>{item.connectedToCounselorSinceYear.toString()}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {item.husband ? (
                    <div>{item.husband}</div>
                  ) : (
                    <div className="text-gray-400">null</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CounseleePage;
