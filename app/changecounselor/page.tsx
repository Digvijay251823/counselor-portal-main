import ChangeForm from "@/Components/counselee/ChangeForm";
import React from "react";
import { SERVER_URL } from "@/Components/config/config";

async function getCounselors() {
  const response = await fetch(`${SERVER_URL}/counselor`);
  try {
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData);
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

async function page() {
  const response = await getCounselors();
  if (response)
    return (
      <div className="w-full">
        <ChangeForm counselors={response?.content} />
      </div>
    );
}

export default page;
