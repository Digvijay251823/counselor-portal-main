import { SERVER_URL } from "@/Components/config/config";
import SadhanaForm from "@/Components/counselee/Sadhana/SadhanaForm";
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
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    throw error;
  }
}

async function page({ params }: { params: { counselorid: string } }) {
  const response = await getSadhana(params.counselorid);

  return (
    <div className="w-full">
      <SadhanaForm
        counselorId={params.counselorid}
        sadhanaForm={response.content[0]}
      />
    </div>
  );
}

export default page;
