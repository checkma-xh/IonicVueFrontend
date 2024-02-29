import axios from "axios";

export async function deactivate(accessToken: string) {
  try {
    const postData = { accessToken: accessToken };
    const response = await axios.post(
      "https://120.24.177.83/auth/deactivate",
      postData
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
