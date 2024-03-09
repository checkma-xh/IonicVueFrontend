import axios from "axios";

export async function deleteGroup(
    accessToken: string,
    userId: number,
    groupId: number,
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await axios.delete(
            `http://localhost:3000/plan-management/users/${userId}/groups/${groupId}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
