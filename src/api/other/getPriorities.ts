import axios from "axios";

export async function getPriorities ( accessToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    };
    const response = await axios.get(
      `http://localhost:3000/other/priorities`,
      config,
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}