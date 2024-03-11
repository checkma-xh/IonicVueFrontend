import axios from "axios";

export async function getPlans(
    {
        accessToken,
        id,
        completed    = null,
        deleted      = null,
        name         = null,
        remark       = null,
        startDate    = null,
        endDate      = null,
        groupName    = null,
        priorityName = null,
        repeatName   = null,
    }: {
        accessToken  : string,
        id           : number,
        completed   ?: boolean | null,
        deleted     ?: boolean | null,
        name        ?: string | null,
        remark      ?: string | null,
        startDate   ?: string | null,
        endDate     ?: string | null,
        groupName   ?: string | null,
        priorityName?: string | null,
        repeatName  ?: string | null,
    }
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                name        : name,
                remark      : remark,
                startDate   : startDate,
                endDate     : endDate,
                completed   : completed,
                deleted     : deleted,
                groupName   : groupName,
                priorityName: priorityName,
                repeatName  : repeatName,
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
