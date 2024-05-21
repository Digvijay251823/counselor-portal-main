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
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { POST } from "@/actions/POSTREQUESTS";

interface Props {
  PrabhujiName: string;
  PrabhujiPhone: number;
  MatajiName: string;
  MatajiPhone: number;
}

function ChangeForm({ counselors }: { counselors: Props[] }) {
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
            className={`flex items-center gap-5 w-full border rounded-xl transition-all duration-500 ${
              onFocusPhone
                ? "border-purple-700 ring-4 ring-purple-200"
                : "border-gray-400"
            }`}
            onFocus={() => setOnFocusPhone(true)}
            onBlur={() => setOnFocusPhone(false)}
          >
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              placeholder="7879859267"
              className="w-full rounded-xl px-4 py-3 outline-none"
            />
            <button
              className="bg-purple-600 rounded-lg font-bold text-lg px-4 py-1.5 mr-1 text-white"
              type="submit"
              disabled={isLoadingCounseleeRequest}
            >
              {isLoadingCounseleeRequest ? "...Searching" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {Object.keys(counseleeObject).length > 0 && (
        <div>
          <div className="flex items-center justify-evenly gap-2 px-2">
            <div>
              <p
                className={`px-4 py-1 font-bold ${
                  currentStep === 1
                    ? "bg-black text-white rounded-full"
                    : "bg-white text-black border-2 border-black rounded-full"
                }`}
              >
                1
              </p>
            </div>
            <div className="border w-[300px] border-gray-300"></div>
            <div>
              <p
                className={`px-4 py-1 font-bold ${
                  currentStep === 2
                    ? "bg-black text-white rounded-full"
                    : "bg-white text-black border-2 border-black rounded-full"
                }`}
              >
                2
              </p>
            </div>
            <div className="border w-[300px] border-gray-300"></div>
            <div>
              <p
                className={`px-4 py-1 font-bold ${
                  currentStep === 3
                    ? "bg-black text-white rounded-full"
                    : "bg-white text-black border-2 border-black rounded-full"
                }`}
              >
                3
              </p>
            </div>
            <div className="border w-[300px] border-gray-300"></div>
            <div>
              <p
                className={`px-4 py-1 font-bold ${
                  currentStep === 4
                    ? "bg-black text-white rounded-full"
                    : "bg-white text-black border-2 border-black rounded-full"
                }`}
              >
                4
              </p>
            </div>
          </div>
          <div>
            <form action="" className="lg:mx-20 md:mx-14 mx-2">
              <div>
                {currentStep === 1 ? (
                  <>
                    <Step1 nextStep={nextStep} formData={counseleeObject} />
                  </>
                ) : currentStep === 2 ? (
                  <>
                    <Step2
                      nextStep={nextStep}
                      prevStep={prevStep}
                      formData={counseleeObject}
                    />
                  </>
                ) : currentStep === 3 ? (
                  <>
                    <Step3
                      nextStep={nextStep}
                      prevStep={prevStep}
                      formData={counseleeObject}
                    />
                  </>
                ) : (
                  <>
                    <Step4
                      prevStep={prevStep}
                      counselors={counselors}
                      formData={counseleeObject}
                    />
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChangeForm;

function Step1({
  nextStep,
  formData,
}: {
  nextStep: () => void;
  formData: counselee;
}) {
  return (
    <div className="border-b mb-10 rounded-b-xl shadow-2xl">
      <h1 className="text-center font-bold text-xl bg-purple-600 text-white py-2 my-5 rounded-t-xl">
        General Information
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            First Name
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="John"
            id="firstName"
            defaultValue={formData.firstName}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-bold">
            Last Name
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Doe"
            id="lastName"
            defaultValue={formData.lastName}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="initiatedName" className="font-bold">
            Initiated Name
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Rasamrita Gaur Dasa"
            name="initiatedName"
            defaultValue={formData.initiatedName}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="font-bold">
            Gender
          </label>
          <select
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            id="gender"
            defaultValue={formData.gender}
            disabled
          >
            <option value="Male">Male</option>
            <option value="FeMale">FeMale</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="font-bold">
            Age
          </label>
          <input
            type="text"
            id="age"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Enter your age"
            defaultValue={formData.age}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="maritalStatus" className="font-bold">
            Marital Status
          </label>
          <input
            id="maritalStatus"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            defaultValue={formData.maritalStatus}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="mobile" className="font-bold">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="9796737895"
            defaultValue={formData.phoneNumber}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="xyz@example.com"
            defaultValue={formData.email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-bold">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Pune-30"
            defaultValue={formData.address}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="profession" className="font-bold">
            Profession
          </label>
          <input
            type="text"
            id="profession"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Teacher"
            defaultValue={formData.profession}
            disabled
          />
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-300 border-purple-300"
          disabled
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step2({
  nextStep,
  prevStep,
  formData,
}: {
  nextStep: () => void;
  prevStep: () => void;
  formData: counselee;
}) {
  const [spouceDetails, setSpouceDetails] = useState<any>({
    firstName: "",
    lastName: "",
    initiatedName: "",
  });
  const { dispatch } = useGlobalState();
  useEffect(() => {
    if (formData.maritalStatus === "MARRIED") {
      (async () => {
        try {
          const response = await fetch(
            `api/counslee/spouce/${formData.phoneNumber}`
          );
          if (response.ok) {
            const responseData = await response.json();

            setSpouceDetails(responseData.content.content);
          } else {
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
        }
      })();
    }
  }, [formData.maritalStatus, formData.phoneNumber, dispatch]);
  return (
    <div className="border-b mb-10 rounded-b-xl shadow-2xl">
      <h1 className="text-center font-bold text-xl bg-purple-600 text-white py-2 my-5 rounded-t-xl">
        Family Information
      </h1>

      <div
        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-2 ${
          formData.maritalStatus === "UNMARRIED" ? " opacity-45" : ""
        }`}
        aria-readonly
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            First Name of Spouce
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Ragina"
            id="firstNamespouce"
            disabled
            defaultValue={spouceDetails.firstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Last Name of Spouce
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Doe"
            id="lastNamespouce"
            defaultValue={spouceDetails.lastName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Initiated Name of Spouce
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Shakuntala Gopi"
            id="initiatedNamespouce"
            defaultValue={spouceDetails.initiatedName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="age" className="font-bold">
            Children Name & Age
          </label>
          <div>
            {spouceDetails?.children
              ? spouceDetails?.children?.map((item: any, index: number) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div>
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                    </div>
                    <div className="flex gap-1 border rounded-full border-gray-400 px-1.5">
                      <p>Name :</p>
                      <p className="">{item.name}</p>
                    </div>
                    <div className="flex gap-1 border rounded-full border-gray-400 px-1.5">
                      <p>Age :</p>
                      <p className="">{item.age}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      {formData.maritalStatus === "UNMARRIED" && (
        <p className="text-center text-red-600">please click on next</p>
      )}
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          type="button"
          onClick={prevStep}
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step3({
  nextStep,
  prevStep,
  formData,
}: {
  nextStep: () => void;
  prevStep: () => void;
  formData: counselee;
}) {
  return (
    <div className="border-b mb-10 rounded-b-xl shadow-2xl">
      <h1 className="text-center font-bold text-xl bg-purple-600 text-white py-2 my-5 rounded-t-xl">
        Spiritual Information
      </h1>
      <div
        className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-2 ${
          formData.initiatedName ? "" : "opacity-40"
        }`}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Your Initiating/inspired spiritual master
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Shila Prabhupada"
            id="firstName"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Year Of Harinam initiation
          </label>
          <input
            type="date"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Shila Prabhupada"
            id="firstName"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Place
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Pune"
            id="firstName"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Recommended by
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Friend/family/etc."
            id="firstName"
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Your spouse’s Initiating or Aspired Spiritual master
          </label>
          <input
            type="text"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Shila Prabhupada"
            id="firstName"
            disabled
          />
        </div>
      </div>
      {!formData.initiatedName && (
        <p className="text-center text-red-500">please click on next</p>
      )}
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          onClick={prevStep}
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
}
function Step4({
  prevStep,
  counselors,
  formData,
}: {
  prevStep: () => void;
  counselors: Props[];
  formData: counselee;
}) {
  const { dispatch } = useGlobalState();
  const [selecteFirstPreference, setSelectedFirstPreference] =
    useState("Let Temple Decide");
  const [selecteSecondPreference, setSelectedSecondPreference] =
    useState("Let Temple Decide");
  const [selecteThirdPreference, setSelectedThirdPreference] =
    useState("Let Temple Decide");
  const [reasonForChange, setReasonForChange] = useState("");
  const [alreadySpokenToExisting, setAlreadySpokenToExisting] = useState(false);
  const [alreadySpokenToNew, setAlreadySpokenToNew] = useState(false);
  const [
    checkedInformationCorrectConsent,
    setCheckedInformationCorrectConsent,
  ] = useState(false);

  async function handleSubmit(e: any) {
    const formDataToSubmit = {
      counselee: formData.id,
      preferedCounselor1:
        selecteFirstPreference !== "Let Temple Decide"
          ? selecteFirstPreference
          : "",
      preferedCounselor2:
        selecteSecondPreference !== "Let Temple Decide"
          ? selecteSecondPreference
          : "",
      preferedCounselor3:
        selecteThirdPreference !== "Let Temple Decide"
          ? selecteThirdPreference
          : "",
      reasonForCounselorChange: reasonForChange,
      alreadySpokenToExistingCounselor: alreadySpokenToExisting,
      alreadySpokenToNewCounselor: alreadySpokenToNew,
    };
    const filteredFormData: any = Object.fromEntries(
      Object.entries(formDataToSubmit).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    console.log(filteredFormData);
    try {
      const response = await POST(
        filteredFormData,
        `${SERVER_URL}/counselorprovider/create`
      );
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: response.message },
      });
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    }
  }

  return (
    <div className="border-b mb-10 rounded-b-xl shadow-2xl">
      <h1 className="text-center font-bold text-xl bg-purple-600 text-white py-2 my-5 rounded-t-xl">
        Counselor Change related information
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-2">
        {formData.currentCounselor && (
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-bold">
              Current Counselor
            </label>
            <input
              type="text"
              className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
              placeholder="Rasamrita Gaur Dasa"
              id="firstName"
              defaultValue={
                formData?.currentCounselor
                  ? formData?.currentCounselor.initiatedName
                    ? formData?.currentCounselor.initiatedName
                    : `${formData.currentCounselor.firstName} ${formData.currentCounselor.lastName}`
                  : ""
              }
            />
          </div>
        )}
        {formData.currentCounselor && (
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="font-bold">
              Connected To Counselor Since (year)
            </label>
            <input
              type="text"
              className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
              placeholder="Rasamrita Gaur Dasa"
              id="firstName"
              defaultValue={
                formData?.connectedToCounselorSince?.toString().split("T")[0]
              }
              readOnly
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            New Counselor(give 3 preference)
          </label>
          <div className="flex flex-col gap-5">
            <MenuIconAndDropDownDevotees
              DataArr={counselors}
              setSelected={(value: string) => setSelectedFirstPreference(value)}
              defaultVal="Let Temple Decide"
            />
            {selecteFirstPreference !== "Let Temple Decide" ? (
              <>
                <MenuIconAndDropDownDevotees
                  DataArr={counselors}
                  setSelected={(value: string) =>
                    setSelectedSecondPreference(value)
                  }
                  defaultVal="Let Temple Decide"
                />
                <MenuIconAndDropDownDevotees
                  DataArr={counselors}
                  setSelected={(value: string) =>
                    setSelectedThirdPreference(value)
                  }
                  defaultVal="Let Temple Decide"
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
                  placeholder="Rasamrita Gaur Dasa"
                  id="firstName"
                  disabled
                />
                <input
                  type="text"
                  className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
                  placeholder="Rasamrita Gaur Dasa"
                  id="firstName"
                  disabled
                />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="font-bold">
            Reason for the change of counselor
          </label>
          <textarea
            id="reason"
            className="border-b px-5 py-2 text-lg rounded-xl focus:ring focus:ring-purple-100 outline-none focus:border-purple-700 focus:border-t focus:border-l focus:border-r border-b-gray-300 transition-all duration-500"
            placeholder="Reason for the change of counselor"
            value={reasonForChange}
            onChange={(e) => setReasonForChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Have you already spoken to the existing counselor for proposed
            change?
          </label>
          <MenuOthersDropDown
            setSelected={(item: string) =>
              setAlreadySpokenToExisting(item === "YES" ? true : false)
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold">
            Have you already spoken to the new counselor or attended some of the
            meetings?
          </label>
          <MenuOthersDropDown
            setSelected={(item: string) =>
              setAlreadySpokenToNew(item === "YES" ? true : false)
            }
          />
        </div>
      </div>
      <div className="mt-6 w-full flex justify-center">
        <label className="flex items-center gap-2" htmlFor="checkedConcent">
          <input
            type="checkbox"
            id="checkedConcent"
            name="All the above information is correct to the best of my knowledge"
            className="h-5 w-5"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                setCheckedInformationCorrectConsent(false);
              } else {
                setCheckedInformationCorrectConsent(true);
              }
            }}
          />
          <p className="text-gray-500">
            All the above information is correct to the best of my knowledge
          </p>
        </label>
      </div>
      <div className="flex items-center gap-5 justify-end m-5">
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl text-purple-600 border-purple-600"
          onClick={prevStep}
        >
          Prev
        </button>
        <button
          type="button"
          className="text-lg font-bold border-2 px-6 py-1.5 rounded-xl bg-purple-700 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
  defaultVal?: string;
  position?: string;
};

function MenuIconAndDropDownDevotees({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const [QueriedArr, setQueriedArr] = useState<Props[]>([
    {
      PrabhujiName: "",
      PrabhujiPhone: 0,
      MatajiName: "",
      MatajiPhone: 0,
    },
  ]);
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
  const router = useRouter();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    toggleSelection(true);
    setSelectedOption(e.target.value);
    const results: Props[] = DataArr.filter((item: any) => {
      for (const key in item) {
        const value = item[key];
        if (typeof value === "string") {
          if (
            value
              .toLowerCase()
              .includes(e.target.value?.toString().toLowerCase())
          ) {
            return true;
          }
        } else if (typeof value === "number") {
          if (
            value
              .toString()
              .toLowerCase()
              .includes(e.target.value?.toString().toLowerCase())
          ) {
            return true;
          }
        }
      }
      return false;
    });
    setQueriedArr(results.length > 0 ? results : DataArr);
  }
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div
        className={`border-b px-5 py-2 text-lg rounded-xl  outline-none focus:ring focus:ring-purple-100 focus:border-purple-700 border-b-gray-300 focus:border-t focus:border-l focus:border-r transition-all duration-500`}
      >
        <input
          type="text"
          onChange={onChange}
          className="outline-none"
          value={selectedOption}
          placeholder="Search . . . "
        />
      </div>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] bg-white border-gray-300 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {QueriedArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {QueriedArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      item.PrabhujiName && item.MatajiName
                        ? `${item.PrabhujiName} & ${item.MatajiName}`
                        : `${item.PrabhujiName} ${item.MatajiName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg  hover:bg-gray-100`}
                >
                  {item.PrabhujiName && item.MatajiName
                    ? `${item.PrabhujiName} & ${item.MatajiName}`
                    : `${item.PrabhujiName} ${item.MatajiName}`}
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
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full focus:ring-4 outline-none focus:border font-semibold border-gray-300 bg-white focus:ring-purple-100 focus:border-purple-600`}
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
