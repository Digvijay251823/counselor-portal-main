"use client";
import { useGlobalState } from "@/Components/context/state";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ScheduleSession() {
  const { state } = useGlobalState();
  return (
    <div className="w-full">
      <div>
        <p className="pb-10 md:px-10 px-3 ">
          You should select a course and a session after selecting a course to
          schedule you own session
        </p>
        <div>
          <form
            action=""
            className={`mb-20 shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-stone-50" : "bg-stone-900"
            } bg-opacity-50 md:mx-10 mx-2`}
          >
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:p-5 p-2">
              {/* <div className={`flex flex-col gap-3 `}>
                <label htmlFor="" className="font-bold text-lg">
                  Select Course
                </label>
                <DropDownMenu setSelected={(value) => console.log(value)} />
              </div>
              <div className={`flex flex-col gap-3 `}>
                <label htmlFor="" className="font-bold text-lg">
                  Select Session
                </label>
                <DropDownMenu setSelected={(value) => console.log(value)} />
              </div> */}
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="" className="font-bold text-lg">
                  Session Name
                </label>
                <input
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
                  }`}
                />
              </div>
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="" className="font-bold text-lg">
                  Session Description
                </label>
                <textarea
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
                  }`}
                />
              </div>
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="" className="font-bold text-lg">
                  Session Duration In Minutes
                </label>
                <input
                  className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] ${
                    state.theme.theme === "LIGHT"
                      ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300 bg-white"
                      : "focus:ring-purple-950 focus:border-purple-300 border-stone-700 bg-stone-900 bg-opacity-10"
                  }`}
                />
              </div>
              <div className={`flex flex-col gap-5`}>
                <label
                  htmlFor="modeOfAttendance"
                  className="font-bold text-lg "
                >
                  Mode Of Attendance
                </label>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <label className="font-bold text-lg">ONLINE</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <label className="text-lg font-bold">OFFLINE</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <div className={`flex flex-col gap-3`}>
                <label htmlFor="" className="font-bold text-lg">
                  Schedule At
                </label>
                <div className={`text-black font-bold`}>
                  <Calendar
                    onChange={(e) => console.log(e)}
                    className={` rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "bg-white border"
                        : "bg-stone-900 text-white border border-stone-800"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-5 gap-5">
              <button
                className={`font-bold px-5 py-2 border ${
                  state.theme.theme === "LIGHT"
                    ? "bg-white border-gray-300"
                    : "bg-stone-800 border-stone-600"
                }`}
              >
                Cancel
              </button>
              <button
                className={`font-bold px-5 py-2 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-purple-500 text-white"
                    : "bg-purple-600"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScheduleSession;

function DropDownMenu({
  defaultValue,
  dataArr,
  setSelected,
  position,
}: {
  setSelected: (value: any) => void;
  position?: string;
  dataArr: any;
  defaultValue: any;
}) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left w-full" ref={menuRef}>
      <button
        type="button"
        className={`border px-4 py-2 text-lg outline-none focus:ring-4 flex items-center justify-between w-full lg:w-[400px] ${
          state.theme.theme === "LIGHT"
            ? "focus:ring-purple-100 focus:border-purple-500 border-stone-300"
            : "focus:ring-purple-950 focus:border-purple-300 border-stone-700"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg bg-white border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className={`flex flex-col gap-3 overflow-y-auto `} role="none">
            {dataArr?.map((item: any, index: number) => (
              <p key={index}>{item}</p>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
