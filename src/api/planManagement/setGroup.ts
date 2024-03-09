import axios from "axios";

export async function setGroup(
    accessToken: string,
    userId: number,
    groupId: number,
    name: string,
    remark: string
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        };
        const data = {
            name: name,
            remark: remark,
        };
        const response = await axios.put(
            `http://localhost:3000/plan-management/users/${userId}/groups/${groupId}`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
