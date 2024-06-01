import { SERVER_URL } from "@/Components/config/config";
import AttendancePage from "@/Components/counselor/attendance/AttendancePage";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";
async function getAttendance(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/counselee-attendance/counselor/${id}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData;
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
  const response = await getAttendance(authparsed.counselor.id);
  return (
    <div>
      <AttendancePage response={response.content} counselorData={authparsed} />
    </div>
  );
}

export default page;
