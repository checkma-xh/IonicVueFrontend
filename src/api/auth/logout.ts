import axios from "axios";

export async function logout ( accessToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    };
    const data = {};
    const response = await axios.post(
      "http://localhost:3000/auth/logout",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
