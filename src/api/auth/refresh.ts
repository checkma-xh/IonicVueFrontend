import axios from "axios";

export async function refresh(refreshToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      },
      timeout: 2500,
    };
    const data = {};
    const response = await axios.post(
      "http://localhost:3000/auth/refresh",
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}