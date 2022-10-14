import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class PaymentError extends React.Component<props, state> {
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
            <div className="overlayModal flex-column-between">
              <img src="https://s3.amazonaws.com/sabpaisa/pana.svg" alt="crash" />
              <p className="text-center">Your payment wasn’t done.Please try again.If your account was debited, it will be credited within a week.</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}