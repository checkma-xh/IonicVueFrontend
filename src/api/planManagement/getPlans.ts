import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
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
            timeout: 2500,
        };
        const response = await axios.get(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/plan-management/users/${id}/plans`,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}
