import axios from "axios";

export async function refresh(refreshToken: string) {
    try {
        const postData = { refreshToken: refreshToken };
        const response = await axios.post(
            "https://120.24.177.83/auth/refresh",
            postData
        );
        return response;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
