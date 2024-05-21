"use client";
import { usePathname } from "next/navigation";
import React from "react";

function LocationComponent() {
  const pathname = usePathname();
  var parts = pathname.split("/");
  // Extract the last part which should be 'levels'
  var actualPathname = parts[parts.length - 1];
  return (
    <div className="flex flex-col md:p-10 p-6">
      <p className="text-3xl font-bold">{actualPathname}</p>{" "}
      <PathWithIcons pathname={pathname} />
    </div>
  );
}

export default LocationComponent;

const PathWithIcons = ({ pathname }: { pathname: string }) => {
  // Split the string by '/'
  const parts = pathname.split("/");

  // Create JSX for each part with SVG icon and text
  const formattedPath = parts.map((part, index) => (
    <React.Fragment key={index}>
      <div className="flex items-center">
        {index > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
        {part}
      </div>
    </React.Fragment>
  ));

  return <div className="flex items-center">{formattedPath}</div>;
};
