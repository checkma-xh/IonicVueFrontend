import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
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
            },
            timeout: 2500,
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
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/plan-management/users/${id}/plans`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}