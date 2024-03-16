import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function logout(accessToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 2500,
    };
    const data = {};
    const response = await axios.post(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/logout`,
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}