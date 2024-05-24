import CounselorPage from "@/Components/cct/counselor/CounselorPage";
import { SERVER_URL } from "@/Components/config/config";
import Filter from "@/Components/counselor/counselee/Filter";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getCounselors() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/Counselor`);
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
  const response = await getCounselors();
  return (
    <div className="w-screen">
      <Filter />
      <CounselorPage data={response.content} />
    </div>
  );
}

export default page;
