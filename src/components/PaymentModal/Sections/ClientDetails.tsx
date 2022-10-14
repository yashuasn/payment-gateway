import * as React from 'react';
import { Input } from 'reactstrap';

export interface props {
  updateState: (arg: number) => void;
  paymentData: { [key: string]: any },
}

export interface state {
  submitted: boolean,
  currentState: number
  showFormPD: boolean,
  showFormCD: boolean,
}

export default class ClientDetails extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0,
      showFormCD: true,
      showFormPD: true,
    };
  }
  render() {
    const { activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
    const { showFormCD, showFormPD } = this.state;

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
            <div className="clippedCard flex">
              <div className="profileSection">

                {
                  clientLogo ?
                    <img src={clientLogo} alt="profile" className="profilePicture" /> :
                    <div className="clientTextLogo">
                      <span className="logoText">{shortName}</span>
                    </div>
                }

                {/* <h6 className="beneficiaryName text-white">{clientName?.toLowerCase()}</h6> */}
              </div>
              <div className="metaSection">
                <h2 className="partnerName text-white">{clientName}</h2>
                <p className="text-white">Client Code - <strong>{clientCode}</strong></p>
                {/* <h3 className="text-white amount">{requestAmount + " " + amountType}</h3> */}
              </div>
            </div>
            <div className="activity">
              <div className="form">
                <div className="form-header">
                  <h3 className="form-heading text-blue">Payment Details</h3>
                  <img src="https://s3.amazonaws.com/sabpaisa/arrow_drop_down.svg" className={`expandIcon  ${(showFormPD) && "down"}`} alt="arrow up" onClick={() => {
                    this.setState({ showFormPD: !showFormPD })
                  }} />
                </div>
                <form action="" className={`form-collapsible form-collapsible-client   ${(showFormPD) && "showForm"}`}>
                  <label >Client Code</label>
                  <div className="input inputWithIcon">
                    <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/sticky_note.svg" alt="" /></span>
                    <Input value={clientCode} readOnly />
                  </div>
                  <label >Full Name</label>
                  <div className="input inputWithIcon">
                    <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/person_pin.svg" alt="" /></span>
                    <Input value={payerName} readOnly />
                  </div>
                  <label >Amount</label>
                  <div className="input inputWithIcon">
                    <span className="inputIcon"><img height="19px" src="https://s3.amazonaws.com/sabpaisa/rupee.svg" alt="" /></span>
                    <Input value={requestAmount} readOnly />
                  </div>
                </form>
              </div>
              <div className="form">
                <div className="form-header">
                  <h3 className="form-heading text-blue">Contact Information</h3>
                  <img src="https://s3.amazonaws.com/sabpaisa/arrow_drop_down.svg" className={`expandIcon  ${(showFormCD) && "down"}`} alt="arrow up" onClick={() => {
                    this.setState({ showFormCD: !showFormCD })
                  }} />
                </div>
                <form action="" className={`form-collapsible form-collapsible-client  ${(showFormCD) && "showForm"}`}>
                  <label >Email ID</label>
                  <a className="input inputWithIcon">
                    <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/mail.svg" alt="" /></span>
                    <Input value={payerEmail} readOnly />
                  </a>
                  <label >Phone</label>
                  <a className="input inputWithIcon">
                    <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/settings_phone.svg" alt="" /></span>
                    <Input value={payerMobNumber} readOnly />
                  </a>
                </form>
              </div>
            </div>
            <a onClick={() => this.props.updateState(1)} className="primaryButton">Continue</a>
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
    )
  }
}