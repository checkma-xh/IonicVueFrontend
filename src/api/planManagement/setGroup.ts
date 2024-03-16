import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
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
            },
            timeout: 2500,
        };
        const data = {
            name: name,
            remark: remark,
        };
        const response = await axios.put(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/plan-management/users/${userId}/groups/${groupId}`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}