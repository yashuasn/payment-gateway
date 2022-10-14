import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
}
export interface state {
    dropdownOpen: boolean;
    submitted: boolean;
    currentState: number;
}
export default class SelectEmi extends React.Component<props, state> {
    constructor(props: props);
    toggle(): void;
    render(): JSX.Element;
}
