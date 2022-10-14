import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { cardExpdate as cardExpdateRegex } from '../../../constants/regex';
import sabpaisaService from '../../../services/sabpaisa-service';
import { getCardImageProps, encryptAES, getCardType, getPaymentModeByName, formatCardNumber } from '../../../helpers/common-helper';
import { CardPaymentRequest, MappingBeanInterface, NetbankingPayment } from '../../../services/Models/sabpaisa-payment-types';


export interface CardData {
    cardHolderName: string;
    cardNumber: number;
    cvv: number;
    expiry: string;
    cardType: string;
}

export interface props {
    updateState: (arg: number) => void;
    paymentData: any,
    makeApiReqCardFeeCalculation: (arg: MappingBeanInterface) => void,
    updateStateWithError: (resError: any, screenId: number) => void,
}

export interface state {
    fields: { [key: string]: any },
    submitted: false,
    currentState: 0,
    processing: Boolean,
    errors: { [key: string]: any },
    isBackspace: boolean

}

export default class RupayCardDetails extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            submitted: false,
            currentState: 0,
            processing: false,
            fields: {
                cardHolderName: '',
                cardNumber: '',
                cvv: '',
                expdate: '',
                cardType: "",
            },
            isBackspace: false,
            errors: {}
        };
    }

    makeApiReqCardPaymentProcessing = async (paymentData: any, encCardBeanPayload: any,) => {
        try {// const payload = { "clientId": 2211, "paidAmount": 51, "txnId": null, "clientTxnId": "TESTING12052205040225", "clientName": "Sabpaisa Educational School-College", "clientCode": "DEMO1", "requestAmount": 50, "payerEmail": "laxmi.kant@srslive.in", "payerMobile": "8892309568", "amountType": "INR", "payMode": { "paymodeId": 1, "paymodeType": "online", "paymodeName": "Debit Card" }, "endPoint": { "epId": 1000, "bankName": "BOB", "bankId": "1", "agrName": "SabPaisa", "epType": "CARD" }, "udf1": "chrome", "deviceName": "DESKTOP", "cardBean": { "cardNumber": "U2FsdGVkX1/wZxnIxpPXEiL9WV+2dmAYxIPAoHl+gh8Uj/Cpf2UHnGLblVBIdAJx", "cardHolderName": "U2FsdGVkX1/ljXDsb1Rs5SnjQC8njj5zopY6tJ+Li64=", "cvv": "U2FsdGVkX1/tQToROiUiTlUlBB6AooERmDtQSZcDVOE=", "cardType": "visa", "expMonth": "U2FsdGVkX1+W95iuotmKsNY8TWxQBE5mb0++H9G6/2U=", "expYY": "U2FsdGVkX1/Hcgv5PTDLbis4ZFI4an6ZoZo9WWFuhs8=" } }
            const { mappingBean, amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
            const { endpoint, paymode } = mappingBean;



            let finalData: CardPaymentRequest = {
                "txnId": spTxnId,
                "clientId": clientId,
                "clientTxnId": clientTxnid,
                clientName,
                clientCode,
                requestAmount,
                // mappingBean,
                "payeeEmail": payerEmail,
                "payeeMobile": payerMobNumber,
                "udf1": "chrome",
                // "deviceName": "DESKTOP",
                "amountType": amountType,
                "payMode": paymode,
                "endPoint": endpoint,
                "paidAmount": amountBean.paidAmount,
                cardBean: {
                    cardType: this.state.fields.cardType,
                    ...encCardBeanPayload
                }
            }
            if (this.state.fields.cardType !== "") {
                try {
                    this.setState({ processing: true });
                    const response = await sabpaisaService.cardPaymentRequest(finalData);
                    if (response.data.bankUrl) {
                        window.open(response.data.bankUrl, "_self");

                    }
                    this.setState({ processing: false });

                } catch (e: any) {
                    this.props.updateStateWithError(e, 400);
                    this.setState({ processing: false });
                }
            }

        } catch (error) {
            this.props.updateStateWithError(error, 400)
            this.setState({ processing: false });
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
            errors['cardNumber'] = "Please enter complete Card Number";
            isCardValid = false;
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

    cardSubmit = (e: any) => {
        e.preventDefault();
        const rupayRegex = /(?<!\d)\d{16}(?!\d)/;
        if (this.validateCard()) {
            const { cardNumber, cardHolderName, cvv, expdate } = this.state.fields;
            const payload = {
                cardNumber: cardNumber.trim(),
                cardHolderName: cardHolderName,
                cvv: cvv,
                expMonth: expdate.slice(0, 2),
                expYY: expdate.slice(3)
            }
            if (rupayRegex.test(cardNumber.trim())) {
                const encPayload = encryptAES('sabpaisa', payload);
                this.makeApiReqForPayment(encPayload)

            } else {
                alert('Invalid Card Number');
            }
        }
    }


    formatCardNumber = (value: string) => {
        let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        let matches = v.match(/\d{4,16}/g);
        let match = (matches && matches[0]) || "";
        let parts: string[] = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };
    isRupayCard = (cardNum: any) => {
        var payCardType = "";
        if (cardNum.indexOf("50") === 0 || cardNum.indexOf("60") === 0 || cardNum.indexOf("65") === 0) {
            var g = "508500-508999|606985-607984|608001-608500|652150-653149";
            var i = g.split("|");
            for (var d = 0; d < i.length; d++) {
                var c = parseInt(i[d].split("-")[0], 10);
                var f = parseInt(i[d].split("-")[1], 10);
                if ((cardNum.substr(0, 6) >= c && cardNum.substr(0, 6) <= f) && cardNum.length >= 6) {
                    payCardType = "rupay";
                    break;
                }
            }
        }
        return payCardType;
    }

    handleChange(field: any, e: any) {
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
            this.setState({ fields });
        }

        if (field === 'cardNumber') {
            value = value.replace(/ /gi, "");
            if (isNaN(value)) {
                return;
            } else {
                fields["cardType"] = this.isRupayCard(value);
                fields[field] = value.slice(0, 16);

                this.setState({ fields });
            }
        }
        if ((field === 'cvv' && value.length <= 3 && /^[0-9]*$/.test(value.trim() || '224'))) {
            fields[field] = value;
            this.setState({ fields });
        }
        this.onChangeRestError();
    }

    //Lyfecycles

    componentDidMount() {
        const { paymentData } = this.props;
        let upiDetails = (paymentData && paymentData.activeMapping.length) ? (getPaymentModeByName("rupay_card", paymentData.activeMapping))[0] : {};

        let data = { ...upiDetails }
        this.props.makeApiReqCardFeeCalculation(data);
    }


    render() {
        const { formatCardNumber, isRupayCard } = this;
        const { processing } = this.state;

        return (
            <React.Fragment>
                <div className="activity mt-3">
                    <Form
                        name="cardForm"

                    >
                        <FormGroup>
                            <Label for="nameOnCard">Cardholder Name</Label>
                            <Input type="text" className="input" name="cardHolderName" id="nameOnCard" placeholder="Enter your Name on Card"
                                onChange={this.handleChange.bind(this, "cardHolderName")}
                                value={this.state.fields["cardHolderName"]} required />
                            <p className='errortext'>{this.state.errors["cardHolderName"]}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cardNumber">Card Number</Label>
                            <div className="input leftInput">
                                <Input type="text" name="cardNumber" id="cardNumber" placeholder="XXXX XXXX XXXX XXXX"
                                    onChange={this.handleChange.bind(this, "cardNumber")}
                                    value={formatCardNumber(this.state.fields["cardNumber"])}
                                />
                                {isRupayCard(this.state.fields["cardNumber"]) === "rupay" && <img src="https://s3.amazonaws.com/sabpaisa/rupay.svg" alt="card type" />}
                            </div>
                            <p className='errortext'>{this.state.errors["cardNumber"]}</p>
                        </FormGroup>
                        <div className="flex-between">
                            <div className="half-input">
                                <Label for="cvv">CVC / CVV</Label>
                                <Input type="password" name="cvv" id="cvv" placeholder="3 digits" className="input"
                                    onChange={this.handleChange.bind(this, "cvv")}
                                    value={this.state.fields["cvv"]}
                                />
                                <p className='errortext'>{this.state.errors["cvv"]}</p>
                            </div>
                            <div className="half-input">
                                <Label for="expdate">Exp. Date</Label>
                                <Input type="text" name="expdate" id="expdate" placeholder="MM/YY" className="input"
                                    onKeyDown={(e: any) => { if (e.keyCode === 8) { this.setState({ isBackspace: true }) } else { this.setState({ isBackspace: false }) } }}
                                    onChange={this.handleChange.bind(this, "expdate")}
                                    value={this.state.fields["expdate"]} />
                                <p className='errortext'>{this.state.errors["expdate"]}</p>
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
                                <Button type='submit' onClick={this.cardSubmit} className="primaryButton mt-3">Continue</Button> :
                                <Button type='button' className="primaryButton mt-3">Processing . . .</Button>
                        }
                    </Form>
                </div>
            </React.Fragment >
        );

    }
}