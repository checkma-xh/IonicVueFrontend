import axios from "axios";

export async function refresh ( refreshToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ refreshToken }`
      }
    };
    const data = {};
    const response = await axios.post(
      "http://localhost:3000/auth/refresh",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
