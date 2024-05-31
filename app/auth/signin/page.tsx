import Signin from "@/Components/auth/signin/Signin";
import { cookies } from "next/headers";
import React from "react";

function page() {
  return (
    <div className="w-full">
      <Signin />
    </div>
  );
}

export default page;
