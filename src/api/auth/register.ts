import axios from "axios";

export async function register(
	email: string,
	passwordHash: string,
	avatarUrl: string
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
			passwordHash: passwordHash,
			avatarUrl: avatarUrl,
		};
		const response = await axios.post(
			"http://localhost:3000/auth/register",
			data,
			config
		);
		return response;
	} catch (error: any) {
		return error.response;
	}
}
