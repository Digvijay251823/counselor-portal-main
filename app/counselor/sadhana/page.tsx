import { SERVER_URL } from "@/Components/config/config";
import SadhanaPage from "@/Components/counselor/sadhana/SadhanaPage";
import React from "react";
async function getSadhanaEntries() {
  try {
    const response = await fetch(`${SERVER_URL}/counselee-sadhana`);
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
  const response = await getSadhanaEntries();
  return (
    <div>
      <SadhanaPage response={response.content} />
    </div>
  );
}

export default page;
