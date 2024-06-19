import MarkCBMAttendance from "@/Components/cct/MarkAttendance/MarkAttendance";
import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getScheduledSessions() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings/unexpired`);
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
  const response = await getScheduledSessions();
  return (
    <div className="w-full">
      <MarkCBMAttendance response={response.content} />
    </div>
  );
}

export default page;
