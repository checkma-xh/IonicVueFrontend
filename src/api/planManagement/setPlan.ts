import axios from "axios";

export async function setPlan(
    accessToken: string,
    userId: number,
    planId: number,
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
        const response = await axios.put(
            `http://localhost:3000/plan-management/users/${userId}/plans/${planId}`,
            data,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
