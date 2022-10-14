import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface props {
  updateState: (arg: number) => void;
}

export interface state {
}
export default class EmiCardDetails extends React.Component<props, state> {
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
            <div>
              <div className="activity">
                <div className="form form-collapsible">
                  <div className="form-header">
                    <h3 className="form-heading text-dark text-center">Enter Card Details</h3>
                  </div>

                  <Form>
                    <div className="field-bordered flex-between">
                      <div className="bank flex-center">
                        <img src="https://s3.amazonaws.com/sabpaisa/hdfc.svg" alt="bank logo" className="banklogo" />
                        <span className="bankname">HDFC Bank</span>
                      </div>
                      <p id="emiTenure" className="text-bold">
                        6 Months
                      </p>
                    </div>
                    <FormGroup>
                      <Label for="nameOnCard">Cardholder Name</Label>
                      <a className="input">
                        <Input type="text" name="cardholder" id="nameOnCard" placeholder="Enter your Name on Card" />
                      </a>
                    </FormGroup>
                    <FormGroup>
                      <Label for="cardNumber">Card Number</Label>
                      <a className="input">
                        <Input type="text" name="cardnumber" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                        <img src="https://s3.amazonaws.com/sabpaisa/rupay.svg" alt="card type" />
                      </a>
                    </FormGroup>
                    <div className="flex-between">
                      <FormGroup>
                        <div className="half-input">
                          <Label for="cvv">CVC / CVV</Label>
                          <a className="input">
                            <Input type="text" name="cvv" id="cvv" placeholder="3 digits" />
                          </a>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className="half-input">
                          <Label for="expdate">Exp. Date</Label>
                          <a className="input">
                            <Input type="text" name="expdate" id="expdate" placeholder="MM/YY" />
                          </a>
                        </div>

                      </FormGroup>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <a href="#" className="primaryButton">Continue</a>
          </div>
        </div>
      </React.Fragment>
    );

  }
}