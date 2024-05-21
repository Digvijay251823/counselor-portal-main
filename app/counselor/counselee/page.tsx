import { SERVER_URL } from "@/Components/config/config";
import CounseleePage from "@/Components/counselor/CounseleePage";
import React from "react";

async function getCounselees() {
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
  console.log(response);
  return (
    <div>
      <CounseleePage data={response.content} />
    </div>
  );
}

export default page;
