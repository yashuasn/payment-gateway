export const DEFAULT_CVC_LENGTH: 3;
export const DEFAULT_ZIP_LENGTH: 5;
export const DEFAULT_CARD_FORMAT: RegExp;
export const CARD_TYPES: {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
    code: {
        name: string;
        length: number;
    };
}[];
export function getCardTypeByValue(value: any): {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
    code: {
        name: string;
        length: number;
    };
};
export function getCardTypeByType(type: any): {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
    code: {
        name: string;
        length: number;
    };
};
