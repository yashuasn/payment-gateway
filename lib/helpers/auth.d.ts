export class Auth {
    static OPENSSL_CIPHER_NAME: string;
    static CIPHER_KEY_LEN: number;
    static jointimes: (char: any, len: any) => any;
    static pad: (str: any, char: any, len: any) => any;
    static encrypt: (plain_text: any, encryptionMethod: any, secret: any, iv: any) => string;
    static decrypt: (encryptedMessage: any, encryptionMethod: any, secret: any, iv: any) => string;
    static _fixpay: (key: any) => any;
    static _encrypt: (key: any, iv: any, data: any) => string;
    static _decrypt: (key: any, iv: any, data: any) => string;
    static _checksum: (secretKey: any, postData: any) => string;
}
