import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import React from "react";
import ErrorPage from "@/Components/utils/ErrorPage";
import MarkCBMAttendance from "@/Components/cct/MarkAttendance/MarkAttendance";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import ErrorComponent from "@/Components/utils/ErrorPage";

async function getScheduledSessions(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings/id/${id}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return;
      }
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw error;
  }
}

async function page({ params }: { params: { meetingid: string } }) {
  try {
    const response = await getScheduledSessions(params.meetingid);
    if (!response) {
      return <NotExistsResource message="Session Doesn not exist" />;
    }
    return (
      <div className="w-full">
        <MarkCBMAttendance response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
