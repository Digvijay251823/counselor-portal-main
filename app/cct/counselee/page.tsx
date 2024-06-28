import Counselees from "@/Components/cct/Counselees/CounseleesPage";
import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import React from "react";

async function getCounselee() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/counselee`);
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
  const response = await getCounselee();

  return (
    <div>
      <Counselees response={response.content} />
    </div>
  );
}

export default page;
