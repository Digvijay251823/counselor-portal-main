import ChangeCounselor from "@/Components/cct/ChangeCounselor/ChangeCounselor";
import { SERVER_URL } from "@/Components/config/config";
import ErrorPage from "@/Components/utils/ErrorPage";

async function getChangeCounselor(queryString: string) {
  try {
    const response = await fetch(
      `${SERVER_URL}/counselorprovider?${queryString}`
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error: any) {
    console.log(error);
  }
}

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  const response = await getChangeCounselor(queryString);

  return (
    <div>
      <div>
        <ChangeCounselor response={response.content} />
      </div>
    </div>
  );
}
