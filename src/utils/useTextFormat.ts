import { ConfigService } from "./ConfigService";

const config = ConfigService.getConfig();

export function passwordFormat(password: string) {
  return (
    password != undefined &&
    password != null &&
    password.length >= config.vitePasswordMinLen &&
    password.length <= config.vitePasswordMaxLen &&
    config.vitePasswordRegex.test(password) &&
    config.vitePasswordNumericRegex.test(password) &&
    config.vitePasswordAlphaRegex.test(password)
  );
}


export function emailFormat(email: string) {
  return (
    email != undefined &&
    email != null &&
    email.length >= config.viteEmailMinLen &&
    email.length <= config.viteEmailMaxLen &&
    config.viteEmailRegex.test(email)
  );
}


export function verificationCodeFormat(verificationCode: string) {
  return verificationCode != undefined && verificationCode != null && verificationCode.length == config.viteVerificationCodeLen;
}
