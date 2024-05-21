import ChangeForm from "@/Components/ChangeForm";
import React from "react";
import counselor from "@/Counselors.json";
import { SERVER_URL } from "@/Components/config/config";

async function page({
  searchParams,
}: {
  searchParams: { phonenumber: string };
}) {
  return (
    <div className="w-full">
      <ChangeForm counselors={counselor} />
    </div>
  );
}

export default page;
