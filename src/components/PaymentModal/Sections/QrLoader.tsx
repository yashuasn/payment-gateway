import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class QrLoader extends React.Component<props, state> {
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
          <div className="popupHeader">
            <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
            <span>Checkout</span>
          </div>
          <div className="popupBody">
            <div>
              <h2 className="sectionHeading-large text-blue">Review & Pay</h2>

              <div className="clippedCard">
                <div className="flex">
                  <div className="border-right">
                    <h3 className="thin text-white">Hi,</h3>
                    <h3 className="text-white partnerName" id="clientName">Rajiv Shukla</h3>
                  </div>
                  <div className="clientInfo">
                    <div className="field">
                      <p className="parameter">Client Code</p>
                      <p className="value">LPD112323</p>
                    </div>
                    <div className="field">
                      <p className="parameter">Email ID</p>
                      <p className="value">rajiv@gmail.com</p>
                    </div>
                    <div className="field">
                      <p className="parameter">Phone</p>
                      <p className="value">+91 8377848628</p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="dataTable">
                    <div className="field">
                      <p className="parameter">Bill Amount</p>
                      <p className="value">₹ 50000</p>
                    </div>
                    <div className="field">
                      <p className="parameter">MDR</p>
                      <p className="value">₹ 0.50</p>
                    </div>
                    <div className="field">
                      <p className="parameter">Applicable tax</p>
                      <p className="value">₹ 10.0</p>
                    </div>
                    <div className="field">
                      <p className="parameter">Convinience Fee of</p>
                      <p className="value">₹ 2.00</p>
                    </div>
                  </div>
                </div>
                <div className="totalRow">
                  <p>Total Amount</p>
                  <p>₹50012.50</p>
                </div>
              </div>

              <div className="buttonWrapper mb-3">
                <a className="changeMode" onClick={() => this.props.updateState(1)}>
                  <img src="https://s3.amazonaws.com/sabpaisa/arrow_back_ios_new.svg" alt="arrow left" />
                  <span>Change Mode of Payment</span>
                </a>
              </div>

              <div className="activity qrScreen">
                <div className="form form-collapsible">
                  <div className="form-header">
                    <h3 className="form-heading text-dark text-center mt-4">Generating QR Code</h3>
                  </div>

                  <div id="loader">
                    <svg className="loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                      <circle className="internal-circle" cx="60" cy="60" r="30"></circle>
                      <circle className="external-circle" cx="60" cy="60" r="50"></circle>
                    </svg>
                  </div>
                  <a onClick={() => this.props.updateState(81)} className="primaryButton flex-center"><img src="https://s3.amazonaws.com/sabpaisa/qr_white.svg" className="banklogo" alt="qr" /><span>Generate QR Code</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}