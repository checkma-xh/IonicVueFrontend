import axios from "axios";

export async function editEmail(
    id: number,
    newEmail: string,
    oldEmail: string
) {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 2500,
        };
        const data = {
            newEmail: newEmail,
            oldEmail: oldEmail,
        };
        const response = await axios.patch(
            `http://localhost:3000/user-info/users/${id}/email`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}