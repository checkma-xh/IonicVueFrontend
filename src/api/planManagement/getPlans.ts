import axios from "axios";

export async function getPlans(
    accessToken: string,
    id: number,
    name: string,
    remark: string,
    startDate: string,
    endDate: string,
    completed: boolean,
    deleted: boolean,
    groupName: string,
    priorityName: string,
    repeatName: string
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                name: name,
                remark: remark,
                startDate: startDate,
                endDate: endDate,
                completed: completed.toString(),
                deleted: deleted.toString(),
                groupName: groupName,
                priorityName: priorityName,
                repeatName: repeatName,
            },
        };
        const response = await axios.get(
            `http://localhost:3000/plan-management/users/${id}/plans`,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
