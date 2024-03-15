import axios from "axios";

export async function login(
  email: string,
  passwordHash: string | null = null,
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
      passwordHash: passwordHash,
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
