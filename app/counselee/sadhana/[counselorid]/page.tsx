import { SERVER_URL } from "@/Components/config/config";
import SadhanaForm from "@/Components/counselee/Sadhana/SadhanaForm";
import ErrorComponent from "@/Components/utils/ErrorPage";
import NotExistsResource from "@/Components/utils/NotFoundComponent";

import { unstable_noStore } from "next/cache";
import React from "react";

async function getSadhana(id: string) {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/sadhana/counselor/${id}`);
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

async function page({ params }: { params: { counselorid: string } }) {
  try {
    // const response = await getSadhana(params.counselorid);
    // if (!response) {
    //   return <NotExistsResource message="Sadhana Form Not Configured Yet" />;
    // }
    return (
      <div className="w-full">
        <SadhanaForm
          counselorId={params.counselorid}
          // sadhanaForm={response?.content[0]}
        />
      </div>
    );
  } catch (error: any) {
    return <ErrorComponent message={error.message || error.title} />;
  }
}

export default page;
