import axios from "axios";

export async function editPassword(
    id: number,
    email: string,
    password: string,
) {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 2500,
        };
        const data = {
            email: email,
            password: password,
        };
        const response = await axios.patch(
            `http://localhost:3000/user-info/users/${id}/password`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}