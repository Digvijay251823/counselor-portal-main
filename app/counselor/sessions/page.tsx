import { SERVER_URL } from "@/Components/config/config";
import SessionPage from "@/Components/counselor/session/SessionPage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import React from "react";

async function getScheduledSessions(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/session/counselor/${id}`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw error;
  }
}

async function page() {
  try {
    const auth = cookies().get("AUTH")?.value;
    const parsedauth = auth && JSON.parse(auth);
    if (!parsedauth) {
      throw new Error("please authenticate to access");
    }
    const response = await getScheduledSessions(parsedauth?.counselor?.id);
    return (
      <div className="w-screen justify-center">
        <SessionPage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
