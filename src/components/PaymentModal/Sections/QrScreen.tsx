import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class QrScreen extends React.Component<props, state> {
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
              <p className="text-center text-bold">Scan QR using any UPI app to pay from your mobile</p>
              <div className="qrcode">
                <img src="https://s3.amazonaws.com/sabpaisa/QR.svg" alt="" />
              </div>
              <div className="credits">
                <div className="text-center">
                  <p className="text-small">Powered by</p>
                  <img src="https://s3.amazonaws.com/sabpaisa/sabpaisa-logo.svg" alt="sabpaisa logo" className="clientlogo" />
                </div>
              </div>
            </div>
            <img src="https://s3.amazonaws.com/sabpaisa/paymentInterfaces.svg" alt="upi" className="interface" />
          </div>
        </div>
      </React.Fragment>
    );

  }
}