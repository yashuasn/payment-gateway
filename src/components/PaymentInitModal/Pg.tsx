import React, { Component, useEffect } from "react";
import { Modal, ModalBody } from 'reactstrap';
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css'


import PaymentMethodData, { CardFeeCalculation, MappingBeanInterface } from "../../services/Models/sabpaisa-payment-types";

import ClientDetails from "./Sections/ClientDetails";
import sabpaisaService from "../../services/sabpaisa-service";


export interface PgModalProps {
  isOpen?: boolean;
  clientCode: string;
  clientTxnId: string;
  transUserName: string,
  transUserPassword: string;
  authkey: string;
  authiv: string;
  callbackUrl: string;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  additionalClass?: string;
};
type State = PaymentMethodData & {
  submitted: boolean,
  isOpen: boolean | undefined,
  currentState: number,
  errorMessage: string,
  paymentData: { [key: string]: any },
  activeMappings: {}[],
  isResponsed: boolean;

};
export default class PgModal extends Component<PgModalProps, State> {
  constructor(props: PgModalProps) {
    super(props);
    this.state = {
      submitted: false,
      isOpen: this.props.isOpen,
      currentState: 0,
      paymentData: {},
      activeMappings: [],
      errorMessage: '',
      isResponsed: false
    };
    this.makeApiReqCardFeeCalculation = this.makeApiReqCardFeeCalculation.bind(this);
  }

  updateState = (counterNumber: number): void => {
    let finalData = {
      ...this.state.paymentData,
      amountBean: {}
    }
    this.setState({ paymentData: finalData })

    this.setState({ currentState: counterNumber });
  }
  getPaymentModes = () => {

    const { clientCode, clientTxnId } = this.props;
    // sabpaisaService.getPaymentModes(clientCode, clientTxnId)
    //   .then((response: any) => {

    //     if (this.state.currentState == 400) {
    //       this.updateState(0);
    //     }
    //     this.setState({paymentData: response.data, activeMappings: response.data.activeMappings })
    //   })
    //   .catch((e: Error) => {
    //     this.updateStateWithError(e, 400)
    //     console.log(e);
    //   });
  };

  makeApiReqCardFeeCalculation(payload: MappingBeanInterface) {
    const { activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.state.paymentData;

    let finalData: CardFeeCalculation = {
      "txnId": spTxnId, "clientId": clientId, "clientTxnId": clientTxnid, "requestAmount": requestAmount, "mappingBean": payload, "payerEmailId": payerEmail, "payerPhone": payerMobNumber
    }
    // let data = { "txnId": null, "clientId": 2211, "clientTxnId": "TESTING12052205040225", "requestAmount": 50, "mappingBean": { "mappingId": 3346974, "feeForward": "yes", "clientId": 2211, "paymodeId": 1, "endpointId": 1, "active": true, "paymode": { "paymodeId": 1, "paymodeType": "online", "paymodeName": "Debit Card" }, "endpoint": { "epId": 1000, "bankName": "BOB", "bankId": "1", "agrName": "SabPaisa", "epType": "CARD" } }, "payerEmailId": "laxmi.kant@srslive.in", "payerPhone": "8892309568" }

    sabpaisaService.cardFeeCalculation(finalData)
      .then(data => {
        if (data.status == 200) {

          this.setState({ paymentData: { ...this.state.paymentData, ...data.data } })
        }
      })
      .catch(err => {
        console.log(err)
      })

  }











  updateStateWithError = (resError: any, screenId: number): void => {
    const { paymentData } = this.state;
    if (resError === 'closedModel') {
      this.setState({ isOpen: false });
      if (paymentData && paymentData.length) this.updateState(1);

    } else {
      let errorMessage = resError.response.data.errorMessage || resError.message;
      let errorCode = resError.response.data.errorCode || resError.response.status

      this.setState({ errorMessage }, () => {
        this.updateState(screenId);
      });
    }

  }


  // Lifecycle methods
  componentDidMount() {
    if (this.props.isOpen) {
      this.getPaymentModes()
    }
    // this.getPaymentModes();
  }




  componentDidUpdate(prevProps: any, preState: any) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.getPaymentModes()
      }
      this.setState({ isOpen: this.props.isOpen });
    }
    if ((prevProps.clientTxnId !== this.props.clientTxnId) || (prevProps.clientCode !== this.props.clientCode)) {
      this.getPaymentModes();
    }
    if (typeof (Object.keys(preState.paymentData).length || null) !== typeof Object.keys(this.state.paymentData).length) {
      this.setState({ isResponsed: true });
    }

  }

  render() {
    const { isOpen, paymentData, isResponsed } = this.state;
    const { payerName, payerMobNumber, payerEmail, requestAmount } = paymentData;

    const { onClick, additionalClass } = this.props;
    return (
      <div>
        {/* <ToastContainer> */}
        <Modal isOpen={isOpen} toggle={onClick} className={additionalClass}>
          {/* <ModalHeader toggle={onClick}>{title}</ModalHeader> */}
          <ModalBody id="overlay">
            <ClientDetails isResponsed={isResponsed} amount={requestAmount} email={payerEmail}
              fullName={payerName}
              phone_number={payerMobNumber}
              {...this.props} />
          </ModalBody>
        </Modal>
        {/* </ToastContainer> */}

      </div>
    );
  }
};


