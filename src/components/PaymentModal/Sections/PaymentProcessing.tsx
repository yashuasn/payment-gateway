import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class PaymentProcessing extends React.Component<props, state> {
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
        <div id="sdkPopup">
          <div className="popupBody">
            <div id="qrScreen">
              <div id="greenLoader"></div>
              <p className="text-center text-bold mb80" >Processing Payment</p>
              <p className="text-small warning-text text-center"> Please do not close this window or click the Back/Refresh button on your browser. All refunds will be net of charges</p>
              <div className="credits">
                <div className="text-center">
                  <img src="https://s3.amazonaws.com/sabpaisa/security.svg" alt="sabpaisa logo" />
                  <p className="text-small text-secondary">Pay Securely</p>
                </div>
                <div className="text-center mt30" >
                  <p className="text-small">powered by</p>
                  <img src="https://s3.amazonaws.com/sabpaisa/sabpaisa-logo.svg" alt="sabpaisa logo" className="clientlogo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}