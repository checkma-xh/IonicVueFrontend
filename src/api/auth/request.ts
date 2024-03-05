import axios from "axios";

export async function request ( email: string ) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    };
    const data = { email: email };
    const response = await axios.post(
      "http://localhost:3000/auth/verification-code/request",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
