import { SERVER_URL } from "@/Components/config/config";
import SadhanaPage from "@/Components/counselor/sadhana/SadhanaPage";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";
import React from "react";

async function getSadhanaEntries() {
  try {
    const response = await fetch(`${SERVER_URL}/counselee-sadhana`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      if (response.status === 404) {
        return null;
      }
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function page() {
  try {
    const response = await getSadhanaEntries();
    if (!response || response.content === 0) {
      return <NotExistsResource message="Error occured in server component" />;
    }
    return (
      <div>
        <SadhanaPage response={response.content} />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message} />;
  }
}

export default page;
