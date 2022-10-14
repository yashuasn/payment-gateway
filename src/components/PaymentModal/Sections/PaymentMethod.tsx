import * as React from 'react';
import { isPaymentMethodEnabled } from '../../../helpers/common-helper';


export interface props {
  updateState: (arg: number) => void;
  paymentData: { [key: string]: any };

}

export interface state {
}

export default class PaymentMethods extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0
    };
  }
  isMappingExists = (mappingId: string) => {
    const { activeMapping } = this.props.paymentData;
    return isPaymentMethodEnabled(mappingId, activeMapping);
  }
  render() {
    const { activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;

    let shortName = "";
    let words = "DEMO CLIENT".split(" ");
    for (let index = 0; index < words.length; index++) {
      shortName = shortName += words[index][0];
    }; console.log(shortName);

    return (
      <React.Fragment>
        <div id="sdkPopup">
          <div className="popupHeader">
            <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
            <span>Checkout</span>
          </div>
          <div className="popupBody">
            <div className="clippedCard">

              <div className="clientDetails">
                <div className="client">
                  <h3 className="text-white partnerName" id="clientName">{payerName}</h3>
                </div>
                <div className="clientInfo">
                  <div className="field">
                    <p className="parameter">Client Code</p>
                    <p className="value">{clientCode}</p>
                  </div>
                  <div className="field">
                    <p className="parameter">Email ID</p>
                    <p className="value">{payerEmail}</p>
                  </div>
                  <div className="field">
                    <p className="parameter">Phone</p>
                    <p className="value">{payerMobNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="userDetails flex">
              <img src="https://s3.amazonaws.com/sabpaisa/edit_square.svg" alt="edit icon" onClick={() => this.props.updateState(0)} />
              <p id="phone">{payerMobNumber}</p>
              <p> | </p>
              <p id="mobile">{payerEmail}</p>
            </div> */}
            <div className="section">
              <h3 className="section-heading">PREFERRED PAYMENT METHODS</h3>
              <p className="section-text">Select payment methods using our secure payment system</p>

              <div className="roundedCard">
                {(this.isMappingExists("debit_card") || this.isMappingExists("credit_card")) ?

                  <a onClick={() => this.props.updateState(2)} className="cardSection">
                    <div className="flex-center">
                      <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/credit_card.svg" alt="credit card" /></div>
                      <div className="mode">
                        <p>Credit / Debit Card</p>
                      </div>
                    </div>
                    <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                  </a>
                  :
                  null
                }
                {/* <a onClick={() => this.props.updateState(23)} className="cardSection">
                  <div className="flex-center">
                    <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/credit_card.svg" alt="credit card" /></div>
                    <div className="mode">
                      <p>Debit Card</p>
                    </div>
                  </div>
                  <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                </a> */}
                {/* {this.isMappingExists("rupay_card") ?

                  <a onClick={() => this.props.updateState(24)} className="cardSection">
                    <div className="flex-center">
                      <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/credit_card.svg" alt="credit card" /></div>
                      <div className="mode">
                        <p>Rupay Card</p>
                      </div>
                    </div>
                    <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                  </a>
                  :
                  null
                } */}

                {/* <a onClick={() => this.props.updateState(3)} className="cardSection">
                  <div className="flex-center">
                    <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/upi.svg" alt="credit card" /></div>
                    <div className="mode">
                      <p>UPI / QR</p>
                    </div>
                  </div>
                  <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                </a> */}
                {this.isMappingExists("upi") ?
                  <a onClick={() => this.props.updateState(3)} className="cardSection">
                    <div className="flex-center">
                      <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/upi.svg" alt="credit card" /></div>
                      <div className="mode">
                        <p>UPI</p>
                      </div>
                    </div>
                    <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                  </a>
                  : null}

              </div>
            </div>
            <div className="section">
              <div className="flex-between">
                <h3 className="section-heading">More ways to pay</h3>
                {/* <img src="https://s3.amazonaws.com/sabpaisa/arrow_drop_down.svg" className = 'expandIcon up' alt="arrow up" /> */}
              </div>

              <div className="roundedCard" id='payMethods'>
                {this.isMappingExists("rupay_card") ?

                  <a onClick={() => this.props.updateState(4)} className="cardSection">
                    <div className="flex-center">
                      <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/account_balance.svg" alt="credit card" /></div>
                      <div className="mode">
                        <p>Netbanking</p>
                      </div>
                    </div>
                    <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                  </a>
                  : null}


                {(this.isMappingExists("rtgs") || this.isMappingExists("imps") || this.isMappingExists("cash") || this.isMappingExists("neft_rtgs")) ? <a onClick={() => this.props.updateState(5)} className="cardSection">
                  <div className="flex-center">
                    <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/rupee_blue.svg" alt="credit card" /></div>
                    <div className="mode">
                      <p>Cash and Others</p>
                    </div>
                  </div>
                  <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                </a>
                  : null}
                {this.isMappingExists("wallet") ? <a onClick={() => this.props.updateState(6)} className="cardSection">
                  <div className="flex-center">
                    <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/account_balance_wallet.svg" alt="credit card" /></div>
                    <div className="mode">
                      <p>Wallets</p>
                    </div>
                  </div>
                  <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                </a>
                  : null}
                {/* <a onClick={() => this.props.updateState(7)} className="cardSection">
                  <div className="flex-center">
                    <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/insights.svg" alt="credit card" /></div>
                    <div className="mode">
                      <p>EMI</p>
                    </div>
                  </div>
                  <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                </a> */}
                {this.isMappingExists("bhim_upi_qr") ?
                  <a onClick={() => this.props.updateState(9)} className="cardSection">
                    <div className="flex-center">
                      <div className="icon"><img src="https://s3.amazonaws.com/sabpaisa/qr_code.svg" alt="credit card" /></div>
                      <div className="mode">
                        <p>Scan QR</p>
                      </div>
                    </div>
                    <a className="icon"><img src="https://s3.amazonaws.com/sabpaisa/arrow_forward_ios.svg" alt="arrow icon" /></a>
                  </a> :
                  null}
              </div>
            </div>

            <div className="credits">
              <div className="text-center flex-center">
                <img src="https://s3.amazonaws.com/sabpaisa/security.svg" alt="secure" />
                <p>This payment is secured by SabPaisa</p>
              </div>
              <p className="text-center">By proceeding, you agree to our <a href="https://sabpaisa.in/privacy-policy">Terms & Privacy</a></p>
              <div className="partners">
                <img src="https://s3.amazonaws.com/sabpaisa/paymentauth.svg" alt="partners" />
              </div>
              <div className="text-center">
                <p className="text-small">Powered by</p>
                <img src="https://s3.amazonaws.com/sabpaisa/sabpaisa-logo.svg" alt="sabpaisa logo" className="clientlogo" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

