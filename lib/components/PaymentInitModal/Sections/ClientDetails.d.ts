import * as React from 'react';
export interface props {
    transUserPassword: string;
    transUserName: string;
    authkey: string;
    authiv: string;
    callbackUrl: string;
    amount: number;
    email: string;
    fullName: string;
    phone_number: number;
    isResponsed: boolean;
    [key: string]: any;
}
export interface state {
    phone_number: string | number;
    submitted: boolean;
    currentState: number;
    clientCode: string;
    fullName: string;
    email: string;
    amount: string;
    [key: string]: any;
    showFormPD: boolean;
    showFormCD: boolean;
}
export default class ClientDetails extends React.Component<props, state> {
    constructor(props: props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<props>): void;
    onchangeHandler: (e: any, field: string) => void;
    getEncData: () => string;
    render(): JSX.Element;
}
