import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function login(
  email: string,
  password: string | null = null,
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
    const response = await axios.post(
      `http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/login`,
      data,
      config
    );
    return response;
  } catch (error: any) {
    return error.response;
  }
}
