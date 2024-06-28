import { SERVER_URL } from "@/Components/config/config";
import NotFoundPage from "@/Components/utils/NotFoundPage";
import { unstable_noStore } from "next/cache";
import React from "react";
import ErrorPage from "@/Components/utils/ErrorPage";
import MarkCBMAttendance from "@/Components/cct/MarkAttendance/MarkAttendance";

async function getScheduledSessions(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings/id/${id}`);
    console.log(response.status);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return <NotFoundPage message={"Meeting Not Found"} />;
      }
      const errorData = await response.json();
      return <ErrorPage message={errorData.message} />;
    }
  } catch (error: any) {
    return <ErrorPage message={error.message || error.title} />;
  }
}

async function page({ params }: { params: { meetingid: string } }) {
  const response = await getScheduledSessions(params.meetingid);

  return (
    <div className="w-full">
      <MarkCBMAttendance response={response.content} />
    </div>
  );
}

export default page;
