import axios from "axios";

export async function register(
	email: string,
	passwordHash: string,
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
			passwordHash: passwordHash,
			avatar: avatar,
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
