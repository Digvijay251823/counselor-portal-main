import ChangeForm from "@/Components/ChangeForm";
import React from "react";
import counselor from "@/Counselors.json";
import { SERVER_URL } from "@/Components/config/config";

async function getCounselors() {
  const response = await fetch(`${SERVER_URL}/counselor`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  } else {
    const errorData = await response.json();
    throw errorData;
  }
}

async function page({
  searchParams,
}: {
  searchParams: { phonenumber: string };
}) {
  const response = await getCounselors();
  return (
    <div className="w-full">
      <ChangeForm counselors={response.content} />
    </div>
  );
}

export default page;
