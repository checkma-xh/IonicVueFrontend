import axios from "axios";

export async function deactivate ( accessToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    };
    const data = {};
    const response = await axios.post(
      "https://120.24.177.83/auth/deactivate",
      data,
      config
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
