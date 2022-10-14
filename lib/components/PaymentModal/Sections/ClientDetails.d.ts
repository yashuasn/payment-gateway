import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
}
export interface state {
    submitted: boolean;
    currentState: number;
    showFormPD: boolean;
    showFormCD: boolean;
}
export default class ClientDetails extends React.Component<props, state> {
    constructor(props: props);
    render(): JSX.Element;
}
