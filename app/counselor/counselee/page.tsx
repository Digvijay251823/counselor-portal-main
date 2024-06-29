import { SERVER_URL } from "@/Components/config/config";
import CounseleePage from "@/Components/counselor/counselee/CounseleePage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
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
  try {
    const response = await getCounselees();
    if (!response || response.content.length === 0) {
      return <NotExistsResource message="No counselee to show" />;
    }
    return (
      <div>
        <CounseleePage data={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
