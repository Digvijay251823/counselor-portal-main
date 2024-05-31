import { SERVER_URL } from "@/Components/config/config";
import CounseleeActivities from "@/Components/counselee/CounseleeActivities";
import React from "react";

async function getActivities() {
  try {
    const response = await fetch(`${SERVER_URL}/activity`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
}

async function page() {
  const response = await getActivities();
  return (
    <div className="w-full">
      <CounseleeActivities activities={response.content} />
    </div>
  );
}

export default page;
