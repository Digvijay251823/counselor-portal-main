"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "../context/state";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { FaUserFriends } from "react-icons/fa";
import { GrTask } from "react-icons/gr";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function Headercct() {
  const pathname = usePathname();
  const { state, dispatch } = useGlobalState();

  return (
    <header
      className={`w-full ${
        state.theme.theme === "LIGHT"
          ? "bg-white"
          : "bg-stone-900 shadow-stone-950 bg-opacity-20"
      }  px-5 pt-5`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center gap-0">
            <p className="font-extrabold text-xl">PORTAL</p>
            <p
              className={`font-semibold italic ${
                state.theme.theme === "LIGHT"
                  ? "text-gray-500"
                  : "text-stone-600"
              }`}
            >
              CCT
            </p>
          </div>
          <div>
            <nav
              className={`flex items-center gap-5 ${
                state.theme.theme === "LIGHT"
                  ? "bg-black text-white rounded-full px-5 py-2"
                  : "bg-white text-black rounded-full px-5 py-2"
              }`}
            >
              <Link href={"/cct/analytics"}>
                <p className="font-bold text-lg">Analytics</p>
              </Link>
              <Link href={"/cct/counselee"}>
                <p className="font-bold text-lg">Counselees</p>
              </Link>
              <Link href="/cct/counselors">
                <p className="font-bold text-lg">Counselors</p>
              </Link>
              <div>
                <MenuCBM />
              </div>
              <Link href="/cct/scan">
                <p className="font-bold text-lg">scan</p>
              </Link>
            </nav>
          </div>
        </div>
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

export default Headercct;

function MenuCBM() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { state } = useGlobalState();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleMouseEnterMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="relative" onMouseLeave={handleMouseLeave}>
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        ref={menuRef}
      >
        <span className="font-bold text-lg flex items-center">
          <p>CBM</p>

          <ChevronDownIcon
            className={`h-5 w-5 transition-all duration-300 ${
              isOpen && "-rotate-180"
            }`}
          />
        </span>
        <div
          className={`absolute top-full w-[400px] lg:left-0 right-0 mt-2 ${
            state.theme.theme === "LIGHT"
              ? "bg-white text-black"
              : "bg-stone-900 text-white"
          } rounded-[30px] shadow-lg transform transition-transform duration-300 ${
            isOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnterMenu}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="p-5 ">
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[30px]`}
            >
              <Link href="/cbm-meeting">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <FaUserFriends />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      CBM Sessions
                    </h1>
                  </div>
                  <p>Here you can manage all the meetings of past and future</p>
                </div>
              </Link>
            </li>
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[30px]`}
            >
              <Link href="/cbm-attendance">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <GrTask />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      CBM Attendance
                    </h1>
                  </div>
                  <p>
                    Manage All the counselor board&apos;s attendance and
                    regulations
                  </p>
                </div>
              </Link>
            </li>
            <li
              className={`px-4 py-2 ${
                state.theme.theme === "LIGHT"
                  ? "hover:bg-gray-50"
                  : "hover:bg-stone-950"
              } rounded-[30px]`}
            >
              <Link href="/cbm-activities">
                <div>
                  <div className="flex items-center gap-3">
                    <p
                      className={`rounded-full ${
                        state.theme.theme === "LIGHT"
                          ? "bg-purple-100"
                          : "bg-purple-950 bg-opacity-45"
                      } p-2`}
                    >
                      <IoMdCheckmarkCircleOutline />
                    </p>
                    <h1 className="text-xl font-bold whitespace-nowrap">
                      Sevas
                    </h1>
                  </div>
                  <p>Here you can manage all the meetings of past and future</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
