import PaymentMethodData, { authenticate, CardFeeCalculation, VpaValidateInterface, CardPaymentRequest, NetbankingPayment, BhimUPIPayment, WalletPayment, CashPayment, UpiPaymentPayload } from "./Models/sabpaisa-payment-types";
declare class TutorialDataService {
    getPaymentModes(clientCode?: string, clienttxnId?: string): Promise<import("axios").AxiosResponse<PaymentMethodData[], any>>;
    vpaAuthenticate({ username, password }: authenticate): Promise<import("axios").AxiosResponse<any, any>>;
    vpaValidate({ vpa, bankName, token }: VpaValidateInterface): Promise<import("axios").AxiosResponse<any, any>>;
    upiPayment(payload: UpiPaymentPayload): Promise<import("axios").AxiosResponse<any, any>>;
    cardFeeCalculation(payload: CardFeeCalculation): Promise<import("axios").AxiosResponse<CardFeeCalculation[], any>>;
    cardPaymentRequest(payload: CardPaymentRequest): Promise<import("axios").AxiosResponse<any, any>>;
    netbankingPayment(payload: NetbankingPayment): Promise<import("axios").AxiosResponse<CardPaymentRequest[], any>>;
    bhimUPIQrPayment(payload: BhimUPIPayment): Promise<import("axios").AxiosResponse<any, any>>;
    walletPayment(payload: WalletPayment): Promise<import("axios").AxiosResponse<WalletPayment[], any>>;
    cashPayment(payload: CashPayment): Promise<import("axios").AxiosResponse<CashPayment[], any>>;
    getCardDetails(binCode: string): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: TutorialDataService;
export default _default;
