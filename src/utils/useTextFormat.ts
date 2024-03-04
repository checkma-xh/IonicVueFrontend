// 定义密码相关常量
const PASSWORD_MAXLEN = 64;
const PASSWORD_MINLEN = 8;
const PASSWORD_REGEX = /[a-zA-Z0-9`~!@#$%^&*()_\-+={}[\]\\|:;"',<>.?]{8,64}/;
const PASSWORD_NUMERIC_REGEX = /\d+/;
const PASSWORD_ALPHA_REGEX = /[a-zA-Z]+/;

export function passwordFormat(password: string) {
    return (
        password != undefined &&
        password != null &&
        password.length >= PASSWORD_MINLEN &&
        password.length <= PASSWORD_MAXLEN &&
        PASSWORD_REGEX.test(password) &&
        PASSWORD_NUMERIC_REGEX.test(password) &&
        PASSWORD_ALPHA_REGEX.test(password)
    );
}

// 定义邮箱相关常量
const EMAIL_MAXLEN = 64;
const EMAIL_MINLEN = 5;
const EMAIL_REGEX =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function emailFormat(email: string) {
    return (
        email != undefined &&
        email != null &&
        email.length >= EMAIL_MINLEN &&
        email.length <= EMAIL_MAXLEN &&
        EMAIL_REGEX.test(email)
    );
}

// 定义验证码相关常量
const CODE_LEN = 4;

export function codeFormat(code: string) {
    return code != undefined && code != null && code.length == CODE_LEN;
}
