import axios from "axios";

export async function getRepeats ( accessToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    };
    const response = await axios.get(
      `http://localhost:3000/other/repeats`,
      config,
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}