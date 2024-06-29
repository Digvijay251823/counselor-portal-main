import { SERVER_URL } from "@/Components/config/config";
import ActivitiesPage from "@/Components/counselor/activities/ActivitiesPage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import { unstable_noStore } from "next/cache";
import React from "react";
async function getActivities() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/counselee-activity`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return;
      }
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw error;
  }
}
async function page() {
  try {
    const response = await getActivities();
    if (!response) {
      return <NotExistsResource message="No Activities to show" />;
    }
    return (
      <div>
        <ActivitiesPage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
