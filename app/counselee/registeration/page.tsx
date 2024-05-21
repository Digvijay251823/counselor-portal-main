import { SERVER_URL } from "@/Components/config/config";
import Registeration from "@/Components/counselee/registeration/Registeration";
import React from "react";

async function getCounselorList() {
  const counselorList = await fetch(`${SERVER_URL}/Counselor?limit=100`);
  if (counselorList.ok) {
    const counselorData = await counselorList.json();
    return counselorData;
  } else {
    const errorData = await counselorList.json();
    return errorData;
  }
}

async function page() {
  const counselorList = await getCounselorList();
  return (
    <div className="w-full">
      <Registeration counselorList={counselorList} />
    </div>
  );
}

export default page;
