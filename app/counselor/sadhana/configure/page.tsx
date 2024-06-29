import { SERVER_URL } from "@/Components/config/config";
import ConfigureSadhana from "@/Components/counselor/sadhana/configure/ConfigureSadhana";
import { cookies } from "next/headers";
import React from "react";

async function getSadhana(counselorId: string) {
  try {
    const response = await fetch(
      `${SERVER_URL}/sadhana/counselor/${counselorId}`
    );
    if (response.ok) {
      const ResponseData = await response.json();
      return ResponseData;
    } else {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    throw error;
  }
}

async function page() {
  const authcontent = cookies().get("AUTH")?.value;
  const authparsed = authcontent && JSON.parse(authcontent);
  const response = await getSadhana(authparsed.counselor.id);
  return (
    <div>
      <ConfigureSadhana
        counselorData={authparsed?.counselor}
        sadhanaResponse={response && response}
      />
    </div>
  );
}

export default page;
