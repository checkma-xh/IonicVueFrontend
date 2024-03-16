export interface Config {
    viteUserAvatarPath       : string,
    viteUserRefreshTokenPath : string,
    viteUserSearchHistoryPath: string,
    viteApplicationDomain    : string,
    viteApplicationPort      : number,
    viteMaxHistoryRecords    : number,
    vitePasswordMaxLen       : number,
    vitePasswordMinLen       : number,
    viteEmailMaxLen          : number,
    viteEmailMinLen          : number,
    viteVerificationCodeLen  : number,
    vitePasswordRegex        : RegExp,
    vitePasswordNumericRegex : RegExp,
    vitePasswordAlphaRegex   : RegExp,
    viteEmailRegex           : RegExp,
}

export class ConfigService {
    private static config: Config;
    private constructor() { }
    public static getConfig() {
        if (!ConfigService.config) {
            ConfigService.config = {
                viteUserAvatarPath       : import.meta.env.VITE_USER_AVATAR_PATH || "userAvatar",
                viteUserRefreshTokenPath : import.meta.env.VITE_USER_REFRESH_TOKEN_PATH || "userRefreshToken",
                viteUserSearchHistoryPath: import.meta.env.VITE_USER_SEARCH_HISTORY_PATH || "userSearchHistory",
                viteApplicationDomain    : import.meta.env.VITE_APPLICATION_DOMAIN,
                viteApplicationPort      : import.meta.env.VITE_APPLICATION_PORT,
                viteMaxHistoryRecords    : parseInt(import.meta.env.VITE_MAX_HISTORY_RECORDS) || 20,
                vitePasswordMaxLen       : parseInt(import.meta.env.VITE_PASSWORD_MAXLEN) || 64,
                vitePasswordMinLen       : parseInt(import.meta.env.VITE_PASSWORD_MINLEN) || 8,
                viteEmailMaxLen          : parseInt(import.meta.env.VITE_EMAIL_MAXLEN) || 64,
                viteEmailMinLen          : parseInt(import.meta.env.VITE_EMAIL_MINLEN) || 5,
                viteVerificationCodeLen  : parseInt(import.meta.env.VITE_VERIFICATION_CODE_LEN) || 4,
                vitePasswordRegex        : import.meta.env.VITE_PASSWORD_REGEX || /[a-zA-Z0-9`~!@#$%^&*()_\-+={}[\]\\|:;"',<>.?]{8,64}/,
                vitePasswordNumericRegex: import.meta.env.VITE_PASSWORD_NUMERIC_REGEX || /\d+/,
                vitePasswordAlphaRegex  : import.meta.env.VITE_ALPHA_REGEX || /[a-zA-Z]+/,
                viteEmailRegex          : import.meta.env.VITE_EMAIL_REGEX || /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            };
        }
        return ConfigService.config;
    }
}