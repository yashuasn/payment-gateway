import http, { vpaValidate, stageSecurepay, binApi } from "./http-common";
import PaymentMethodData, { authenticate, CardFeeCalculation, VpaValidateInterface, CardPaymentRequest, NetbankingPayment, BhimUPIPayment, WalletPayment, CashPayment, UpiPaymentPayload } from "./Models/sabpaisa-payment-types";



class TutorialDataService {
    getPaymentModes(clientCode: string = "", clienttxnId: string = "") {
        return http.get<Array<PaymentMethodData>>(`getPaymodeDetails?clientCode=${clientCode}&clienttxnId=${clienttxnId}`);
    }
    vpaAuthenticate({ username, password }: authenticate) {
        return vpaValidate.post('authenticate', { username, password })
    }
    vpaValidate({ vpa, bankName, token }: VpaValidateInterface) {
        return vpaValidate.post('vpa/validate', { vpa, bankName }, { headers: { token } })
    }
    upiPayment(payload: UpiPaymentPayload) {
        return stageSecurepay.post('REST/upi/upItransaction', payload);
    }
    cardFeeCalculation(payload: CardFeeCalculation) {
        return stageSecurepay.post<Array<CardFeeCalculation>>('cardFeeCalculation', payload);
    }
    cardPaymentRequest(payload: CardPaymentRequest) {
        return stageSecurepay.post('REST/card/confirmCardTransaction', payload);
    }
    netbankingPayment(payload: NetbankingPayment) {
        return stageSecurepay.post<Array<CardPaymentRequest>>('REST/nb/confirmNbTransaction', payload);
    }

    bhimUPIQrPayment(payload: BhimUPIPayment) {
        return stageSecurepay.post('REST/BQR/confirmBqr', payload);
    }
    walletPayment(payload: WalletPayment) {
        return stageSecurepay.post<Array<WalletPayment>>('REST/wallet/walletRequest', payload);
    }
    cashPayment(payload: CashPayment) {
        return stageSecurepay.post<Array<CashPayment>>('REST/cash/confirmCashTransaction', payload);
    }
    getCardDetails(binCode: string) {
        return binApi.post('getByBinCode/', { binCode, "giftCard": false }, { headers: { Authorization: "9566aefe-f683-11eb-b2b9-34e6ad2f65f6" } })
    }


}




export default new TutorialDataService();