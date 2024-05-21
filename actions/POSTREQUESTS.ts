export async function POST(formData: FormData, url: string) {
  const header = new Headers();
  header.append("Content-Type", "application/json");

  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    });
    console.log(response);
    if (response.ok) {
      const responseData = await response.json();
      return { message: responseData.content.message };
    } else {
      if (response.status === 409) {
        throw new Error("devotee already exists");
      }
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || errorData.title);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Unexpected exception occured");
  }
}
