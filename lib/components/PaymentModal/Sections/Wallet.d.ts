import * as React from 'react';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
export interface props {
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
    updateStateWithError: (resError: any, screenId: number) => void;
}
export interface state {
    submitted: Boolean;
    currentState: number;
    processing: Boolean;
    mappingBeans: MappingBeanInterface;
    selectedMapping: {
        [key: string]: any;
    };
}
export default class Wallet extends React.Component<props, state> {
    constructor(props: props);
    getbankImage(id: number): any;
    selectWallet: (e: any) => void;
    makeApiReqWalletPayment: () => void;
    render(): JSX.Element;
}
