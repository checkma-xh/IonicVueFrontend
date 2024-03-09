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
            }
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
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
