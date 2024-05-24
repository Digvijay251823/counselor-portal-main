import React from "react";
import Modal from "../utils/Modal";
import { useGlobalState } from "../context/state";
import { CheckIcon } from "@heroicons/react/16/solid";

function SuccessPage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { state } = useGlobalState();
  if (isOpen)
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-3xl flex justify-center items-center">
        <div
          className={`p-5 rounded-full ${
            state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-950"
          }`}
        >
          <div className="flex items-center gap-5 ">
            <p
              className={`text-green-500 p-3 rounded-full border shadow-lg ${
                state.theme.theme === "LIGHT"
                  ? "bg-white border-gray-300"
                  : "bg-stone-950 border-stone-700"
              }`}
            >
              <CheckIcon className="h-10 w-10" />
            </p>
            <p className="text-4xl font-bold">Success</p>
          </div>
        </div>
      </div>
    );
}

export default SuccessPage;
