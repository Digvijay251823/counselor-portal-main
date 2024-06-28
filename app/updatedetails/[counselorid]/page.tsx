import UpdateDetails from "@/Components/auth/updateDetails/UpdateDetails";
import { SERVER_URL } from "@/Components/config/config";
import ErrorPage from "@/Components/utils/ErrorPage";

async function getCounselorDetails(counselorid: string) {
  const response = await fetch(`${SERVER_URL}/Counselor/id/${counselorid}`);
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
    // return responseData;
  } else {
    const errorData = await response.json();
    return <ErrorPage message={errorData} />;
  }
}

export default async function page({
  params,
}: {
  params: { counselorid: string };
}) {
  const response = await getCounselorDetails(params.counselorid);

  return (
    <div className="w-full">
      <UpdateDetails counselor={response.content} />
    </div>
  );
}
