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
            },
            timeout: 2500,
        };
        const response = await axios.delete(
            `http://localhost:3000/plan-management/users/${userId}/groups/${groupId}`,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}