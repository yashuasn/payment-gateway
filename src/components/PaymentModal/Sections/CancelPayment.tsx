import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class CancelPayment extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0
    };
  }
  render() {
    return (
      <React.Fragment>
        <div id="sdkPopup" className="popupOverlay">
          <div className="popupHeader">
            <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
            <span>Checkout</span>
          </div>
          <div className="popupBody">

          </div>
          <div id="overlayContent">
            <div className="overlayModal">
              <h2 className="text-center">CANCEL PAYMENT ?</h2>
              <p className="text-center">Your payment is ongoing. Are you sure you want to cancel the payment?</p>
              <div className="btnGroup">
                <a href="#" className="btn btnNeutral">Yes</a>
                <a href="#" className="btn btnPrimary">No</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}