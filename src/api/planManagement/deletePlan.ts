import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function deletePlan(
    accessToken: string,
    userId: number,
    planId: number,
) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            timeout: 2500,
        };
        const response = await axios.delete(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/plan-management/users/${userId}/plans/${planId}`,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}
