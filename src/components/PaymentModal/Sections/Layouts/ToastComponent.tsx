import React, { Component } from 'react'
import Toast from 'reactstrap';

export interface ToastContents {
    Toast: JSX.Element,
    toastMessage: string,
    toastVariant: string
}

export interface props  {
    toastMessage: string,
    toastVariant: string
}

export interface state {
  isVisible: false,
  toastMessage: '',
  toastvariant: ''
}

export default class ToastComponent extends React.Component<props, state> {

  constructor(props: props) {
    super(props);
    this.state = {
      isVisible: false,
      toastMessage: '',
      toastvariant: ''
    }
  }

  render() {
    return (
      <Toast
          className="d-inline-block m-1"
          bg={this.props.toastVariant.toLowerCase()}
        >
        <Toast.Body className={this.props.toastVariant === 'Dark' && 'text-white'}>
          {this.props.toastMessage}
        </Toast.Body>
      </Toast>
    )
  }
}