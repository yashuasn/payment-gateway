import * as React from 'react';
import sabpaisaService from '../../../services/sabpaisa-service';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CardFeeCalculation, MappingBeanInterface, UpiPaymentPayload } from '../../../services/Models/sabpaisa-payment-types';
import { getPaymentModeByName } from '../../../helpers/common-helper';
export interface props {
  updateState: (arg: number) => void;
  [key: string]: any,
  makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
  paymentData: { [key: string]: any },
  updateStateWithError: (resError: any, screenId: number) => void,
}

export interface state {
  isVerified: Boolean,
  processing: boolean,
  isPaymentProceed: boolean,
  [key: string]: any,

}

export const isValidUPISyntax = (vpa: string) => {
  const upiRegExp = /^[\w.-]+@[\w.-]+$/;
  return upiRegExp.test(vpa)
}


export default class UpiMethods extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      currentState: 0,
      isVerifying: false,
      isVerified: false,
      processing: false,
      isPaymentProceed: false,
      vpa: ''
    };
  }


  onChangeUPI = (e: any) => {
    const { value } = e.target;
    this.setState({ vpa: value, isVerified: false, isPaymentProceed: false })
  }

  // UPI Verification 
  makeReqForVallidation = async () => {

    const { vpa } = this.state;
    const payload = {
      username: "VPA_VALIDATION",
      password: "SABPAISA"
    }
    const upiRegExp = /^[\w.-]+@[\w.-]+$/;


    if (isValidUPISyntax(vpa)) {
      try {
        this.setState({ isVerifying: true, isVerified: false, error: "", isPaymentProceed: false });
        const response = await sabpaisaService.vpaAuthenticate(payload);
        const { token } = response.data;
        const response2 = await sabpaisaService.vpaValidate({ vpa, bankName: 'CashFree', token })
        this.setState({ isVerifying: false, isVerified: response2.data.valid });

      } catch (error: any) {

        error = (error.response.data && error.response.data.errorMessage) || error.message || "UPI id Verification failed";
        this.setState({ isVerifying: false, isPaymentProceed: true });
      }
    }

  }


  makeApiReqForUpiPayment = async (paymentData: any, vpa: string) => {
    const { mappingBean, amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, clientTxnId, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = paymentData;
    const { endpoint, paymode } = mappingBean;

    this.setState({ processing: true })

    const payload: UpiPaymentPayload = {
      clientId,
      paidAmount: amountBean["paidAmount"],
      txnId: spTxnId,
      clientTxnId,
      clientName,
      clientCode,
      requestAmount,
      payeeEmail: payerEmail,
      payeeMobile: payerMobNumber,
      amountType,
      payMode: paymode,
      endPoint: endpoint,
      udf1: vpa,
    }

    try {
      sabpaisaService.upiPayment(payload)
        .then(response => {
          this.setState({ processing: false });
          if (response.data.bankUrl) {
            window.open(response.data.bankUrl, "_blank")

          }
        })
        .catch(err => {
          // console.log(err)
          this.props.updateStateWithError(err, 400);
          this.setState({ processing: false });
        })

    } catch (error: any) {
      // console.error(error);
      // alert(error.message)
      this.props.updateStateWithError(error, 400);
      this.setState({ processing: false })

    }


  }




  // LifeCycle methods

  componentDidMount() {
    const { paymentData } = this.props;
    const upiDetails = (paymentData && paymentData.activeMapping.length) ? (getPaymentModeByName("upi", paymentData.activeMapping))[0] : {};
    let data = { ...upiDetails }
    this.props.makeApiReqCardFeeCalculation(data);

  }

  render() {
    const { makeReqForVallidation, onChangeUPI, makeApiReqForUpiPayment, state, props } = this;
    const { isVerified, isVerifying, vpa, processing, isPaymentProceed } = state;
    const { paymentData } = props;
    const { amountBean } = paymentData
    const isRenderUpi = Object.hasOwn(amountBean, 'paidAmount');



    return (
      <React.Fragment>
        <div className="activity methods">
          <div className="form form-collapsible">
            {/* <div className="form-header">
              <h3 className="form-heading text-dark px-2">UPI</h3>
            </div> */}
            {/* <div className="flex payMethods">
              <a href="#" className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/gpay.svg" alt="gpay" />
                <span>Gpay</span>
              </a>
              <a href="#" className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/phonepe.svg" alt="gpay" />
                <span>Phonepe</span>
              </a>
              <a href="#" className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/paytm.svg" alt="gpay" />
                <span>Paytm</span>
              </a>
              <a href="#" className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/bhim.svg" alt="gpay" />
                <span>Bhim Upi</span>
              </a>
            </div> */}
            {isRenderUpi && <Form>
              <FormGroup>

                <Label for="upiId">Enter UPI ID</Label>
                <div className="input leftInput">
                  <Input type="text" name="upiId" value={vpa} id="upiId" onChange={onChangeUPI} placeholder="example@upi" />
                  {!isVerifying && <Button className='inputButton' onClick={makeReqForVallidation}>{isVerified?"Verified":"Verifiy"}</Button>}
                  {isVerifying && <Button className='inputButton'>Verifying...</Button>}
                </div>
              </FormGroup>
              <p className="text-small mt-1">A payment request notification will be sent to this UPI ID</p>
              {((isPaymentProceed || isVerified) && !processing) && <Button onClick={() => makeApiReqForUpiPayment(paymentData, vpa)} className='primaryButton'>Proceed to Pay</Button>}
              {((isPaymentProceed || isVerified) && processing) && <Button className='primaryButton'>Processing...</Button>}
            </Form>
            }
          </div>
        </div>
      </React.Fragment>
    );

  }
}