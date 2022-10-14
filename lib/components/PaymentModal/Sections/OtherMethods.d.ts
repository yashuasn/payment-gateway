import * as React from 'react';
export interface props {
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
}
export interface state {
}
export default class OtherMethods extends React.Component<props, state> {
    constructor(props: props);
    isMappingExists: (mappingId: string) => boolean;
    componentDidMount(): void;
    render(): JSX.Element;
}
