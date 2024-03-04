import axios from "axios";

export async function verify(verificationCode: string) {
    try {
        const postData = { verificationCode: verificationCode };
        const response = await axios.post(
            "https://120.24.177.83/auth/verification-code/verify",
            postData
        );
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
