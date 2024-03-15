import axios from "axios";

export async function setPlan(
{
    accessToken,
    userId,
    planId,
    completed    = false,
    deleted      = false,
    name         = null,
    remark       = null,
    startDate    = null,
    endDate      = null,
    groupName    = null,
    priorityName = null,
    repeatName   = null,
}: {
    accessToken  : string,
    userId       : number,
    planId       : number,
    completed    : boolean,
    deleted      : boolean,
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
            timeout: 2500,
        };
        const data = {
            completed   : completed,
            deleted     : deleted,
            name        : name,
            remark      : remark,
            startDate   : startDate,
            endDate     : endDate,
            groupName   : groupName,
            priorityName: priorityName,
            repeatName  : repeatName,
        };
        const response = await axios.put(
            `http://localhost:3000/plan-management/users/${userId}/plans/${planId}`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}