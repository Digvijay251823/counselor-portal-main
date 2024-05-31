import { SERVER_URL } from "@/Components/config/config";
import CounseleeAttendance from "@/Components/counselee/attendance/CounseleeAttendance";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getScheduledSessions(counselorid: string) {
  unstable_noStore();
  try {
    const response = await fetch(
      `${SERVER_URL}/session/counselor/not-expired/${counselorid}`
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

async function page({ params }: { params: { counselorid: string } }) {
  const response = await getScheduledSessions(params.counselorid);
  return (
    <div className="w-full">
      <CounseleeAttendance response={response.content} />
    </div>
  );
}

export default page;
