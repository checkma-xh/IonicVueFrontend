import axios from "axios";

export async function getUserInfo(accessToken: string, id: number) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            timeout: 2500,
        };
        const response = await axios.get(
            `http://localhost:3000/user-info/users/${id}`,
            config,
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}