import axios from "axios";

export async function getGroups(
  accessToken: string,
  id         : number,
  deleted    : boolean | null
) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        deleted: deleted,
      },
      timeout: 2500,
    };
    const response = await axios.get(
      `http://localhost:3000/plan-management/users/${id}/groups`,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}
