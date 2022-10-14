import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class BankRedirect extends React.Component<props, state> {
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
          <div className="popupBody">
            <div className="redirectPopup">
              <div className="redirectPopup__content">
                <div className="flex-between">
                  <p className="payee text-white">Indian Institute of Technology</p>
                  <div className="align-right">
                    <div className="text-white text small">Paying</div>
                    <h2 className="amount text-white">₹1050</h2>
                  </div>
                </div>
                <div className="progressBar">
                  <div className="progress__container">
                    <div className="progress__loading"></div>
                  </div>
                </div>
                <h3 className="text-white text-center">Redirecting to Bank</h3>
                <p className="text-center text-white">Please wait...</p>
              </div>
              <div className="popupFooter">
                <img src="https://s3.amazonaws.com/sabpaisa/fd.svg" alt="sabpaisa logo" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}