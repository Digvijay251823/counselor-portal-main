import { ClockIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

function SessionPage() {
  return (
    <div>
      <div>
        <div className="flex justify-end">
          <Link href={"sessions/schedule"}>
            <div className="bg-purple-500 w-max flex items-center gap-2 text-white px-3 py-2 shadow-lg mr-10">
              <p>
                <ClockIcon className="h-5 w-5" />
              </p>
              <p>Schedule</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SessionPage;
