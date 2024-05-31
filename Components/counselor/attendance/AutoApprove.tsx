import { useGlobalState } from "@/Components/context/state";
import React, { useEffect, useState } from "react";

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  role: string;
  autoApprove: boolean;
}

function AutoApprove({ counselorData }: { counselorData: Props }) {
  const [autoApprove, setAutoApprove] = useState(false);
  useEffect(() => {
    const autoapprove = localStorage.getItem("autoApprove");
    if (autoapprove) {
      setAutoApprove(JSON.parse(autoapprove));
    }
  }, []);
  const { state, dispatch } = useGlobalState();
  async function handleAutoApprove() {
    try {
      const response = await fetch(`/api/autoapprove`);
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
        localStorage.setItem("autoApprove", "true");
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: errorData.message },
        });
        localStorage.removeItem("autoApprove");
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: error.message },
      });
    }
  }
  return (
    <div>
      <button
        type="button"
        className={`inline-flex flex-col px-5 py-2.5 font-medium text-center rounded-lg border focus:ring-4 ${
          state.theme.theme === "LIGHT" ? "ring-gray-300" : ""
        }`}
        onClick={handleAutoApprove}
      >
        <p className="font-bold text-md">Autoapprove</p>
        {autoApprove ? (
          <p className="text-xs text-green-500">ON</p>
        ) : (
          <p className="text-xs text-gray-400">OFF</p>
        )}
      </button>
    </div>
  );
}

export default AutoApprove;
