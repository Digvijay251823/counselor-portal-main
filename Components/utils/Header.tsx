"use client";
import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/state";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VscThreeBars } from "react-icons/vsc";
import Drawer from "./MenuDrawer";

function Header() {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
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
        <nav className="md:flex items-center gap-5  hidden">
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
          <Link href={"/counselor/sessions"}>
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              sessions
            </p>
          </Link>
          <Link href={"/counselor/activities"}>
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              activities
            </p>
          </Link>
          <Link href={"/counselor/attendance"}>
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              attendance
            </p>
          </Link>
          <Link href={"/counselor/sadhana"}>
            <p
              className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-100"
                  : "hover:bg-stone-800"
              }`}
            >
              sadhana
            </p>
          </Link>
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
              onClick={() => {
                dispatch({ type: "DARK" });
                localStorage.setItem("THEME", "DARK");
              }}
              className={`p-2.5 rounded-lg bg-gray-50`}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch({ type: "LIGHT" });
                localStorage.setItem("THEME", "LIGHT");
              }}
              className={`p-2.5 rounded-lg bg-yellow-950 bg-opacity-40`}
            >
              <SunIcon className="h-5 w-5" />
            </button>
          )}
          <div className="md:hidden block">
            <button className="" onClick={() => setIsOpenDrawer(true)}>
              <Bars3Icon className="h-5 w-5" />
            </button>
            <Drawer
              isOpen={isOpenDrawer}
              onClose={() => setIsOpenDrawer(false)}
            >
              <nav className="flex flex-col gap-5">
                <p
                  className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                    state.theme.theme === "LIGHT"
                      ? "hover:bg-gray-100"
                      : "hover:bg-stone-800"
                  }`}
                >
                  Analytics
                </p>
                <Link
                  href="/counselor/counselee"
                  onClick={() => setIsOpenDrawer(false)}
                >
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
                <Link
                  href={"/counselor/sessions"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <p
                    className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-stone-800"
                    }`}
                  >
                    sessions
                  </p>
                </Link>
                <Link
                  href={"/counselor/activities"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <p
                    className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-stone-800"
                    }`}
                  >
                    activities
                  </p>
                </Link>
                <Link
                  href={"/counselor/attendance"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <p
                    className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-stone-800"
                    }`}
                  >
                    attendance
                  </p>
                </Link>
                <Link
                  href={"/counselor/sadhana"}
                  onClick={() => setIsOpenDrawer(false)}
                >
                  <p
                    className={`font-semibold px-1.5 py-1.5 rounded-lg ${
                      state.theme.theme === "LIGHT"
                        ? "hover:bg-gray-100"
                        : "hover:bg-stone-800"
                    }`}
                  >
                    sadhana
                  </p>
                </Link>
                <Link
                  href={"/counselor/scan"}
                  onClick={() => setIsOpenDrawer(false)}
                >
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
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
