import { SERVER_URL } from "@/Components/config/config";
import CounseleePage from "@/Components/counselor/counselee/CounseleePage";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getCounselees() {
  unstable_noStore();
  const response = await fetch(`${SERVER_URL}/counselee`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

async function page() {
  const response = await getCounselees();
  return (
    <div>
      <CounseleePage data={response.content} />
    </div>
  );
}

export default page;
