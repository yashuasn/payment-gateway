import * as React from 'react';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
export interface CardData {
    cardHolderName: string;
    cardNumber: number;
    cvv: number;
    expiry: string;
    cardType: string;
}
export interface props {
    updateState: (arg: number) => void;
    paymentData: any;
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
    updateStateWithError: (resError: any, screenId: number) => void;
}
export interface state {
    fields: {
        [key: string]: any;
    };
    submitted: false;
    currentState: 0;
    processing: Boolean;
    errors: {
        [key: string]: any;
    };
    isBackspace: boolean;
}
export default class RupayCardDetails extends React.Component<props, state> {
    constructor(props: props);
    makeApiReqCardPaymentProcessing: (paymentData: any, encCardBeanPayload: any) => Promise<void>;
    makeApiReqForPayment: (encReqPayload: {} | undefined) => void;
    onChangeRestError: () => void;
    validateCard(): boolean;
    cardSubmit: (e: any) => void;
    formatCardNumber: (value: string) => string;
    isRupayCard: (cardNum: any) => string;
    handleChange(field: any, e: any): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
