import axios from "axios";

export async function getGroups ( id: number, accessToken: string ) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${ accessToken }`
      }
    };
    const response = await axios.get(
      `http://localhost:3000/plan-management/users/${ id }/groups`,
      config,
    );
    return response.data;
  } catch ( error ) {
    console.error( "Error fetching data:", error );
  }
}
