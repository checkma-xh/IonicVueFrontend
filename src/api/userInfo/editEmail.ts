import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function editEmail(
    id: number,
    newEmail: string,
    oldEmail: string
) {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 2500,
        };
        const data = {
            newEmail: newEmail,
            oldEmail: oldEmail,
        };
        const response = await axios.patch(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/user-info/users/${id}/email`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}