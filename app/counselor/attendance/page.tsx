import { SERVER_URL } from "@/Components/config/config";
import AttendancePage from "@/Components/counselor/attendance/AttendancePage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
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
  try {
    const authcontent = cookies().get("AUTH")?.value;
    const authparsed = authcontent && JSON.parse(authcontent);
    if (!authparsed) {
      throw new Error("Sign in to access the resource");
    }
    const response = await getAttendance(authparsed?.counselor.id);
    if (!response || response?.content?.length === 0) {
      return <NotExistsResource message="Nobody marked their attendance yet" />;
    }
    return (
      <div>
        <AttendancePage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
