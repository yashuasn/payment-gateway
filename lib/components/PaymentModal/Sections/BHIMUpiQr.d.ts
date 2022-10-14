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
    readonly isClearable: boolean;
    readonly isDisabled: boolean;
    readonly isLoading: boolean;
    readonly isRtl: boolean;
    readonly isSearchable: boolean;
    processing: Boolean;
    selectedMapping: any;
    mappingBeans: any;
}
export default class BHIMUpiQr extends React.Component<props, state> {
    constructor(props: props);
    makeApiReqBhimUPIPayment(paymentData: any, selectedMapData: any): void;
    proceedBHIMUPIQRRequest: () => void;
    onChange: (e: any) => void;
    render(): JSX.Element;
}
