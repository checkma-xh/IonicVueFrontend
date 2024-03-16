import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function refresh(refreshToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      },
      timeout: 2500,
    };
    const data = {};
    const response = await axios.post(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/refresh`,
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}