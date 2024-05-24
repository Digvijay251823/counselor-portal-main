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
import { SERVER_URL } from "./config/config";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { POST } from "@/actions/POSTREQUESTS";
import { HiUsers } from "react-icons/hi";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

function ChangeForm({ counselors }: { counselors: counselor[] }) {
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
  const [counselorPreference3, setCounselorPreference3] = useState("");
  const [isLoadingCounseleeRequest, setIsLoadingCounseleeRequest] =
    useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }
  function prevStep() {
    setCurrentStep((prev) => prev - 1);
  }

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
      const response = await fetch(`api/counslee/${phonenumber}`);
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
            <button
              className="bg-purple-600 rounded font-bold text-lg px-4 py-1.5 mr-1 text-white flex items-center gap-2"
              type="submit"
              disabled={isLoadingCounseleeRequest}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              {isLoadingCounseleeRequest ? "...Searching" : "Search"}
            </button>
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
              update
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
            <form action="">
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-5">
                  {counseleeObject?.currentCounselor ? (
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
                        Rasamrita Gaur Das
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
                      setSelected={(value: string) =>
                        setCounselorPreference1(value)
                      }
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
                  <label htmlFor="" className="font-bold">
                    Reason for change
                  </label>
                  <input
                    type="text"
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
                    counseleeObject?.currentCounselee ? "flex " : "hidden"
                  }`}
                >
                  <label htmlFor="" className="font-bold">
                    Have you already spoken to the existing counselor?
                  </label>
                  <MenuOthersDropDown
                    setSelected={(value) => console.log(value)}
                  />
                </div>
                <div
                  className={`flex flex-col gap-2 ${
                    counseleeObject?.currentCounselee ? "flex " : "hidden"
                  }`}
                >
                  <label htmlFor="" className="font-bold">
                    Have you already spoken to the new counselor or attended
                    some of the meetings?
                  </label>
                  <MenuOthersDropDown
                    setSelected={(value) => console.log(value)}
                  />
                </div>
              </div>
              <div className="flex justify-end p-5 gap-5">
                <button
                  type="submit"
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
      )}
    </div>
  );
}

export default ChangeForm;

interface PropsMenu<T> {
  setSelected: (state: string) => void;
  DataArr: T[];
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
            ? "border-gray-300 bg-white focus:ring-purple-100 focus:border-purple-600"
            : "border-stone-700 bg-stone-950 focus:ring-purple-950 focus:border-purple-600"
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
          {DataArr?.length > 0 ? (
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
