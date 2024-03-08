// 定义一个类型来表示验证码信息
export interface VerificationInfo {
    verificationCode: string;
    email: string;
    timestamp: number;
    verificationResult: boolean;
    verificationCount: number;
}

export class VerificationInfoMap {
    private static verificationInfoMap: Map<string, VerificationInfo>;
    private constructor() { }
    public static getVerificationInfoMap() {
        if (!VerificationInfoMap.verificationInfoMap) {
            VerificationInfoMap.verificationInfoMap = new Map();
        }
        return VerificationInfoMap.verificationInfoMap;
    }

    public static createVerificationInfo(verificationCode: string, receiverEmail: string) {
        const verificationInfo: VerificationInfo = {
            verificationCode,
            email: receiverEmail,
            timestamp: Date.now(),
            verificationResult: false,
            verificationCount: 0,
        };
        VerificationInfoMap.verificationInfoMap.set(receiverEmail, verificationInfo);

        setTimeout(() => {
            VerificationInfoMap.verificationInfoMap.delete(receiverEmail);
        }, 120000);
    }
}