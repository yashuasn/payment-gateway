import * as React from 'react';
import CryptoJS from "crypto-js";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { cardExpdate as cardExpdateRegex } from '../../../constants/regex';
import sabpaisaService from '../../../services/sabpaisa-service';
import { getCardImageProps, encryptAES, getCardType, getPaymentModeByName, isPaymentMethodEnabled, formatCardNumber } from '../../../helpers/common-helper';
import { CardPaymentRequest, MappingBeanInterface, NetbankingPayment } from '../../../services/Models/sabpaisa-payment-types';
import { withToast } from './Layouts/ToastContainer';

export interface CardData {
    cardholder: string;
    cardNumber: number;
    cvv: number;
    expiry: string;
    cardType: string;
}

export interface props {
    updateState: (arg: number) => void,
    updateStateWithError: (resError: any, screenId: number) => void,
    paymentData: any,
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void;
}

export interface state {
    fields: { [key: string]: any },
    submitted: false,
    currentState: 0,
    activeCard: string,
    processing: Boolean,
    errors: { [key: string]: any }
    isBackspace: boolean
}








export default class CardDetails extends React.Component<props, state> {

    constructor(props: props) {
        super(props);
        this.state = {
            submitted: false,
            currentState: 0,
            processing: false,
            activeCard: '',
            fields: {
                cardHolderName: '',
                cardNumber: '',
                cvv: '',
                expdate: '',
                cardType: ''
            },
            isBackspace: false,
            errors: {}
        };
    }

    isMappingExists = (mappingId: string) => {
        const { activeMapping } = this.props.paymentData;
        return isPaymentMethodEnabled(mappingId, activeMapping);
    }

    makeApiReqCardPaymentProcessing = async (paymentData: any, encCardBeanPayload: any,) => {
        try {// const payload = { "clientId": 2211, "paidAmount": 51, "txnId": null, "clientTxnId": "TESTING12052205040225", "clientName": "Sabpaisa Educational School-College", "clientCode": "DEMO1", "requestAmount": 50, "payerEmail": "laxmi.kant@srslive.in", "payerMobile": "8892309568", "amountType": "INR", "payMode": { "paymodeId": 1, "paymodeType": "online", "paymodeName": "Debit Card" }, "endPoint": { "epId": 1000, "bankName": "BOB", "bankId": "1", "agrName": "SabPaisa", "epType": "CARD" }, "udf1": "chrome", "deviceName": "DESKTOP", "cardBean": { "cardNumber": "U2FsdGVkX1/wZxnIxpPXEiL9WV+2dmAYxIPAoHl+gh8Uj/Cpf2UHnGLblVBIdAJx", "cardHolderName": "U2FsdGVkX1/ljXDsb1Rs5SnjQC8njj5zopY6tJ+Li64=", "cvv": "U2FsdGVkX1/tQToROiUiTlUlBB6AooERmDtQSZcDVOE=", "cardType": "visa", "expMonth": "U2FsdGVkX1+W95iuotmKsNY8TWxQBE5mb0++H9G6/2U=", "expYY": "U2FsdGVkX1/Hcgv5PTDLbis4ZFI4an6ZoZo9WWFuhs8=" } }
            const { mappingBean, amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
            const { endpoint, paymode } = mappingBean;

            this.setState({ processing: true })

            let finalData: CardPaymentRequest = {
                "txnId": spTxnId,
                "clientId": clientId,
                "clientTxnId": clientTxnid,
                "clientName": clientName,
                "clientCode": clientCode,
                "requestAmount": requestAmount,
                // "mappingBean": mappingBean,
                "payeeEmail": payerEmail,
                "payeeMobile": payerMobNumber,
                "udf1": "chrome",
                // "deviceName": "DESKTOP",
                "amountType": amountType,
                "payMode": paymode,
                "endPoint": endpoint,
                "paidAmount": amountBean.paidAmount,
                cardBean: {
                    cardType: (this.state.fields["cardType"]).replace(/\s/g, '').toLowerCase(),
                    ...encCardBeanPayload
                }
            }
            sabpaisaService.cardPaymentRequest(finalData)
                .then((response: any) => {
                    this.setState({ processing: false });
                    if (response.data.bankUrl) {
                        window.location.href = response.data.bankUrl;

                    }
                }).catch((e: Error) => {
                    // console.log(e);
                    this.setState({ processing: false });
                    this.props.updateStateWithError(e, 400);
                });

        } catch (error) {
            // console.error(error);
            this.setState({ processing: false });
            this.props.updateStateWithError(error, 400);
        }
    }
    makeApiReqForPayment = (encReqPayload: {} | undefined) => {
        const { paymentData } = this.props;
        encReqPayload && this.makeApiReqCardPaymentProcessing(paymentData, encReqPayload);

    }

    onChangeRestError = () => {
        this.setState((preState) => (
            {
                ...preState, errors: {
                    cardHolderName: '',
                    cardNumber: '',
                    cvv: '',
                    expdate: ''
                }
            }
        ))
    }

    validateCard() {
        let isCardValid = true;
        const { fields, errors } = this.state;

        //Cardholder
        if (!fields["cardHolderName"]) {
            isCardValid = false;
            errors["cardHolderName"] = "Cardholder cannot be empty";
        }

        if (!fields["cardNumber"] || fields['cardNumber'].length < 13 || fields['cardNumber'].length > 19) {
            isCardValid = false;
            errors['cardNumber'] = "Please enter complete Card Number";
        }

        if (!fields["cvv"] || fields['cvv'].length !== 3) {
            isCardValid = false;
            errors['cvv'] = "Please enter complete Card Number";
        }


        if (fields['expdate'].indexOf('/') !== 2) {
            isCardValid = false;
            errors['expdate'] = "Date Format is invalid";
        }

        this.setState({ errors: errors });
        return isCardValid;
    }



    cardSubmit(e: any) {
        e.preventDefault();
        // console.log(this.props.toast({message:'successfull',type:'error',timeOut:10}))
        if (this.validateCard()) {
            const { cardNumber, cardHolderName, cvv, expdate, cardType } = this.state.fields;
            const payload = {
                cardNumber: cardNumber,
                cardHolderName: cardHolderName,
                cvv: cvv,
                expMonth: expdate.slice(0, 2),
                expYY: expdate.slice(3)
            }
            if (cardType && cardType !== '') {
                const encPayload = encryptAES('sabpaisa', payload);
                this.makeApiReqForPayment(encPayload)

            } else {
                alert('Invalid card number');

            }
        }
    }



    async handleChange(field: any, e: any) {

        let fields = this.state.fields;
        let { value } = e.target;
        if (field === 'cardHolderName' && /^[A-Za-z ]+$/.test(value.trim() || 'default')) {
            fields[field] = value;
            this.setState({ fields });
        }


        if (field === 'expdate' && (value.length + 1) <= 6) {
            if (!this.state.isBackspace) {

                value = value.replace(
                    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
                ).replace(
                    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
                ).replace(
                    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
                ).replace(
                    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
                ).replace(
                    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
                ).replace(
                    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
                ).replace(
                    /\/\//g, '/' // Prevent entering more than 1 `/`
                );
            }
            fields[field] = value;
            // console.log(fields[field].length)
            this.setState({ fields });
        }
        if (field === 'cardNumber') {
            value = value.replace(/ /gi, "");
            if (isNaN(value)) {
                return;
            } else {
                // fields["cardType"] = getCardType(value);
                try {
                    if (value.length >= 6) {

                        const response: any = await sabpaisaService.getCardDetails(value.substring(0, 6));
                        if (response.status == 200 && response.data.Card_Type_Code && Object.keys(response.data).length) {
                            console.log(response.data)
                            switch (response.data.Card_Type_Code) {
                                case "CC":
                                    this.switchPaymentMethod('credit_card')
                                    fields["cardType"] = response.data.Card_Brand
                                    break;
                                case "DC":
                                    this.switchPaymentMethod('debit_card')
                                    fields["cardType"] = response.data.Card_Brand
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        fields["cardType"] = "";
                        this.switchPaymentMethod('');

                    }

                } catch (error) {
                }
                fields[field] = value;

                this.setState({ fields });
            }
        }
        if ((field === 'cvv' && value.length <= 3 && /^[0-9]*$/.test(value.trim() || '224'))) {
            fields[field] = value;
            this.setState({ fields });
        }
        this.onChangeRestError();


    }


    switchPaymentMethod = (method: string) => {
        this.setState({ activeCard: method })
    }

    //Lyfecycles

    componentDidMount() {
        const { paymentData } = this.props;
        // const upiDetails = (paymentData && paymentData.activeMapping.length) ? (getPaymentModeByName("credit_card", paymentData.activeMapping))[0] : {};
        // let data = { ...upiDetails }
        // this.props.makeApiReqCardFeeCalculation(data);
    }

    componentDidUpdate(prevProps: Readonly<props>, prevState: Readonly<state>, snapshot?: any): void {
        if (prevState.activeCard !== this.state.activeCard) {
            const { paymentData } = this.props;
            const upiDetails = (paymentData && paymentData.activeMapping.length) ? (getPaymentModeByName(this.state.activeCard, paymentData.activeMapping))[0] : {};
            let data = { ...upiDetails }
            this.props.makeApiReqCardFeeCalculation(data);
        }
    }



    // SvgIcon
    renderCircleCheck = (tab: string) => {
        const color = this.state.activeCard === tab ? "blue" : "transparent";
        return <svg xmlns="http://www.w3.org/2000/svg" fill={color} width='18px' height='18px' style={{ marginTop: '-4px', color: color }} viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
    }


    render() {
        const { switchPaymentMethod, renderCircleCheck } = this;
        const { processing, activeCard } = this.state;

        return (
            <React.Fragment>

                <div className="activity mt-3">{activeCard ?
                    <header className='credit-card__header'>
                        {this.isMappingExists("credit_card") ?
                            <span className={activeCard === "credit_card" ? 'border-bottom' : ""} >
                                {renderCircleCheck('credit_card')} Credit Card
                            </span>
                            : null
                        }
                        {this.isMappingExists("debit_card") ?
                            <span className={activeCard === "debit_card" ? 'border-bottom' : ""} >
                                {renderCircleCheck('debit_card')} Debit Card
                            </span>
                            : null
                        }
                    </header> : null}
                    <Form
                        name="cardForm"
                        onSubmit={this.cardSubmit.bind(this)}
                    >
                        <FormGroup>
                            <Label for="nameOnCard">Cardholder Name</Label>
                            <Input type="text" className="input" name="cardHolderName" id="nameOnCard" placeholder="Enter your Name on Card"
                                onChange={this.handleChange.bind(this, "cardHolderName")}
                                value={this.state.fields["cardHolderName"]} />
                            <p className='errortext'>{this.state.errors["cardHolderName"]}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cardNumber">Card Number</Label>
                            <div className="input leftInput">
                                <Input type="text" name="cardNumber" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX"
                                    onChange={this.handleChange.bind(this, "cardNumber")}
                                    value={formatCardNumber(this.state.fields["cardNumber"])}
                                />
                                {/* <img src={getCardImageProps(this.state.fields["cardType"].replace(/\s/g, '').toLowerCase())} /> */}
                                <img src={getCardImageProps(this.state.fields["cardType"].replace(/\s/g, '').toLowerCase())} />

                            </div >
                            <p className='errortext'>{this.state.errors["cardNumber"]}</p>
                        </FormGroup >
                        <div className="flex-between">
                            <div className="half-input">
                                <Label for="expdate">Valid Upto</Label>
                                <Input type="text"
                                    name="expdate"
                                    id="expdate"
                                    placeholder="MM/YY"
                                    className="input"
                                    onKeyDown={(e: any) => { if (e.keyCode === 8) { this.setState({ isBackspace: true }) } else { this.setState({ isBackspace: false }) } }}
                                    onChange={this.handleChange.bind(this, "expdate")}
                                    value={this.state.fields["expdate"]} />
                                <p className='errortext'>{this.state.errors["expdate"]}</p>
                            </div>
                            <div className="half-input">
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Label for="cvv">CVV</Label>
                                    <a href="#"><img src="https://s3.amazonaws.com/sabpaisa/helpicon.png" style={{width: '12px', marginTop: '-10px', marginLeft: '15px'}} alt="help" onClick={() => this.props.updateState(91)} /></a>
                                </div>
                                <Input type="password" name="cvv" id="cvv" placeholder="3 digits" className="input"
                                    onChange={this.handleChange.bind(this, "cvv")}
                                    value={this.state.fields["cvv"]}
                                />
                                <p className='errortext'>{this.state.errors["cvv"]}</p>
                            </div>
                        </div>
                        {/* 
                        <div className="flex checks">
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                            <p className="text-small">Save card securely for future payments
                                <br /><a href="#" className="text-blue">Know More</a></p>
                        </div> */}

                        {
                            !processing ?
                                <Button type='submit' className="primaryButton mt-3">Continue</Button> :
                                <Button type='submit' className="primaryButton mt-3">Processing . . .</Button>
                        }
                    </Form >
                </div >
            </React.Fragment >
        );

    }
}