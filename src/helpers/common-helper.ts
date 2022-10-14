import CryptoJS from "crypto-js";


const getPaymentModeByName = (value: string, data: { [key: string]: any }) => {
    const objData: { [key: string]: any } = {
        debit_card: 1,
        credit_card: 2,
        net_banking: 3,
        cash: 4,
        neft_rtgs: 5,
        upi: 6,
        wallet: 7,
        bhim_upi_qr: 8,
        rupay_card: 12,
        rtgs: 13,
        imps: 10
    }

    // return (obj[this.state.currentState]);
    return data.filter((obj: any) => obj.paymodeId == (objData[value]));
}
const isPaymentMethodEnabled = (value: string, data: { [key: string]: any }) => {
    let response = getPaymentModeByName(value, data);
    if (response && response.length) {
        return true;
    } else {
        return false;
    }
}
const getCardType = (number: string) => {
    // visa
    let cardObj: { name: string, icon: string } = { name: "", icon: "" };
    number = number.replace(/\s/g, '');
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";
    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}
const encryptAES = (message: string, object: any) => {

    let encObj: any = {};
    for (const key in object) {
        encObj[key] = CryptoJS.AES.encrypt(object[key], "sabpaisa").toString()
    }
    return encObj;
}

const encrypt = function (plain_text: any, encryptionMethod: any, secret: any, ivString: any) {

    const msg = plain_text;

    // key & iv - 128-bit (16 byte)
    const key = CryptoJS.enc.Utf8.parse(secret);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    // AES-128
    const enc = CryptoJS.AES.encrypt(msg, key, {
        iv,
        mode: CryptoJS.mode.CBC,
    }).ciphertext.toString(CryptoJS.enc.Base64);
    return enc;
}

const encryptAESString = (data: string, authkey: string, authiv: string): string => {
    let encData = encrypt(data, "aes-128-cbc", authkey, authiv);

    return encData;
}
const getCardImageProps = (type: any) => {
    // console.log(images)
    // return {
    //     'aria-label': type ? type : 'Placeholder card',
    //     children: images[type ? type : 'placeholder'] || images['placeholder'],
    //     width: '1.5em',
    //     height: '1em',
    //     viewBox: '0 0 24 16',
    // };
    let object: Array<string> = [
        "amex",
        "dinersclub",
        "discover",
        "hipercard",
        "jcb",
        "unionpay",
        "mastercard",
        "placeholder",
        "visa",
        "rupay"
    ]
    if (object.find(data => data == type)) {
        let ext = "png";
        if (type == "rupay") ext = "svg";
        return ("https://s3.amazonaws.com/sabpaisa/" + type + "." + ext)
    } else {
        return ("https://s3.amazonaws.com/sabpaisa/placeholder.png")
    }
}
const formatCardNumber = (value: string) => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts: string[] = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
        return parts.join(" ");
    } else {
        return value;
    }
};
const getUUID = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });

export { getPaymentModeByName, getCardType, getCardImageProps, encryptAES, encryptAESString, isPaymentMethodEnabled, formatCardNumber, getUUID };
