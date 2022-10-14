import React, { Component } from "react";
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentMethodData, { MappingBeanInterface } from "../../services/Models/sabpaisa-payment-types";
export interface PgModalProps {
    isOpen?: boolean;
    clientCode: string;
    clientTxnId: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    additionalClass?: string;
}
declare type State = PaymentMethodData & {
    submitted: boolean;
    isOpen: boolean | undefined;
    currentState: number;
    errorMessage: string;
    paymentData: {
        [key: string]: any;
    };
    activeMappings: {}[];
};
export default class PgModal extends Component<PgModalProps, State> {
    constructor(props: PgModalProps);
    updateState: (counterNumber: number) => void;
    getPaymentModes: () => void;
    makeApiReqCardFeeCalculation(payload: MappingBeanInterface): void;
    updateStateWithError: (resError: any, screenId: number) => void;
    componentDidMount(): void;
    renderComponent: () => any;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export {};
