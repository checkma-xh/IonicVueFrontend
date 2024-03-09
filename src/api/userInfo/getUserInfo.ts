import axios from "axios";

export async function getUserInfo(accessToken: string, id: number) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const response = await axios.get(
            `http://localhost:3000/user-info/users/${id}`,
            config,
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
