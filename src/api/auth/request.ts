import axios from "axios";

export async function request(email: string) {
  try {
    const postData = { email: email };
    const response = await axios.post(
      "https://120.24.177.83/auth/verification-code/request",
      postData
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}