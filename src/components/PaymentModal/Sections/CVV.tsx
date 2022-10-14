import * as React from 'react';
import CardDetails from './CardDetails';
export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class CVV extends React.Component<props, state> {
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
              <img src="https://s3.amazonaws.com/sabpaisa/cardbackside.png" style={{width: '90%', margin: '20px'}} alt="timeout" />
              <h3 className="text-center text-bold">What is CVV?</h3>
              <p className="text-center">CVV number is the last three digits on the back of your card</p>
              <div className="btnGroup">
                <a onClick={() => this.props.updateState(2)} className="btn btnPrimary" >OK</a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}