import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
}
export interface state {
}
export default class PaymentMethods extends React.Component<props, state> {
    constructor(props: props);
    isMappingExists: (mappingId: string) => boolean;
    render(): JSX.Element;
}
