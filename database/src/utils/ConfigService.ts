import * as dotenv from "dotenv";

dotenv.configDotenv();

export interface Config {
    secretKey             : string;
    accessTokenExpiration : number;
    refreshTokenExpiration: number;
    systemEmail           : string;
    systemEmailPassword   : string;
    verificationCodeLen   : number;
    verificationMaxCount  : number;
}

export class ConfigService {
    private static config: Config;
    private constructor() { }
    public static getConfig() {
        if (!ConfigService.config) {
            ConfigService.config = {
                secretKey             : process.env.SECRET_KEY || "",
                accessTokenExpiration : parseInt(process.env.ACCESS_TOKEN_EXPIRATION) || 0,
                refreshTokenExpiration: parseInt(process.env.REFRESH_TOKEN_EXPIRATION) || 0,
                systemEmail           : process.env.SYSTEM_EMAIL || "",
                systemEmailPassword   : process.env.SYSTEM_EMAIL_PASSWORD || "",
                verificationCodeLen   : parseInt(process.env.VERIFICATION_CODE_LEN) || 4,
                verificationMaxCount  : parseInt(process.env.VERIFICATION_MAX_COUNT) || 5,
            };
        }
        return ConfigService.config;
    }
}