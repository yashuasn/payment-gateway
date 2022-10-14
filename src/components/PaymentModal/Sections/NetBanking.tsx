import * as React from 'react';
import Select from 'react-select';
import { handleInputChange } from 'react-select/dist/declarations/src/utils';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import sabpaisaService from "../../../services/sabpaisa-service";
import { getPaymentModeByName } from '../../../helpers/common-helper';
import { MappingBeanInterface, NetbankingPayment } from '../../../services/Models/sabpaisa-payment-types';

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

export default class NetBanking extends React.Component<props, state> {
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
        // const { value } = e;

        // let data = { ...value }
        // this.props.makeApiReqCardFeeCalculation(data);

        // this.setState({ mappingBeans: value, selectedMapping: e })
    }
    makeApiReqNetbankingPayment = (e: any) => {

        e.preventDefault();
        const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = this.props.paymentData;
        const { mappingBeans, selectedMapping } = this.state;
        
        this.setState({ processing: true })

        let finalData: NetbankingPayment = {
            "txnId": spTxnId,
            "clientId": clientId,
            "clientTxnId": clientTxnid,
            "requestAmount": requestAmount,
            "mappingBean": mappingBeans,
            "payeeEmail": payerEmail,
            "payeeMobile": payerMobNumber,
            "udf1": "chrome",
            clientName,
            clientCode,
            // "deviceName": "DESKTOP",
            "amountType": amountType,
            "payMode": mappingBeans.paymode,
            "endPoint": mappingBeans.endpoint,
            "paidAmount": amountBean.paidAmount
        }

        // console.log(payload);
        try {
            sabpaisaService.netbankingPayment(finalData)
                .then((response: any) => {
                    this.setState({ processing: false });
                    if (response.data.bankUrl) {
                        window.location.href = response.data.bankUrl;

                    }
                }).catch((e: Error) => {
                    // console.log(e);
                    this.props.updateStateWithError(e,400);
                    this.setState({ processing: true });
                });
        } catch (e: any) {
            this.props.updateStateWithError(e,400);
            this.setState({ processing: false });
        }
    }

    render() {
        const { paymentData } = this.props;

        const netBanking_bank_details = (paymentData && paymentData.activeMapping.length) ? getPaymentModeByName("net_banking", paymentData.activeMapping) : [];
        const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId } = this.props.paymentData;

        const { mappingBeans, isClearable, isSearchable, isDisabled, isLoading, isRtl, selectedMapping, processing } = this.state;
        const isShowButton = Object.keys(selectedMapping).length;
        
        return (
            <React.Fragment>
                <div className="activity">
                    <div className="form form-collapsible">
                        <div className="form-header">
                            <h3 className="form-heading text-dark">Net Banking</h3>
                        </div>
                        {/* <div className="input-underline"> */}
                        <Form>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                defaultValue={{ label: 'Select Your Bank...', value: {}, key: 1 }}
                                isDisabled={isDisabled}
                                placeholder = "Select Your Bank..."
                                isLoading={isLoading}
                                isClearable={isClearable}
                                
                                isRtl={isRtl}
                                isSearchable={isSearchable}
                                name="color"
                                value={isShowButton && selectedMapping}
                                // onChange={(e: any)=> {console.log(e.value)}}
                                onChange={(e: any) => { this.onChange(e) }}
                                options={netBanking_bank_details.map((value: any, id: any) => {
                                    return {
                                        label: value.endpoint.bankName, value, key: id
                                    }
                                })}
                            />

                            {/* <Button onClick={ this.makeApiReqNetbankingPayment } className="primaryButton">Proceed to Pay</Button> : */}
                            {
                                !processing ?
                                    <Button disabled = {!isShowButton}  onClick={this.makeApiReqNetbankingPayment} className="primaryButton">Proceed to Pay</Button> :
                                    <Button disabled = {!isShowButton}  className="primaryButton">Processing . . .</Button>
                            }

                        </Form>

                    </div>
                </div>
            </React.Fragment>
        );

    }
}