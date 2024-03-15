import axios from "axios";

export async function verificationCodeRequest(email: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000,
    };
    const data = { email: email };
    const response = await axios.post(
      "http://localhost:3000/auth/verification-code/request",
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}