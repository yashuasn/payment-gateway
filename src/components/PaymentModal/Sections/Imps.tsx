import * as React from 'react';
import { Form, Button } from 'reactstrap';
import Select from 'react-select';
import sabpaisaService from "../../../services/sabpaisa-service";
import { getPaymentModeByName } from '../../../helpers/common-helper';
import { CashPaymentInterface, MappingBeanInterface, NetbankingPayment } from '../../../services/Models/sabpaisa-payment-types';

export interface props {
  updateState: (arg: number) => void;
  paymentData: { [key: string]: any },
  makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void,
  updateStateWithError:(resError:any,screenId:number)=>void,
}

export interface state {
  readonly isClearable: boolean;
  readonly isDisabled: boolean;
  readonly isLoading: boolean;
  readonly isRtl: boolean;
  readonly isSearchable: boolean;
  processing: Boolean,
  mappingBeans: MappingBeanInterface
  selectedMapping: { [key: string]: any }
}

export default class Imps extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      processing: false,
      mappingBeans: {
        mappingId: "",
        feeForward: "",
        clientId: "",
        paymodeId: "",
        endpointId: "",
        active: "",
        paymode: {
          paymodeId: "",
          paymodeType: "",
          paymodeName: "",
        },
        endpoint: {
          epId: "",
          bankName: "",
          bankId: "",
          agrName: "",
          epType: "",
        }
      },
      selectedMapping: {}
    };
  }

  onChange = (e: any) => {
    if(!e){
      this.setState({selectedMapping:{}})
    }else{ 
      const { value } = e;
      let data = { ...value }
      this.props.makeApiReqCardFeeCalculation(data);
      this.setState({ mappingBeans: value, selectedMapping: e });
    }  
  }

  makeApiReqImpsPayment = (e: any) => {

    e.preventDefault();
    const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
    const { mappingBeans, selectedMapping } = this.state;
    this.setState({ processing: true })

    let finalData: CashPaymentInterface = {
      "txnId": spTxnId,
      "clientId": clientId,
      "clientTxnId": clientTxnid,
      "requestAmount": requestAmount,
      "mappingBean": mappingBeans,
      "payeeEmail": payerEmail,
      "payeeMobile": payerMobNumber,
      "udf1": "chrome",
      // "deviceName": "DESKTOP",
      "amountType": amountType,
      "payMode": mappingBeans.paymode,
      "endPoint": mappingBeans.endpoint,
      "paidAmount": amountBean.paidAmount,
      clientName,
      clientCode
    }

    try {
      sabpaisaService.cashPayment(finalData)
        .then((response: any) => {
          this.setState({ processing: false })
          if (response.data.bankUrl) {
            window.location.href = response.data.bankUrl;

          }
        }).catch((e: Error) => {
          this.props.updateStateWithError(e,400);
          this.setState({ processing: false })
        });
    } catch (e: any) {
      this.props.updateStateWithError(e,400);
      this.setState({ processing: false })
    }
  }

  render() {

    const { paymentData } = this.props;
    const { mappingBeans, isClearable, isSearchable, isDisabled, isLoading, isRtl, selectedMapping, processing } = this.state;
    const imps_bank_details = (paymentData && paymentData.activeMapping.length) ? getPaymentModeByName("imps", paymentData.activeMapping) : [];
    const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId } = this.props.paymentData;
    const isShowButton = Object.keys(selectedMapping).length;


    return (
      <React.Fragment>
        <div className="activity methods">
          <div className="form form-collapsible">
            <div className="form-header">
              <h3 className="form-heading text-dark mx-2">IMPS Payment</h3>
            </div>
            <div className="flex payMethods">
              <a onClick={() => this.props.updateState(54)} className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/cash.svg" alt="" />
                <span>Cash</span>
              </a>
              <a onClick={() => this.props.updateState(51)} className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/rtgs.svg" alt="" />
                <span>E-RTGS </span>
              </a>
              <a onClick={() => this.props.updateState(52)} className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/neft.svg" alt="" />
                <span>E-NEFT</span>
              </a>
              <a onClick={() => this.props.updateState(53)} className="paymentMethod">
                <img src="https://s3.amazonaws.com/sabpaisa/powerActive.svg" alt="" />
                <span>E-IMPS</span>
              </a>
            </div>
            <Form>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{ label: 'Select Your Bank...', value: {}, key: 1 }}
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name="color"
                value={isShowButton && selectedMapping}
                placeholder = "Select Your Bank..."
                onChange={(e: any) => { this.onChange(e) }}
                options={imps_bank_details.map((value: any, id: any) => {
                  return { label: value.endpoint.bankName, value, key: id }
                })}
              />
              {
                !processing ?
                  <Button disabled = {!isShowButton}  onClick={this.makeApiReqImpsPayment} className="primaryButton">Proceed to Pay</Button> :
                  <Button disabled = {!isShowButton}  className="primaryButton">Processing . . . </Button>
              }
            </Form>
          </div>
        </div>
      </React.Fragment>
    );

  }
}