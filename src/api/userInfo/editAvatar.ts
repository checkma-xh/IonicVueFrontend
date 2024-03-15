import axios from "axios";

export async function editAvatar(
    accessToken: string,
    id: number,
    avatar: string
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            timeout: 2500,
        };
        const data = {
            avatar: avatar,
        };
        const response = await axios.patch(
            `http://localhost:3000/user-info/users/${id}/avatar`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}