import axios from "axios";

export async function editPasswordHash(
    id: number,
    email: string,
    passwordHash: string,
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
            passwordHash: passwordHash,
        };
        const response = await axios.patch(
            `http://localhost:3000/user-info/users/${id}/password-hash`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}