"use client";
import React from "react";
import { useGlobalState } from "../context/state";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  return (
    <header
      className={`w-full shadow-lg ${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 shadow-stone-950 bg-opacity-20"
      }  px-4 py-1.5`}
    >
      <div className="flex items-center justify-between">
        <div className=" flex flex-col items-center">
          <h1 className="text-xl font-extrabold">PORTAL</h1>
          <span
            className={`font-semibold italic ${
              state.theme.theme === "LIGHT" ? "text-gray-500" : "text-stone-600"
            }`}
          >
            Counselor
          </span>
        </div>
        <nav className="flex items-center gap-5">
          <p
            className={`font-semibold px-1.5 py-1.5 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-stone-800"
            }`}
          >
            Analytics
          </p>
          <Link href="/counselor/counselee">
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${pathname} ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              counselee
            </p>
          </Link>
          <p
            className={`font-semibold px-1.5 py-1.5 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-stone-800"
            }`}
          >
            sessions
          </p>
          <p
            className={`font-semibold px-1.5 py-1.5 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-stone-800"
            }`}
          >
            activities
          </p>
          <p
            className={`font-semibold px-1.5 py-1.5 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-stone-800"
            }`}
          >
            attendance
          </p>
          <p
            className={`font-semibold px-1.5 py-1.5 rounded-lg ${
              state.theme.theme === "LIGHT"
                ? "hover:bg-gray-100"
                : "hover:bg-stone-800"
            }`}
          >
            sadhana
          </p>
          <Link href={"/counselor/scan"}>
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              scan
            </p>
          </Link>
        </nav>
        <div className="flex items-center gap-5">
          {state.theme.theme === "LIGHT" ? (
            <button
              onClick={() => dispatch({ type: "DARK" })}
              className={`p-2.5 rounded-lg bg-gray-50`}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => dispatch({ type: "LIGHT" })}
              className={`p-2.5 rounded-lg bg-yellow-950 bg-opacity-40`}
            >
              <SunIcon className="h-5 w-5" />
            </button>
          )}
          <p className="font-bold text-purple-500 bg-purple-100 px-2 py-1.5 rounded-lg">
            login
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
