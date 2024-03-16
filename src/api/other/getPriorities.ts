import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function getPriorities(accessToken: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 2500,
    };
    const response = await axios.get(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/other/priorities`,
      config,
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}