import MeetingsPage from "@/Components/cct/CBMMeetings/MeetingsPage";
import { SERVER_URL } from "@/Components/config/config";
import ErrorPage from "@/Components/utils/ErrorPage";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";
async function getCBMMeetings(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/cbm-meetings`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      return new Error(errorData.message);
    }
  } catch (error: any) {
    throw new Error(error);
  }
}
async function page() {
  const auth = cookies().get("AUTH")?.value;
  const parsedauth = auth && JSON.parse(auth);
  if (!parsedauth) {
    throw new Error("please authenticate to access");
  }
  const response = await getCBMMeetings(parsedauth?.counselor?.id);

  return (
    <div>
      <MeetingsPage response={response.content} />
    </div>
  );
}

export default page;
