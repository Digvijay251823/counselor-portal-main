import CbmSevas from "@/Components/cct/CBMSevas/CBMSevas";
import { SERVER_URL } from "@/Components/config/config";
import React from "react";

async function cbmSevas(queryString: string) {
  const response = await fetch(`${SERVER_URL}/cbm-seva?${queryString}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    return errorData;
  }
}

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  if (!searchParams.sort) {
    searchParams.sortField = "id";
    searchParams.sortOrder = "desc";
  }
  const queryString = new URLSearchParams(searchParams).toString();
  const responseData = await cbmSevas(queryString);
  return (
    <div>
      <CbmSevas response={responseData.content} />
    </div>
  );
}

export default page;
