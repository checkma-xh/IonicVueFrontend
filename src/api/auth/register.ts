import axios from "axios";

export async function register(
    email: string,
    password: string,
    verificationCode: string
) {
    try {
        const postData = {
            email: email,
            password: password,
            verificationCode: verificationCode,
        };
        const response = await axios.post(
            "https://120.24.177.83/auth/register",
            postData
        );
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
