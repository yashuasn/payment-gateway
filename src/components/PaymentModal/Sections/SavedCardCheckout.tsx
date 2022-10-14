import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class SavedCardCheckout extends React.Component<props, state> {
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
        <div className="activity">
          <div className="form form-collapsible">
            <div className="form-header">
              <h3 className="form-heading text-dark">Enter Card Details</h3>
            </div>
            <div className="savedCard">
              {/* <div className="select customRadio">
                <label className="container">
                  <input type="checkbox" checked />
                  <span className="checkmark"></span>
                </label>
              </div> */}
              <div className="cardInfo">
                <p className="text-dark">State Bank of India</p>
                <p className="text-dark flex-center"><span>****3309</span> <img src="https://s3.amazonaws.com/sabpaisa/razorpay-with-all-cards-upi-seeklogo.svg" alt="" /></p>
                <p className="text-dark">Rajiv Shukla</p>
                <p className="text-dark">Expires 05/2024</p>
                <Form>
                  <FormGroup>
                    <Input type="text" name="cvv" id="cvv" placeholder="Enter CVV" className="input cvv" />
                  </FormGroup>
                </Form>
                <div className="flex checks">
                  {/* <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round"></span>
                  </label> */}
                  <p className="text-small">Save card as per new RBI guidelines.
                    <br /><a href="#" className="text-blue">Know More</a></p>
                </div>
              </div>
              <button className="delete"><img src="https://s3.amazonaws.com/sabpaisa/delete.svg" alt="" /></button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}