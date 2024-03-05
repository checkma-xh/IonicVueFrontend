import dotenv from "dotenv";
dotenv.configDotenv();

// 定义密码相关常量
const PASSWORD_MAXLEN = parseInt( process.env.PASSWORD_MAXLEN );
const PASSWORD_MINLEN = parseInt( process.env.PASSWORD_MINLEN );
const PASSWORD_REGEX = process.env.PASSWORD_REGEX;
const PASSWORD_NUMERIC_REGEX = process.env.PASSWORD_NUMERIC_REGEX;
const PASSWORD_ALPHA_REGEX = process.env.PASSWORD_ALPHA_REGEX;

export function passwordFormat ( password: string ) {
  return (
    password != undefined &&
    password != null &&
    password.length >= PASSWORD_MINLEN &&
    password.length <= PASSWORD_MAXLEN &&
    PASSWORD_REGEX.test( password ) &&
    PASSWORD_NUMERIC_REGEX.test( password ) &&
    PASSWORD_ALPHA_REGEX.test( password )
  );
}

// 定义邮箱相关常量
const EMAIL_MAXLEN = parseInt( process.env.EMAIL_MAXLEN );
const EMAIL_MINLEN = parseInt( process.env.EMAIL_MINLEN );
const EMAIL_REGEX = process.env.EMAIL_REGEX;

export function emailFormat ( email: string ) {
  return (
    email != undefined &&
    email != null &&
    email.length >= EMAIL_MINLEN &&
    email.length <= EMAIL_MAXLEN &&
    EMAIL_REGEX.test( email )
  );
}

// 定义验证码相关常量
const CODE_LEN = parseInt( process.env.CODE_LEN );

export function codeFormat ( code: string ) {
  return code != undefined && code != null && code.length == CODE_LEN;
}
