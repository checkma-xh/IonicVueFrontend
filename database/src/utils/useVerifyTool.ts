import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "./ConfigService";

const config = ConfigService.getConfig();

export async function tokenVerify(token: string): Promise<JwtPayload | null> {
    try {
        const decodedToken = jwt.verify(token, config.secretKey) as JwtPayload;
        return decodedToken;
    } catch (error) {
        console.error("token verification failed:", error);
        return null;
    }
}