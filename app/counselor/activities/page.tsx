import { SERVER_URL } from "@/Components/config/config";
import ActivitiesPage from "@/Components/counselor/activities/ActivitiesPage";
import React from "react";
async function getActivities() {
  try {
    const response = await fetch(`${SERVER_URL}/counselee-activity`);
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
  const response = await getActivities();
  return (
    <div>
      <ActivitiesPage response={response.content} />
    </div>
  );
}

export default page;
