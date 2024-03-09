import axios from "axios";

export async function deletePlan(
    accessToken: string,
    userId: number,
    planId: number,
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await axios.delete(
            `http://localhost:3000/plan-management/users/${userId}/plans/${planId}`,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
