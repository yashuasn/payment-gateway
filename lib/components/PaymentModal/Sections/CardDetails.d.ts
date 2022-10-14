import * as React from 'react';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
export interface CardData {
    cardholder: string;
    cardNumber: number;
    cvv: number;
    expiry: string;
    cardType: string;
}
export interface props {
    updateState: (arg: number) => void;
    updateStateWithError: (resError: any, screenId: number) => void;
    paymentData: any;
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
}
export interface state {
    fields: {
        [key: string]: any;
    };
    submitted: false;
    currentState: 0;
    activeCard: string;
    processing: Boolean;
    errors: {
        [key: string]: any;
    };
    isBackspace: boolean;
}
export default class CardDetails extends React.Component<props, state> {
    constructor(props: props);
    isMappingExists: (mappingId: string) => boolean;
    makeApiReqCardPaymentProcessing: (paymentData: any, encCardBeanPayload: any) => Promise<void>;
    makeApiReqForPayment: (encReqPayload: {} | undefined) => void;
    onChangeRestError: () => void;
    validateCard(): boolean;
    cardSubmit(e: any): void;
    handleChange(field: any, e: any): Promise<void>;
    switchPaymentMethod: (method: string) => void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<state>, snapshot?: any): void;
    renderCircleCheck: (tab: string) => JSX.Element;
    render(): JSX.Element;
}
