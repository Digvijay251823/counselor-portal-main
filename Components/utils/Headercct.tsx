"use client";
import React from "react";
import { useGlobalState } from "../context/state";
import { usePathname } from "next/navigation";

function Headercct() {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  return (
    <header
      className={`w-full ${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 shadow-stone-950 bg-opacity-20"
      }  px-5 pt-5`}
    >
      <div>
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-0">
            <p className="font-extrabold text-xl">PORTAL</p>
            <p
              className={`font-semibold italic ${
                state.theme.theme === "LIGHT"
                  ? "text-gray-500"
                  : "text-stone-600"
              }`}
            >
              CCT
            </p>
          </div>
          <div>
            <nav
              className={`flex items-center gap-5 ${
                state.theme.theme === "LIGHT"
                  ? "bg-black text-white rounded-full px-5 py-2"
                  : "bg-white text-black rounded-full px-5 py-2"
              }`}
            >
              <p className="font-bold">Analytics</p>
              <p className="font-bold">Counselee</p>
              <p className="font-bold">Counselors</p>
              <p
                className="font-bold"
                onMouseOver={() => console.log("mouse over")}
              >
                CBM
              </p>
              <p className="font-bold">scan</p>
            </nav>
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Headercct;
