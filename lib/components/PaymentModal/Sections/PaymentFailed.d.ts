import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
    message: string;
    updateStateWithError: (resError: any, screenId: number) => void;
}
export interface state {
}
export default class PaymentFailed extends React.Component<props, state> {
    constructor(props: props);
    render(): JSX.Element;
}
