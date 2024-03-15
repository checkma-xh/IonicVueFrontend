import * as dotenv from "dotenv";

dotenv.configDotenv();

export interface Config {
    secretKey: string;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
    systemEmail: string;
    systemEmailPassword: string;
    verificationCodeLen: number;
    verificationMaxCount: number;
    defaultAvatarUrl: string,
}

export class ConfigService {
    private static config: Config;
    private constructor() { }
    public static getConfig() {
        if (!ConfigService.config) {
            ConfigService.config = {
                secretKey             : process.env.SECRET_KEY || "",
                accessTokenExpiration : parseInt(process.env?.ACCESS_TOKEN_EXPIRATION) || 0,
                refreshTokenExpiration: parseInt(process.env?.REFRESH_TOKEN_EXPIRATION) || 0,
                systemEmail           : process.env.SYSTEM_EMAIL || "",
                systemEmailPassword   : process.env.SYSTEM_EMAIL_PASSWORD || "",
                defaultAvatarUrl      : process.env.DEFAULT_AVATAR_URL || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpb25pY29uIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZD0iTTI1OC45IDQ4QzE0MS45MiA0Ni40MiA0Ni40MiAxNDEuOTIgNDggMjU4LjljMS41NiAxMTIuMTkgOTIuOTEgMjAzLjU0IDIwNS4xIDIwNS4xIDExNyAxLjYgMjEyLjQ4LTkzLjkgMjEwLjg4LTIxMC44OEM0NjIuNDQgMTQwLjkxIDM3MS4wOSA0OS41NiAyNTguOSA0OHptMTI2LjQyIDMyNy4yNWE0IDQgMCAwMS02LjE0LS4zMiAxMjQuMjcgMTI0LjI3IDAgMDAtMzIuMzUtMjkuNTlDMzIxLjM3IDMyOSAyODkuMTEgMzIwIDI1NiAzMjBzLTY1LjM3IDktOTAuODMgMjUuMzRhMTI0LjI0IDEyNC4yNCAwIDAwLTMyLjM1IDI5LjU4IDQgNCAwIDAxLTYuMTQuMzJBMTc1LjMyIDE3NS4zMiAwIDAxODAgMjU5Yy0xLjYzLTk3LjMxIDc4LjIyLTE3OC43NiAxNzUuNTctMTc5UzQzMiAxNTguODEgNDMyIDI1NmExNzUuMzIgMTc1LjMyIDAgMDEtNDYuNjggMTE5LjI1eiIvPjxwYXRoIGQ9Ik0yNTYgMTQ0Yy0xOS43MiAwLTM3LjU1IDcuMzktNTAuMjIgMjAuODJzLTE5IDMyLTE3LjU3IDUxLjkzQzE5MS4xMSAyNTYgMjIxLjUyIDI4OCAyNTYgMjg4czY0LjgzLTMyIDY3Ljc5LTcxLjI0YzEuNDgtMTkuNzQtNC44LTM4LjE0LTE3LjY4LTUxLjgyQzI5My4zOSAxNTEuNDQgMjc1LjU5IDE0NCAyNTYgMTQ0eiIvPjwvc3ZnPg==",
                verificationCodeLen   : parseInt(process.env?.VERIFICATION_CODE_LEN) || 4,
                verificationMaxCount  : parseInt(process.env?.VERIFICATION_MAX_COUNT) || 5,
            };
        }
        return ConfigService.config;
    }
}