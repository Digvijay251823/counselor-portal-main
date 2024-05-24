"use client";
import { useGlobalState } from "@/Components/context/state";
import React, { useState } from "react";

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
  currentCounselor: Data;
  connectedToCounselorSinceYear: Date;
  husband: Data;
  children: Child[];
}

interface DataTableProps {
  data: Data[];
}

const CounselorPage: React.FC<DataTableProps> = ({ data }) => {
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
    <div className="px-10 w-full">
      <div className="overflow-x-auto">
        <table
          className={`border ${
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
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    {item.firstName ? (
                      <div>{item.firstName}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.lastName ? (
                      <div>{item.lastName}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.initiatedName ? (
                      <div>{item.initiatedName}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.phoneNumber ? (
                      <div>{item.phoneNumber}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.gender ? <div>{item.gender}</div> : <div>null</div>}
                  </td>
                  <td>{item.age ? <div>{item.age}</div> : <div>null</div>}</td>
                  <td>
                    {item.email ? <div>{item.email}</div> : <div>null</div>}
                  </td>
                  <td>
                    {item.maritalStatus ? (
                      <div>{item.maritalStatus}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.address ? <div>{item.address}</div> : <div>null</div>}
                  </td>
                  <td>
                    {item.profession ? (
                      <div>{item.profession}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.yourInitiatingSpiritualMaster ? (
                      <div>{item.yourInitiatingSpiritualMaster}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.harinamInitiationDate ? (
                      <div>{item.harinamInitiationDate.toString()}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.harinamInitiationPlace ? (
                      <div>{item.harinamInitiationPlace}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.recommendedBy ? (
                      <div>{item.recommendedBy}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.currentCounselor ? (
                      <div>{item.currentCounselor.initiatedName}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.connectedToCounselorSinceYear ? (
                      <div>{item.connectedToCounselorSinceYear.toString()}</div>
                    ) : (
                      <div>null</div>
                    )}
                  </td>
                  <td>
                    {item.husband ? (
                      <div>{item.husband.initiatedName}</div>
                    ) : (
                      <div>null</div>
                    )}
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
  );
};

export default CounselorPage;
