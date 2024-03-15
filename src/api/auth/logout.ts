import axios from "axios";

export async function logout(accessToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 2500,
    };
    const data = {};
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}