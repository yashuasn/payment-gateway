import * as React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

export interface props {
  updateState: (arg: number) => void;
}

export interface state {
  activeTab: string,
  submitted: boolean,
  currentState: number
}
export default class Emi extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0,
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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
                    <h3 className="form-heading text-dark">EMI</h3>
                  </div>
                  <p className="textBeforeSection">Select Your Bank</p>
                  <div className="bankList">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >Credit Card</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >Debit Card</NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <div className="bank-row">
                              <div className="bank flex-center">
                                <img src="https://s3.amazonaws.com/sabpaisa/sbi.svg" alt="bank logo" className="banklogo" />
                                <span className="bankname">State Bank of India</span>
                              </div>
                              <a href="selectEMI.html" className="flex">
                                <span className="interest">15 % interest</span>
                                <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow foward" />
                              </a>
                            </div>
                            <div className="bank-row">
                              <div className="bank flex-center">
                                <img src="https://s3.amazonaws.com/sabpaisa/hdfc.svg" alt="bank logo" className="banklogo" />
                                <span className="bankname">HDFC Bank</span>
                              </div>
                              <a href="selectEMI.html" className="flex">
                                <span className="interest">12.9 - 15 % interest</span>
                                <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow foward" />
                              </a>
                            </div>
                            <div className="bank-row">
                              <div className="bank flex-center">
                                <img src="https://s3.amazonaws.com/sabpaisa/rblbank.svg" alt="bank logo" className="banklogo" />
                                <span className="bankname">RBL Bank</span>
                              </div>
                              <a href="selectEMI.html" className="flex">
                                <span className="interest">13 % interest</span>
                                <img src="https://s3.amazonaws.com/sabpaisa/blue_arrow_forward_ios.svg" alt="arrow foward" />
                              </a>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="6">
                            <h4>hi</h4>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}