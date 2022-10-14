import * as React from 'react';
import Lottie from 'react-lottie-player';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class PaymentSuccess extends React.Component<props, state> {
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
              <div className="lp" >
                <Lottie
                  loop
                  path={"https://assets9.lottiefiles.com/packages/lf20_rc5d0f61.json"}
                  play
                  style={{ width: 250, height: 250 }}
                />
              </div>
              <p className="text-center text-bold mb80" >Payment Successful</p>
            </div>
            <div className="btnGroup">
              <a href="#" className="btn btnPrimary">Get Receipt</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}