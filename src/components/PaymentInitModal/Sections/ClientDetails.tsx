import axios from 'axios';
import * as React from 'react';
import { Input } from 'reactstrap';
import { encryptAESString, getUUID } from '../../../helpers/common-helper';
import { getCardTypeByValue } from '../../../utils/cardTypes';

export interface props {
  transUserPassword: string;
  transUserName: string;
  authkey: string;
  authiv: string;
  callbackUrl: string;
  amount: number;
  email: string;
  fullName: string;
  phone_number: number;
  isResponsed: boolean;
  [key: string]: any
}

export interface state {
  phone_number: string | number;
  submitted: boolean;
  currentState: number;
  clientCode: string;
  fullName: string,
  email: string,
  amount: string,
  [key: string]: any,
  showFormPD: boolean,
  showFormCD: boolean,

}
export default class ClientDetails extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0,
      phone_number: "",
      clientCode: "",
      fullName: "",
      email: "",
      amount: "",
      showFormCD: true,
      showFormPD: true,

    };
  }

  //   var config = {
  //     headers: {
  //         'Content-Length': 0,
  //         'Content-Type': 'text/plain'
  //     },
  //    responseType: 'text'
  // };
  componentDidMount(): void {
    this.setState({ ...this.props });
  }

  componentDidUpdate(prevProps: Readonly<props>): void {
    if (prevProps.isResponsed !== this.props.isResponsed) {
      this.setState({ ...this.props });
    }
  }

  onchangeHandler = (e: any, field: string) => {
    const { value } = e.target;
    if (field === "phone_number" || field === "amount") {
      const regex = /^\d+$/;
      regex.test(value || "12") && this.setState({ [field]: value });
    } else {
      this.setState({ [field]: value });
    }

  }

  getEncData = () => {
    const { fullName, email, amount, clientCode, phone_number } = this.state;
    const { transUserName, transUserPassword, callbackUrl, authkey, authiv } = this.props;
    let data = `payerName=${fullName}&payerEmail=${email}&payerMobile=${phone_number}&clientTxnId=${getUUID()}&amount=${amount}&clientCode=${clientCode}&transUserName=${transUserName}&transUserPassword=${transUserPassword}&callbackUrl=${callbackUrl}&channelId=W&mcc=x`
    // console.log(data)
    let enc: string = encryptAESString(data, authkey, authiv)
    return enc;
  };



  render() {
    const { showFormCD, showFormPD } = this.state;

    const { onchangeHandler } = this;
    const { phone_number, clientCode, fullName, email, amount } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const disable = (!phone_number || !clientCode || !fullName || !amount || !emailRegex.test(email));
    return (
      <React.Fragment>
        <div id="sdkPopup">
          <div className="popupHeader">
            <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
            <span>Payment Details</span>
          </div>
          <div className="popupBody">

            <form action="https://stage-securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1" method="post">
              {/* <form onSubmit={this.testInput} method="post"> */}
              <div className="activity">
                <input type="hidden" name="encData"
                  value={!disable ? this.getEncData() : ""}
                  id="frm1" />
                <input type="hidden" name="clientCode" value={clientCode} id="frm2"></input>
                <div className="form ">
                  <div className="form-header">
                    <h3 className="form-heading text-blue">Payment Details</h3>
                    <img src="https://s3.amazonaws.com/sabpaisa/arrow_drop_down.svg" className={`expandIcon  ${(showFormPD) && "down"}`} alt="arrow up" onClick={() => {
                      this.setState({ showFormPD: !showFormPD })
                    }} />
                  </div>
                  <form action="" className={`form-collapsible form-collapsible-client  ${(showFormPD) && "showForm"}`}>
                    <label >Client Code</label>
                    <div className="input inputWithIcon">
                      <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/sticky_note.svg" alt="" /></span>
                      <Input value={clientCode} onChange={(e) => onchangeHandler(e, "clientCode")} required />
                    </div>
                    <label >Full Name</label>
                    <div className="input inputWithIcon">
                      <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/person_pin.svg" alt="" /></span>
                      <Input required value={fullName} onChange={(e) => onchangeHandler(e, "fullName")} />
                    </div>
                    <label >Amount</label>
                    <div className="input inputWithIcon">
                      <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/rupee.svg" alt="" /></span>
                      <Input required value={amount} onChange={(e) => onchangeHandler(e, "amount")} />
                    </div>
                  </form>
                </div>
                <div className="form ">
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
                      <Input required value={email} type="email" onChange={(e) => onchangeHandler(e, "email")} />
                    </a>
                    <label >Phone</label>
                    <a className="input inputWithIcon">
                      <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/settings_phone.svg" alt="" /></span>
                      <Input maxLength={13} required type='text' value={phone_number} onChange={(e) => onchangeHandler(e, "phone_number")} />
                    </a>
                  </form>
                </div>
              </div>
              {!disable && <button type="submit" className="primaryButton">Continue</button>}
            </form>
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