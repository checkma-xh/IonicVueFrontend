import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.configDotenv();

const SECRET_KEY = process.env.SECRET_KEY;

export async function tokenVerify(token: string) {
    try {
        const decodeToken = jwt.verify(token, SECRET_KEY);
        return decodeToken;
    } catch (error) {
        console.log("Token verification failed.", error);
        return null;
    }
}