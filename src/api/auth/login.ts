import axios from "axios";

export async function login(
  email: string,
  password: string | null = null,
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 2500,
    };
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}
