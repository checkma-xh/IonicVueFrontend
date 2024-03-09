import axios from "axios";

export async function editAvatarUrl(
    accessToken: string,
    id: number,
    avatarUrl: string
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const data = {
            avatarUrl: avatarUrl,
        };
        const response = await axios.patch(
            `http://localhost:3000/user-info/users/${id}/avatar-url`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
