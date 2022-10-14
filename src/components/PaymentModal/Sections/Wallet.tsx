import * as React from 'react';
import { Form, Button } from 'reactstrap';
import sabpaisaService from "../../../services/sabpaisa-service";
import { getPaymentModeByName } from '../../../helpers/common-helper';
import { MappingBeanInterface, NetbankingPayment, WalletPayment } from '../../../services/Models/sabpaisa-payment-types';

export interface props {
  updateState: (arg: number) => void;
  paymentData: { [key: string]: any },
  makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void,
  updateStateWithError: (resError: any, screenId: number) => void,
}

export interface state {
  submitted: Boolean,
  currentState: number,
  processing: Boolean,
  mappingBeans: MappingBeanInterface,
  selectedMapping: { [key: string]: any }
}

export default class Wallet extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      submitted: false,
      processing: false,
      currentState: 0,
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

  getbankImage(id: number) {
    let imgObj: { [key: string]: any } = {
      503: "amazonpay.svg",//amazonpay
      4001: "bankactive.svg",//freecharge
      4009: "phonepe.svg",//phonepay
      4004: "bankactive.svg",//reliance jio money
    }
    return (imgObj[id] ? imgObj[id] : "bankactive.svg")
  }

  selectWallet = (e: any) => {
    const value = e;

    let data = { ...value }
    this.props.makeApiReqCardFeeCalculation(data);

    this.setState({ mappingBeans: value, selectedMapping: e })
  }

  makeApiReqWalletPayment = () => {

    const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
    const { mappingBeans, selectedMapping } = this.state;

    this.setState({ processing: true })

    let finalData: WalletPayment = {
      "txnId": spTxnId,
      "clientId": clientId,
      "clientTxnId": clientTxnid,
      requestAmount,
      mappingBeans,
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
      sabpaisaService.walletPayment(finalData)
        .then((response: any) => {
          this.setState({ processing: false });
          if (response.data.bankUrl) {
            window.location.href = response.data.bankUrl;

          }
        }).catch((e: Error) => {
          this.props.updateStateWithError(e, 400);
          this.setState({ processing: false });
        });
    } catch (e: any) {
      this.props.updateStateWithError(e, 400);
      this.setState({ processing: false })
    }
  }

  render() {
    const { paymentData } = this.props;

    const options = (paymentData && paymentData.activeMapping.length) ? getPaymentModeByName("wallet", paymentData.activeMapping) : [];
    const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId } = this.props.paymentData;

    const { mappingBeans, selectedMapping, currentState, processing } = this.state;
    const isShowButton = Object.keys(selectedMapping).length;

    return (
      <React.Fragment>
        <div className="activity methods wallets">
          <div className="form form-collapsible">
            <div className="form-header">
              <h3 className="form-heading text-dark">Wallets</h3>
            </div>
            <div className="flex payMethods">
              {options.map((value: any, id: any) => {
                const active = value.mappingId === selectedMapping.mappingId ? 'active' : ''
                return (
                  <a className={`${active} paymentMethod `}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      { this.selectWallet(value) }
                    }} >
                    <img src={"https://s3.amazonaws.com/sabpaisa/" + this.getbankImage(value.endpoint.bankId)} alt="img" />
                    <span>{value.endpoint.epName}</span>
                  </a>
                )
              }
              )}
            </div>

            {
              !processing ?
                <Button disabled = {!isShowButton}  onClick={() => this.makeApiReqWalletPayment()} className="primaryButton">Proceed to Pay</Button> :
                <Button disabled = {!isShowButton}  className="primaryButton">Processing . . .</Button>
            }

          </div>
        </div>
      </React.Fragment>
    );

  }
}