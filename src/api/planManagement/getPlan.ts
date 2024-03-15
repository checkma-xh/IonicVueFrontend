import axios from "axios";

export async function getPlan(
    accessToken: string,
    userId: number,
    planId: number,
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            timeout: 2500,
        };
        const response = await axios.get(
            `http://localhost:3000/plan-management/users/${userId}/plans/${planId}`,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}