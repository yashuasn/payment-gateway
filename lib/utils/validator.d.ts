export const EMPTY_CARD_NUMBER: "Enter a card number";
export const EMPTY_EXPIRY_DATE: "Enter an expiry date";
export const EMPTY_CVC: "Enter a CVC";
export const EMPTY_ZIP: "Enter a ZIP code";
export const INVALID_CARD_NUMBER: "Card number is invalid";
export const INVALID_EXPIRY_DATE: "Expiry date is invalid";
export const INVALID_CVC: "CVC is invalid";
export const MONTH_OUT_OF_RANGE: "Expiry month must be between 01 and 12";
export const YEAR_OUT_OF_RANGE: "Expiry year cannot be in the past";
export const DATE_OUT_OF_RANGE: "Expiry date cannot be in the past";
export function hasCardNumberReachedMaxLength(currentValue: any): boolean;
export function isNumeric(e: any): boolean;
export function validateLuhn(cardNumber: any): boolean;
export function getCardNumberError(cardNumber: any, cardNumberValidator: any, { errorMessages }?: {
    errorMessages?: {} | undefined;
}): any;
export function getExpiryDateError(expiryDate: any, expiryValidator: any, { errorMessages }?: {
    errorMessages?: {} | undefined;
}): any;
export function getCVCError(cvc: any, cvcValidator: any, { cardType, errorMessages }?: {
    cardType: any;
    errorMessages?: {} | undefined;
}): any;
export function getZIPError(zip: any, { errorMessages }?: {
    errorMessages?: {} | undefined;
}): any;
