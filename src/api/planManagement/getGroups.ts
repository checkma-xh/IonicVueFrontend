import axios from "axios";

export async function getGroups(
  accessToken: string,
  id: number,
  deleted: boolean
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        deleted: deleted.toString(),
      }
    };
    const response = await axios.get(
      `http://localhost:3000/plan-management/users/${id}/groups`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
