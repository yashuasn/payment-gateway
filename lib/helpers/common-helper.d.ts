declare const getPaymentModeByName: (value: string, data: {
    [key: string]: any;
}) => any;
declare const isPaymentMethodEnabled: (value: string, data: {
    [key: string]: any;
}) => boolean;
declare const getCardType: (number: string) => "Visa" | "Mastercard" | "AMEX" | "Discover" | "Diners" | "Diners - Carte Blanche" | "JCB" | "Visa Electron" | "";
declare const encryptAES: (message: string, object: any) => any;
declare const encryptAESString: (data: string, authkey: string, authiv: string) => string;
declare const getCardImageProps: (type: any) => string;
declare const formatCardNumber: (value: string) => string;
declare const getUUID: () => string;
export { getPaymentModeByName, getCardType, getCardImageProps, encryptAES, encryptAESString, isPaymentMethodEnabled, formatCardNumber, getUUID };
