import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function verificationCodeRequest(email: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000,
    };
    const data = { email: email };
    const response = await axios.post(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/verification-code/request`,
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}