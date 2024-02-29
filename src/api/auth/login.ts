import axios from "axios";

export async function login(
  email: string,
  password: string,
  verificationCode: string
) {
  try {
    const postData = {
      email: email,
      password: password,
      verificationCode: verificationCode,
    };
    const response = await axios.post(
      "https://120.24.177.83/auth/login",
      postData
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}