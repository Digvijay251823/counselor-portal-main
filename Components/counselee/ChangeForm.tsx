"use client";
import { useGlobalState } from "@/Components/context/state";
import { usePathname, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SERVER_URL } from "../config/config";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { POST } from "@/actions/POSTREQUESTS";
import { HiUsers } from "react-icons/hi";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import SuccessPage from "./SuccessPage";
import { useFormStatus } from "react-dom";

function ChangeForm({ counselors }: { counselors?: counselor[] }) {
  const router = useRouter();
  const { state, dispatch } = useGlobalState();
  const [formState, setFormState] = useState({
    id: "",
    firstName: "",
    lastName: "",
    initiatedName: "",
    phoneNumber: "",
    gender: "",
    age: 0,
    email: "",
    maritalStatus: "",
    address: "",
    profession: "",
    yourInitiatingSpiritualMaster: "",
    harinamInitiationDate: "",
    harinamInitiationPlace: "",
    chantingRounds: "",
    chantingStartedThisRoundsDate: "",
    recommendedBy: "",
    connectedToCounselorSince: "",
    createdAt: "",
    updatedAt: "",
  });
  const [onFocusPhone, setOnFocusPhone] = useState(false);
  const [counseleeObject, setCounseleeObject] = useState<counselee | any>({});
  const [counselorPreference1, setCounselorPreference1] = useState("");
  const [counselorPreference2, setCounselorPreference2] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [counselorPreference3, setCounselorPreference3] = useState("");
  const [reasonForCounselorChange, setReasonForCounselorChange] = useState("");
  const [alreadyAskedToExistingCounselor, setAlreadyAskedToExistingCounselor] =
    useState(false);
  const [alreadyAttendingNewCounselor, setAlreadyAttendingNewCounselor] =
    useState(false);
  const [isLoadingCounseleeRequest, setIsLoadingCounseleeRequest] =
    useState(false);

  async function handleSubmitCounselor(e: FormData) {
    const phonenumber = e.get("phonenumber")?.valueOf();
    if (!phonenumber) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: "please enter you phone number" },
      });
      return;
    }
    try {
      setIsLoadingCounseleeRequest(true);
      const response = await fetch(`/api/counslee/${phonenumber}`);
      if (response.ok) {
        const responseData = await response.json();
        setCounseleeObject(responseData.content.content);
      } else {
        if (response.status === 404) {
          localStorage.setItem("PHONE_NUMBER", phonenumber.toString());
          router.push("/counselee/registeration");
        }
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      setIsLoadingCounseleeRequest(false);
    }
  }

  async function handleSubmitChangeCounselor(e: FormData) {
    const formData = {
      counselee: counseleeObject?.id,
      preferedCounselor1: counselorPreference1,
      preferedCounselor2: counselorPreference2,
      preferedCounselor3: counselorPreference3,
      reasonForCounselorChange: reasonForCounselorChange,
      alreadySpokenToExistingCounselor: alreadyAskedToExistingCounselor,
      alreadySpokenToNewCounselor: alreadyAttendingNewCounselor,
    };
    function filterFormData(data: any) {
      const filteredData: any = {};
      for (const key in data) {
        if (data[key] !== "" && data[key] !== undefined) {
          filteredData[key] = data[key];
        }
      }
      return filteredData;
    }
    const filteredFormData = filterFormData(formData);
    try {
      const response = await POST(
        filteredFormData,
        `${SERVER_URL}/counselorprovider/create`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "SUCCESS", message: response.message },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      setCounseleeObject({});
    }
  }
  return (
    <div>
      <div className="md:px-10 md:pt-20 md:pb-10 px-5 pt-10 pb-5">
        <h1 className="text-4xl font-bold">Counselor Provider</h1>
        <p>
          This form is meant to be filled by any candidate who wish to accept a
          counselor for the first time or wish to change to a different
          counselor.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <form
          action={handleSubmitCounselor}
          className="md:w-[500px] mx-2 mb-10 "
        >
          <label htmlFor="phonenumber" className="font-bold text-xl">
            Phone Number
          </label>
          <div
            className={`flex items-center w-full border transition-all duration-500 ${
              onFocusPhone
                ? `${
                    state.theme.theme === "LIGHT"
                      ? "ring-4 border-purple-700 ring-purple-100"
                      : "ring-4 border-purple-300 ring-purple-950"
                  }`
                : `${
                    state.theme.theme === "LIGHT"
                      ? "border-gray-300"
                      : "border-stone-800"
                  }`
            }`}
            onFocus={() => setOnFocusPhone(true)}
            onBlur={() => setOnFocusPhone(false)}
          >
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="7879859267"
              className={`w-full px-4 py-3 outline-none ${
                state.theme.theme === "LIGHT" ? "bg-white " : "bg-stone-950 "
              }`}
            />
            <SubmitHandlerButtonCounselor />
          </div>
        </form>
      </div>
      {Object.keys(counseleeObject).length > 0 && (
        <>
          <div className="flex flex-col items-center my-5">
            <h1 className="font-bold text-3xl">Hare Krishna!!</h1>
            <div className="flex items-center gap-2">
              <p
                className={`rounded-full p-1.5 ${
                  state.theme.theme === "LIGHT"
                    ? "bg-gray-100 "
                    : "bg-stone-900"
                }`}
              >
                <UserIcon className="h-5 w-5" />
              </p>
              {counseleeObject?.initiatedName ? (
                <p className="text-gray-500 text-xl font-bold">
                  {counseleeObject?.initiatedName}
                </p>
              ) : (
                <p className="text-purple-500 text-xl font-bold">{`${counseleeObject.firstName} ${counseleeObject.lastName}`}</p>
              )}
            </div>
            <button
              className={`flex items-center gap-2 mt-5 ${
                state.theme.theme === "LIGHT" ? "bg-gray-100" : "bg-stone-900"
              } px-4 py-2`}
            >
              <PencilSquareIcon className="h-5 w-5" />
              update details
            </button>
          </div>
        </>
      )}
      {Object.keys(counseleeObject).length > 0 && (
        <div className="flex justify-center w-full">
          <div
            className={`md:mx-10 mx-3 mb-20 md:w-[80vw] w-[90vw] p-5 rounded-2xl shadow-xl ${
              state.theme.theme === "LIGHT" ? "bg-white" : "bg-stone-900"
            }`}
          >
            <form action={handleSubmitChangeCounselor}>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-5">
                  {!counseleeObject?.currentCounselor ? (
                    <h1 className="text-lg font-bold text-red-500 text-center">
                      Note: Since you you have not been allotted a counselor
                      Fill The Form Below
                    </h1>
                  ) : (
                    <div className="flex md:flex-row flex-col items-center md:gap-5">
                      <div className="flex items-center gap-4">
                        <p
                          className={`w-max p-2 rounded-full ${
                            state.theme.theme === "LIGHT"
                              ? "bg-gray-50"
                              : "bg-stone-800"
                          }`}
                        >
                          <HiUsers />
                        </p>
                        <p className="font-bold text-xl">Current Counselor:</p>
                      </div>
                      <p className="font-semibold text-lg">
                        {counseleeObject?.currentCounselor?.initiatedName
                          ? counseleeObject?.currentCounselor?.initiatedName
                          : `${counseleeObject?.currentCounselor?.firstName} ${counseleeObject?.currentCounselor?.lastName}`}
                      </p>
                    </div>
                  )}
                  <div>
                    <h1 className="font-bold text-lg">Give three preference</h1>
                    <p>
                      you have three preferences to choose the counselor if you
                      dont have any you can keep it unchanged
                    </p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <MenuIconAndDropDown
                      DataArr={counselors}
                      defaultVal="Let temple decide"
                      setSelected={(value: string) => {
                        setCounselorPreference1(value);
                        if (value === "") {
                          setCounselorPreference2("");
                          setCounselorPreference3("");
                        }
                      }}
                    />
                    <MenuIconAndDropDown
                      DataArr={counselors}
                      defaultVal="Let temple decide"
                      setSelected={(value: string) =>
                        setCounselorPreference2(value)
                      }
                      disabled={counselorPreference1.length === 0}
                    />
                    <MenuIconAndDropDown
                      DataArr={counselors}
                      defaultVal="Let temple decide"
                      setSelected={(value: string) =>
                        setCounselorPreference3(value)
                      }
                      disabled={
                        counselorPreference2.length === 0 ||
                        counselorPreference1.length === 0
                      }
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 ${
                    counseleeObject?.currentCounselee ? "flex " : "hidden"
                  }`}
                >
                  <label
                    htmlFor="reasonForCounselorChange"
                    className="font-bold"
                  >
                    Reason for change
                  </label>
                  <input
                    type="text"
                    name="reasonForCounselorChange"
                    value={reasonForCounselorChange}
                    onChange={(e) =>
                      setReasonForCounselorChange(e.target.value)
                    }
                    className={`text-lg border px-4 py-1.5 font-normal outline-none ${
                      state.theme.theme === "LIGHT"
                        ? "border-gray-300 bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                        : "border-stone-700 bg-stone-900 focus:border-purple-300 focus:ring-4 focus:ring-purple-950"
                    }`}
                    placeholder="why you want to change counselor?"
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 ${
                    counseleeObject?.currentCounselor ? "flex " : "hidden"
                  }`}
                >
                  <label
                    htmlFor="alreadySpokenToExistingCounselor"
                    className="font-bold"
                  >
                    Have you already spoken to the existing counselor?
                  </label>
                  <MenuOthersDropDown
                    setSelected={(value: string) =>
                      setAlreadyAskedToExistingCounselor(
                        value === "YES" ? true : false
                      )
                    }
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 ${
                    counseleeObject?.currentCounselor ? "flex " : "hidden"
                  }`}
                >
                  <label htmlFor="" className="font-bold">
                    Have you already spoken to the new counselor or attended
                    some of the meetings?
                  </label>
                  <MenuOthersDropDown
                    setSelected={(value) =>
                      setAlreadyAttendingNewCounselor(
                        value === "YES" ? true : false
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end p-5 gap-5">
                <SubmitHandlerButton />
              </div>
            </form>
          </div>
        </div>
      )}
      <SuccessPage isOpen={isSuccess} onClose={() => setIsSuccess(false)} />
    </div>
  );
}

export default ChangeForm;

interface PropsMenu<T> {
  setSelected: (state: string) => void;
  DataArr?: T[];
  defaultVal?: string;
  position?: string;
  disabled?: boolean;
}

function MenuIconAndDropDown<T>({
  setSelected,
  DataArr,
  defaultVal,
  position,
  disabled = false,
}: PropsMenu<T>) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useGlobalState();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
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
        className={`flex items-center justify-between border px-2 py-2 rounded gap-5 w-full focus:ring-4 outline-none focus:border font-semibold ${
          state.theme.theme === "LIGHT"
            ? `border-gray-300 bg-white focus:ring-purple-100 focus:border-purple-600 ${
                disabled ? "text-gray-400" : "text-black"
              }`
            : `border-stone-700 bg-stone-950 focus:ring-purple-950 focus:border-purple-600 ${
                disabled ? "text-gray-400" : "text-while"
              }`
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
        disabled={disabled}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute font-semibold text-lg z-[10000] ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg ${
            state.theme.theme === "LIGHT"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <li
            className={`px-2 py-1.5 rounded-lg list-none ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100 "
                : "hover:bg-stone-700"
            }`}
            onClick={() => {
              setSelectedOption("Let Temple Decide");
              setSelected("");
              closeModal();
            }}
          >
            Let Temple Decide
          </li>
          {DataArr && DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10
                  ? "md:h-[40vh] h-[60vh]"
                  : "h-[40vh] custom-scrollbar"
              }`}
              role="none"
            >
              {DataArr?.map((item: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.initiatedName
                        ? item.initiatedName
                        : `${item.firstName} ${item.lastName}`
                    );
                    setSelected(item.id);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {item.initiatedName
                    ? item.initiatedName
                    : `${item.firstName} ${item.lastName}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function MenuOthersDropDown({
  setSelected,
  position,
}: {
  setSelected: (value: "YES" | "NO") => void;
  position?: string;
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
        className={`text-lg border px-4 py-1.5 font-normal outline-none w-full flex items-center justify-between ${
          state.theme.theme === "LIGHT"
            ? "border-gray-300 bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
            : "border-stone-700 bg-stone-900 focus:border-purple-300 focus:ring-4 focus:ring-purple-950"
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
            <li
              onClick={() => {
                setSelectedOption("YES");
                setSelected("YES");
                toggleSelection(false);
              }}
              className={`px-2 py-1.5 rounded-lg`}
            >
              YES
            </li>
            <li
              onClick={() => {
                setSelectedOption("YES");
                setSelected("YES");
                toggleSelection(false);
              }}
              className={`px-2 py-1.5 rounded-lg`}
            >
              NO
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function SubmitHandlerButtonCounselor() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <div className="flex justify-end">
          {state.theme.theme === "LIGHT" ? (
            <button
              disabled
              type="button"
              className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full py-2.5 px-5 justify-center text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          )}
        </div>
      ) : (
        <button
          className="bg-purple-600 rounded font-bold text-lg px-4 py-1.5 mr-1 text-white flex items-center gap-2"
          type="submit"
          disabled={pending}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
          Search
        </button>
      )}
    </div>
  );
}

function SubmitHandlerButton() {
  const { state } = useGlobalState();
  const { pending } = useFormStatus();
  return (
    <div>
      {pending ? (
        <div className="flex justify-end">
          {state.theme.theme === "LIGHT" ? (
            <button
              disabled
              type="button"
              className="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="w-full py-2.5 px-5 justify-center text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-2 focus:ring-purple-700 focus:text-purple-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Loading...
            </button>
          )}
        </div>
      ) : (
        <button
          type="submit"
          className={`w-full font-medium rounded-lg text-sm px-6 py-2.5 text-center focus:ring-4 focus:outline-none ${
            state.theme.theme === "LIGHT"
              ? "text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-300 "
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
          }`}
        >
          Submit
        </button>
      )}
    </div>
  );
}
