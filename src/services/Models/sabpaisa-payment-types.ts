export default interface PaymentMethodData {
  activeMapping?: any | null,
  alertMessage?: any | null,
  amountType?: any | null,
  channelId?: any | null,
  clientCode?: any | null,
  clientId?: any | null,
  clientLogo?: any | null,
  clientName?: any | null,
  clientTxnid?: any | null,
  donationFlag?: any | null,
  donationList?: any | null,
  giftCardFlag?: any | null,
  isClientLogoFlag?: any | null,
  isCommercialFlag?: any | null,
  isPartnerBankLogo?: any | null,
  message?: any | null,
  partnerBankLogo?: any | null,
  payerEmail?: any | null,
  payerMobNumber?: any | null,
  payerName?: any | null,
  requestAmount?: any | null,
  spTxnId?: any | null,
}

export interface CardFeeCalculation {
  txnId?: any | null,
  clientId?: any | null,
  clientTxnId?: any | null,
  requestAmount?: any | null,
  mappingBean: {
    mappingId?: any | null,
    feeForward?: any | null,
    clientId?: any | null,
    paymodeId?: any | null,
    endpointId?: any | null,
    active?: any | null,
    paymode: {
      paymodeId?: any | null,
      paymodeType?: any | null,
      paymodeName?: any | null,
    },
    endpoint: {
      epId?: any | null,
      bankName?: any | null,
      bankId?: any | null,
      agrName?: any | null,
      epType?: any | null,
    }
  },
  payerEmailId?: any | null,
  payerPhone?: any | null
}

export interface CardPaymentRequest {
  [key: string]: any
}

export interface NetbankingPayment {
  [key: string]: any
}

export interface BhimUPIPayment {
  [key: string]: any
}

export interface WalletPayment {
  [key: string]: any
}

export interface CashPayment {
  [key: string]: any
}

export interface RtgsPayment {
  [key: string]: any
}

export interface NeftPayment {
  [key: string]: any
}

export interface ImpsPayment {
  [key: string]: any
}




export interface authenticate {
  username: string,
  password: string,
  [key: string]: any
}

export interface VpaValidateInterface {
  vpa?: string | any,
  bankName?: string,
  valid?:string | any,
  [key: string]: any
}

export interface MappingBeanInterface {
  mappingId?: any | null,
  feeForward?: any | null,
  clientId?: any | null,
  paymodeId?: any | null,
  endpointId?: any | null,
  active?: any | null,
  paymode: {
    paymodeId?: any | null,
    paymodeType?: any | null,
    paymodeName?: any | null,
  },
  endpoint: {
    epId?: any | null,
    bankName?: any | null,
    bankId?: any | null,
    agrName?: any | null,
    epType?: any | null,
  }
}
export interface CardFeeCalculationResInterface {
  txnId?: any | null,
  clientId?: any | null,
  clientTxnId?: any | null,
  payerPhone?: any | null,
  payerEmailId?: any | null,
  requestAmount?: any | null,
  mappingBean: {
    mappingId?: any | null,
    feeForward?: any | null,
    clientId?: any | null,
    paymodeId?: any | null,
    endpointId?: any | null,
    active?: any | null,
    paymode: {
      paymodeId?: any | null,
      paymodeType?: any | null,
      paymodeName?: any | null,
    },
    endpoint: {
      epId?: any | null,
      bankName?: any | null,
      bankId?: any | null,
      agrName?: any | null,
      epType?: any | null,
    }
  },
  amountBean: {
    gst?: any | null,
    paidAmount?: any | null,
    actualAmount?: any | null,
    convCharge?: any | null,
    endPointChargse?: any | null,
    amountType?: any | null,
    amountMessage?: any | null,
    amountFlag?: any | null,
  },
}


export interface UpiPaymentPayload {
  clientId?:any | null,
  paidAmount?:any | null,
  txnId?:any | null,
  clientTxnId?:any | null,
  clientName?:any | null,
  clientCode?:any | null,
  requestAmount: 50,
  payeeEmail?:any | null,
  payeeMobile?:any | null,
  amountType?:any | null,
  payMode: {
    paymodeId?:any | null,
    paymodeType?:any | null,
    paymodeName?:any | null,
  },
  endPoint: {
    epId?:any | null,
    bankName?:any | null,
    bankId?:any | null,
    agrName?:any | null,
    epName?:any | null,
    epType?:any | null,
  },
  udf1?:any | null,
}


export interface CashPaymentInterface {
  [key: string]: any
}
