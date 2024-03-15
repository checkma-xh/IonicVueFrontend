import axios from "axios";

export async function deactivate(email: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 2500,
    };
    const data = {
      email: email,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/deactivate",
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}
