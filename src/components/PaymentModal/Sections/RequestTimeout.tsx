import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class RequestTimeout extends React.Component<props, state> {
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
              <img src="https://s3.amazonaws.com/sabpaisa/rafiki.svg" alt="timeout" />
              <h3 className="text-center">Time's Up</h3>
              <p className="text-center">You have taken too long to make a payment. Please try again</p>
              <div className="btnGroup">
                <a onClick={() => this.props.updateState(1)} className="btn btnPrimary">Try Again</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}