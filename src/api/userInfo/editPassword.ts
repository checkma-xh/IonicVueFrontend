import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function editPassword(
    id: number,
    email: string,
    password: string,
) {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 2500,
        };
        const data = {
            email: email,
            password: password,
        };
        const response = await axios.patch(
            `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/user-info/users/${id}/password`,
            data,
            config
        );
        return response;
    } catch (error: any) {
        return error.response;
    }
}