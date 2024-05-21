"use client";
import React, { useState } from "react";

function SignupComp() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="md:w-[500px] w-[95vw]">
        <h1 className="font-bold text-4xl text-center md:py-20 py-10">
          Signup For Counselor Portal
        </h1>
        <form action="" className="p-5 bg-purple-600 bg-opacity-20 shadow-xl ">
          <div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-2xl">
                Email
              </label>
              <input
                type="text"
                className="border px-5 py-3 outline-none rounded"
                id="email"
                name="email"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupComp;
