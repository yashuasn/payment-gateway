import React, { Component, useEffect } from "react";
import { Modal, ModalBody } from 'reactstrap';
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css'


import PaymentMethods from "./Sections/PaymentMethod"
import PaymentLayout from "./Sections/Layouts/PaymentLayout"
import PaymentMethodData, { CardFeeCalculation, MappingBeanInterface } from "../../services/Models/sabpaisa-payment-types";
import CardDetails from "./Sections/CardDetails";
import SavedCard from "./Sections/SavedCard";
import UpiMethods from "./Sections/UpiMethods";
import UpiPaymentProcessing from "./Sections/UpiPaymentProcessing";
import NetBanking from "./Sections/NetBanking";
import OtherMethods from "./Sections/OtherMethods";
import SavedCardCheckout from "./Sections/SavedCardCheckout";
import PaymentSuccess from "./Sections/PaymentSuccess";
import PaymentProcessing from "./Sections/PaymentProcessing";
import BankRedirect from "./Sections/BankRedirect";
import PaymentFailed from "./Sections/PaymentFailed";
import PaymentError from "./Sections/PaymentError";
import CancelPayment from "./Sections/CancelPayment";
import RequestTimeout from "./Sections/RequestTimeout";
import Rtgs from "./Sections/Rtgs";
import Neft from "./Sections/Neft";
import Imps from "./Sections/Imps";
import Wallet from "./Sections/Wallet";
import Emi from "./Sections/Emi";
import SelectEmi from "./Sections/SelectEmi";
import EmiCardDetails from "./Sections/EmiCardDetails";
import QrLoader from "./Sections/QrLoader";
import QrScreen from "./Sections/QrScreen";
import ClientDetails from "./Sections/ClientDetails";
import sabpaisaService from "../../services/sabpaisa-service";
import Cash from "./Sections/Cash";
import BHIMUpiQr from "./Sections/BHIMUpiQr";
import DebitCardDetails from "./Sections/DebitCardDetails";
import RupayCardDetails from "./Sections/RupayCardDetails";
import CVV from "./Sections/CVV";


export interface PgModalProps {
  isOpen?: boolean;
  clientCode: string;
  clientTxnId: string;
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
      errorMessage: ''
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
    sabpaisaService.getPaymentModes(clientCode, clientTxnId)
      .then((response: any) => {
        if (this.state.currentState == 400) {
          this.updateState(0);
        }
        this.setState({ paymentData: response.data, activeMappings: response.data.activeMappings })
      })
      .catch((e: Error) => {
        this.updateStateWithError(e, 400)
        console.log(e);
      });
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



  renderComponent = () => {
    const { paymentData, errorMessage } = this.state;
    const obj: { [key: string]: any } = {
      0: <ClientDetails paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      1: <PaymentMethods paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      2: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<CardDetails updateStateWithError={this.updateStateWithError} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      21: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<SavedCard updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      22: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<SavedCardCheckout updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      23: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<DebitCardDetails updateStateWithError={this.updateStateWithError} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      24: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<RupayCardDetails updateStateWithError={this.updateStateWithError} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      3: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<UpiMethods updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      31: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<UpiPaymentProcessing updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      4: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<NetBanking updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      5: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<OtherMethods paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      51: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Rtgs updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      52: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Neft updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      53: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Imps updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      54: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Cash updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      6: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Wallet updateStateWithError={this.updateStateWithError} paymentData={paymentData} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      7: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<Emi updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      71: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<SelectEmi updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      72: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<EmiCardDetails updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      8: <QrLoader updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      81: <QrScreen updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      200: <PaymentSuccess updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      300: <PaymentProcessing updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      307: <BankRedirect updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      400: <PaymentFailed updateStateWithError={this.updateStateWithError} message={errorMessage} updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      402: <PaymentError updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      407: <CancelPayment updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      408: <RequestTimeout updateState={(counterNumber: number) => this.updateState(counterNumber)} />,
      9: <PaymentLayout paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} childComp={<BHIMUpiQr updateStateWithError={this.updateStateWithError} makeApiReqCardFeeCalculation={this.makeApiReqCardFeeCalculation} paymentData={paymentData} updateState={(counterNumber: number) => this.updateState(counterNumber)} />} />,
      91: <CVV updateState={(counterNumber: number) => this.updateState(counterNumber)} />,

    }

    // return (obj[this.state.currentState]);
    return (obj[this.state.currentState]);
    // return(obj[31])
  };
  componentDidUpdate(prevProps: any) {
    if (prevProps.isOpen !== this.props.isOpen) {
      if (this.props.isOpen) {
        this.getPaymentModes()
      }
      this.setState({ isOpen: this.props.isOpen });
    }
    if ((prevProps.clientTxnId !== this.props.clientTxnId) || (prevProps.clientCode !== this.props.clientCode)) {
      this.getPaymentModes();
    }

  }

  render() {
    const { isOpen } = this.state;
    const { onClick, additionalClass } = this.props;
    return (
      <div>
        {/* <ToastContainer> */}
        <Modal isOpen={isOpen} toggle={onClick} className={additionalClass}>
          {/* <ModalHeader toggle={onClick}>{title}</ModalHeader> */}
          <ModalBody id="overlay">
            {this.renderComponent()}
          </ModalBody>
        </Modal>
        {/* </ToastContainer> */}

      </div>
    );
  }
};

