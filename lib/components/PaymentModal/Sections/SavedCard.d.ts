import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
}
export interface state {
}
export default class SavedCard extends React.Component<props, state> {
    constructor(props: props);
    render(): JSX.Element;
}
