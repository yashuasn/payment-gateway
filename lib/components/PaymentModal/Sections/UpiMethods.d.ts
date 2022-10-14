import * as React from 'react';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
export interface props {
    updateState: (arg: number) => void;
    [key: string]: any;
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
    paymentData: {
        [key: string]: any;
    };
    updateStateWithError: (resError: any, screenId: number) => void;
}
export interface state {
    isVerified: Boolean;
    processing: boolean;
    isPaymentProceed: boolean;
    [key: string]: any;
}
export declare const isValidUPISyntax: (vpa: string) => boolean;
export default class UpiMethods extends React.Component<props, state> {
    constructor(props: props);
    onChangeUPI: (e: any) => void;
    makeReqForVallidation: () => Promise<void>;
    makeApiReqForUpiPayment: (paymentData: any, vpa: string) => Promise<void>;
    componentDidMount(): void;
    render(): JSX.Element;
}
