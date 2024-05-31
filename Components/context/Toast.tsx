"use client";
import React, { useEffect } from "react";
import { useGlobalState } from "./state";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";

function Toast() {
  const { state, dispatch } = useGlobalState();
  useEffect(() => {
    if (state.toast.toast.isVisible) {
      setTimeout(() => {
        dispatch({ type: "HIDE_TOAST" });
      }, 3000);
    }
  }, [state.toast.toast.isVisible, dispatch]);

  return (
    <div
      className={`fixed z-[10000] -top-10 transition-all duration-700 mx-auto lg:left-[35vw] md:left-[30vw] left-[5vw] ${
        state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
      } border md:w-[400px] w-[90vw] rounded-xl px-3.5 py-1.5 text-lg ${
        state.toast.toast.isVisible
          ? "translate-y-full"
          : " -translate-y-full scale-75"
      } ${
        state.theme.theme === "LIGHT"
          ? "border-gray-200 shadow-xl"
          : "border-stone-700 shadow-2xl"
      }`}
    >
      {state.toast.toast.type === "LOADING" ? (
        <div className="flex items-center">
          <i>Loading</i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      ) : state.toast.toast.type === "SUCCESS" ? (
        <div className="flex items-center md:gap-5 gap-3 py-1.5">
          <i className="bg-green-600 p-1 rounded-full text-white">
            <CheckIcon className="h-5 w-5" />
          </i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      ) : (
        <div className="flex items-center md:gap-5 gap-3 py-1.5">
          <i className="bg-red-600 p-1 rounded-full text-white">
            <XMarkIcon className="h-5 w-5" />
          </i>
          <div className="flex items-center">{state.toast.toast.message}</div>
        </div>
      )}
    </div>
  );
}

export default Toast;
