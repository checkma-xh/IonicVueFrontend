import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function createGroup(
    accessToken: string,
    id: number,
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
        const response = await axios.post(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/plan-management/users/${id}/groups`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}