import axios from "axios";

export async function createPlan(
    accessToken: string,
    id: number,
    name: string,
    remark: string,
    startDate: string,
    endDate: string,
    groupName: string,
    priorityName: string,
    repeatName: string
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
            startDate: startDate,
            endDate: endDate,
            groupName: groupName,
            priorityName: priorityName,
            repeatName: repeatName,
        };
        const response = await axios.post(
            `http://localhost:3000/plan-management/users/${id}/plans`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
