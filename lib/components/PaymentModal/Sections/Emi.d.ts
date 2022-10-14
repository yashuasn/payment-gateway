import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
}
export interface state {
    activeTab: string;
    submitted: boolean;
    currentState: number;
}
export default class Emi extends React.Component<props, state> {
    constructor(props: props);
    toggle(tab: string): void;
    render(): JSX.Element;
}
