import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function verificationCodeVerify(email: string, verificationCode: string) {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 2500,
    };
    const data = {
      email: email,
      verificationCode: verificationCode,
    };
    const response = await axios.post(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/verification-code/verify`,
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}