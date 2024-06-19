import ScheduleMeeting from "@/Components/cct/CBMMeetings/ScheduleMeeting";
import { SERVER_URL } from "@/Components/config/config";
import { unstable_noStore } from "next/cache";
import { cookies } from "next/headers";

async function getCourses() {
  unstable_noStore();
  try {
    const response = await fetch(`${SERVER_URL}/course`);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw error;
  }
}

export default async function page() {
  const response = await getCourses();
  const auth = cookies().get("AUTH")?.value;
  const parsedauth = auth && JSON.parse(auth);
  if (!parsedauth) {
    throw new Error("please authenticate to access");
  }
  return (
    <div>
      <ScheduleMeeting counselorId={parsedauth?.counselor?.id} />
    </div>
  );
}
