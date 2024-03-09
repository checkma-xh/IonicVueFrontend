import axios from "axios";

export async function register (
  email: string,
  passwordHash: string,
  avatarUrl: string
) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    const data = {
      email: email,
      passwordHash: passwordHash,
      avatarUrl: avatarUrl,
    };
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
