import ForgetPassword from "@/Components/auth/Forget/ForgetPassword";
import React from "react";

function page({ searchParams }: { searchParams: { resettoken: string } }) {
  return (
    <div className="w-full">
      <ForgetPassword />
    </div>
  );
}

export default page;
