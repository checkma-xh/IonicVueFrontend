import axios from "axios";

export async function getPriorities(accessToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 2500,
    };
    const response = await axios.get(
      `http://localhost:3000/other/priorities`,
      config,
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}