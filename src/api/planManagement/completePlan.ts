import axios from "axios";

export async function completePlan(
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
        const data = {};
        const response = await axios.patch(
            `http://localhost:3000/plan-management/users/${userId}/plans/${planId}`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
