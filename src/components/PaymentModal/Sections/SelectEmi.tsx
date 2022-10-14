import * as React from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface props {
  updateState: (arg: number) => void;
}

export interface state {
  dropdownOpen: boolean,
  submitted: boolean,
  currentState: number
}
export default class SelectEmi extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0,
      dropdownOpen: false

    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
                    <h3 className="form-heading text-dark text-center">Select EMI Tenure</h3>
                  </div>
                  <div id="select-box">
                    <div className="select-box">
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                          Select Bank
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>
                            <label className="select-box__option"  >
                              <img src="https://s3.amazonaws.com/sabpaisa/sbi.svg" alt="bank logo" className="banklogo" />
                              <span className="bankname">State Bank of India</span>
                            </label>
                          </DropdownItem>
                          <DropdownItem>
                            <label className="select-box__option"  >
                              <img src="https://s3.amazonaws.com/sabpaisa/hdfc.svg" alt="bank logo" className="banklogo" />
                              <span className="bankname">HDFC Bank</span>
                            </label>
                          </DropdownItem>
                          <DropdownItem>
                            <label className="select-box__option"  >
                              <img src="https://s3.amazonaws.com/sabpaisa/rblbank.svg" alt="bank logo" className="banklogo" />
                              <span className="bankname">RBL Bank</span>
                            </label>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                    </div>
                  </div>

                  <div className="emiTable">
                    <table>
                      <thead>
                        <tr>
                          <th>Tenure in months</th>
                          <th>Monthly Installments</th>
                          <th>Interest Paid</th>
                          <th>Total money Paid</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="emi-row">
                          <td>
                            <p className="radio">
                              <FormGroup tag="fieldset">
                                <FormGroup check>
                                  <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                  </Label>
                                </FormGroup>
                              </FormGroup>
                              {/* <input type="radio" id="3mo" name="radio-group" checked /> */}
                              <label >3 months @ 13 % p.a</label>
                            </p>
                          </td>
                          <td>₹2830.80</td>
                          <td>₹36</td>
                          <td>₹2966.80</td>
                          <td><a onClick={() => this.props.updateState(72)}> <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow forward" /></a></td>
                        </tr>
                        <tr className="emi-row">
                          <td>
                            <p className="radio">
                              <FormGroup tag="fieldset">
                                <FormGroup check>
                                  <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                  </Label>
                                </FormGroup>
                              </FormGroup>
                              {/* <input type="radio" id="6mo" name="radio-group" checked /> */}
                              <label >6 months @ 13 % p.a</label>
                            </p>
                          </td>
                          <td>₹2830.80</td>
                          <td>₹36</td>
                          <td>₹2966.80</td>
                          <td><a onClick={() => this.props.updateState(72)}> <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow forward" /></a></td>
                        </tr>
                        <tr className="emi-row">
                          <td>
                            <p className="radio">
                              <FormGroup tag="fieldset">
                                <FormGroup check>
                                  <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                  </Label>
                                </FormGroup>
                              </FormGroup>
                              {/* <input type="radio" id="18mo" name="radio-group" checked /> */}
                              <label >18 months @ 13 % p.a</label>
                            </p>
                          </td>
                          <td>₹2830.80</td>
                          <td>₹36</td>
                          <td>₹2966.80</td>
                          <td><a onClick={() => this.props.updateState(72)}> <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow forward" /></a></td>
                        </tr>
                        <tr className="emi-row">
                          <td>
                            <p className="radio">
                              <FormGroup tag="fieldset">
                                <FormGroup check>
                                  <Label check>
                                    <Input type="radio" name="radio1" />{' '}
                                  </Label>
                                </FormGroup>
                              </FormGroup>
                              {/* <input type="radio" id="24mo" name="radio-group" checked /> */}
                              <label >24 months @ 13 % p.a</label>
                            </p>
                          </td>
                          <td>₹2830.80</td>
                          <td>₹36</td>
                          <td>₹2966.80</td>
                          <td><a onClick={() => this.props.updateState(72)}> <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow forward" /></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >
      </React.Fragment >
    );

  }
}