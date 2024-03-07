import axios from "axios";

export async function getPlansByGroupName(id: number, accessToken: string, groupName: string) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                groupName: groupName,
            }
        };
        const response = await axios.get(
            `http://localhost:3000/plan-management/users/${id}/plans`,
            config,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
