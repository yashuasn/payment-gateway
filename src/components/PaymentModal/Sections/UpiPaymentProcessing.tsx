import * as React from 'react';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class UpiPaymentProcessing extends React.Component<props, state> {
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
        <div className="activity paymentInProgress">
          <div className="form form-collapsible">
            <h2 className="text-center text-black text-bold">Payment in process..</h2>
            <p className="text-center text-black">Please open UPI app and approve transaction</p>
            <div className="timer flex">
              <img src="https://s3.amazonaws.com/sabpaisa/history_toggle_off.svg" alt="clock" />
              <span id="minutes">09m </span>
              <span> : </span>
              <span id="seconds"> 15s</span>
            </div>
          </div>

          <div id="loader">
            <svg className="loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle className="internal-circle" cx="60" cy="60" r="30"></circle>
              <circle className="external-circle" cx="60" cy="60" r="50"></circle>
            </svg>
          </div>

        </div>
      </React.Fragment>
    );

  }
}