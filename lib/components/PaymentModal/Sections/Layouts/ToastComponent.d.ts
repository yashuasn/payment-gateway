import React from 'react';
export interface ToastContents {
    Toast: JSX.Element;
    toastMessage: string;
    toastVariant: string;
}
export interface props {
    toastMessage: string;
    toastVariant: string;
}
export interface state {
    isVisible: false;
    toastMessage: '';
    toastvariant: '';
}
export default class ToastComponent extends React.Component<props, state> {
    constructor(props: props);
    render(): JSX.Element;
}
