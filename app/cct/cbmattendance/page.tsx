import CBMAttendance from "@/Components/cct/AttendanceCBM/AttendanceCBM";
import { SERVER_URL } from "@/Components/config/config";
import ErrorPage from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

async function getAttendance() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbmattendance`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function page() {
  const authcontent = cookies().get("AUTH")?.value;
  const authparsed = authcontent && JSON.parse(authcontent);

  if (!authparsed) {
    throw new Error("Sign in to access the resource");
  }
  const response = await getAttendance();
  return (
    <div>
      <CBMAttendance response={response?.content} />
    </div>
  );
}

export default page;
