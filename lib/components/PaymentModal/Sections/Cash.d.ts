import * as React from 'react';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
export interface props {
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
    updateStateWithError: (resError: any, screenId: 400) => void;
}
export interface state {
    readonly isClearable: boolean;
    readonly isDisabled: boolean;
    readonly isLoading: boolean;
    readonly isRtl: boolean;
    readonly isSearchable: boolean;
    processing: Boolean;
    mappingBeans: MappingBeanInterface;
    selectedMapping: {
        [key: string]: any;
    };
}
export default class Cash extends React.Component<props, state> {
    constructor(props: props);
    onChange: (e: any) => void;
    makeApiReqCashPayment: (e: any) => void;
    render(): JSX.Element;
}
