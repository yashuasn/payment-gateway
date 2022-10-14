import * as React from 'react';
import Lottie from 'react-lottie-player';
export interface props {
  updateState: (arg: number) => void,
  message:string,
  updateStateWithError:(resError:any,screenId:number)=>void,
}

export interface state {
}
export default class PaymentFailed extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0
    };
  }
  render() {
    const {message} = this.props;
    return (
      <React.Fragment>
        <div id="sdkPopup">
          <div className="popupBody">
            <div id="qrScreen">
              <div className="lp">
                <Lottie
                  loop
                  path={"https://assets3.lottiefiles.com/packages/lf20_qw8ewk7k.json"}
                  play
                  style={{ width: 250, height: 250 }}
                />
              </div>
              <p className="text-center text-bold mb80">Payment Failed</p>
              <p className="text-center">{message || 'Your payment wasn’t done.Please try again.If your account was debited, it will be credited within a week.'}</p>
            </div>
            <div className="btnGroup">
              <a onClick={() => this.props.updateStateWithError('closedModel',1)} className="btn btnPrimary">Try Again</a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}