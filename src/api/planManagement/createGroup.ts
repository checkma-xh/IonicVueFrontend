import axios from "axios";

export async function createGroup(
    accessToken: string,
    id: number,
    name: string,
    remark: string
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const data = {
            name: name,
            remark: remark,
        };
        const response = await axios.post(
            `http://localhost:3000/plan-management/users/${id}/groups`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
