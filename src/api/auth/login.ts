import axios from "axios";

export async function login (
  email: string,
  passwordHash: string,
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
    };
    const response = await axios.post(
      "http://localhost:3000/auth/login",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
