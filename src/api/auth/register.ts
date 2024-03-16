import { ConfigService } from "@/utils/ConfigService";
import axios from "axios";

const envConfig = ConfigService.getConfig();
export async function register(
	email: string,
	password: string,
	avatar: string
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
			avatar: avatar,
		};
		const response = await axios.post(
			`http://${envConfig.viteApplicationDomain}:${envConfig.viteApplicationPort}/auth/register`,
			data,
			config
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
}
