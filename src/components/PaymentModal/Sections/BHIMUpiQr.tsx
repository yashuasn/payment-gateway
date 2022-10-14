import * as React from 'react';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { getPaymentModeByName } from '../../../helpers/common-helper';
import { MappingBeanInterface } from '../../../services/Models/sabpaisa-payment-types';
import sabpaisaService from '../../../services/sabpaisa-service'



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
  selectedMapping: any,
  mappingBeans: any
}


export default class BHIMUpiQr extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isClearable: true,
      isDisabled: false,
      isLoading: false,
      isRtl: false,
      isSearchable: true,
      processing: false,
      selectedMapping: {},
      mappingBeans: { label: '', value: {}, key: 2 }
    };
  }



  makeApiReqBhimUPIPayment(paymentData: any, selectedMapData: any) {
    const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnId, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId, } = paymentData;
    const { endpoint, paymode } = selectedMapData;

    this.setState({ processing: true });

    const payload = {
      txnId: spTxnId,
      clientId,
      clientTxnId,
      requestAmount,
      mappingBean: {
        mappingId: selectedMapData['mappingId'],
        feeForward: selectedMapData['feeForward'],
        clientId: selectedMapData['clientId'],
        paymodeId: selectedMapData['paymodeId'],
        endpointId: selectedMapData['endpointId'],
        active: selectedMapData['active'],
        paymode,
        endpoint
      },
      paidAmount: amountBean['paidAmount'],
      clientName,
      clientCode,
      payeeEmail: payerEmail,
      payeeMobile: payerMobNumber,
      amountType: amountBean['amountType'],
      udf1: "chrome",
      payMode: paymode,
      endPoint: endpoint
      // deviceName: "DESKTOP"
    }

    try {
      sabpaisaService.bhimUPIQrPayment(payload)
        .then(response => {
          this.setState({ processing: false })
          if (response.data.bankUrl) {
            window.location.href = response.data.bankUrl;
          }
        })
        .catch(err => {
          this.props.updateStateWithError(err,400);
          this.setState({ processing: false })
        })
    } catch (err: any) {
      this.props.updateStateWithError(err,400);
      this.setState({ processing: false })
    }

  }


  proceedBHIMUPIQRRequest = () => {
    const { paymentData } = this.props;
    const { selectedMapping } = this.state;
    let selectedMapData = selectedMapping.value
    // console.log(paymentData)
    this.makeApiReqBhimUPIPayment(paymentData, selectedMapData)

  }


  onChange = (e: any) => {
    if(!e){
      this.setState({selectedMapping:{}})
    }else{
      const { value } = e;
      this.props.makeApiReqCardFeeCalculation(value);
      this.setState({ mappingBeans: value, selectedMapping: e })
    }
    
  }
  // Lifecycle methods section 




  // componentDidMount() {
  //   const { paymentData } = this.props;
  //   const upiDetails = (paymentData && paymentData.activeMapping.length) ? (getPaymentModeByName("bhim_upi_qr", paymentData.activeMapping))[0] : {};
  //   let data = { ...upiDetails };
  //   this.props.makeApiReqCardFeeCalculation(data);
  // }


  render() {
    const { state, props, proceedBHIMUPIQRRequest } = this;
    const { isClearable, isSearchable, isDisabled, isLoading, isRtl, selectedMapping, processing } = state;
    const { paymentData } = props;
    const BHIM_UPI_QR_Details: any = (paymentData && paymentData.activeMapping.length) ? getPaymentModeByName("bhim_upi_qr", paymentData.activeMapping) : [];
    // console.log(BHIM_UPI_QR_Details)
    const isShowButton = Object.keys(selectedMapping).length;

    return (
      <React.Fragment>
        <div className="activity methods">
          <div className="form form-collapsible">
            <div className="form-header">
              <h3 className="form-heading text-dark">QR Code</h3>
            </div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={{ label: 'Select Your Bank...', value: 0 }}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              placeholder = "Select Your Bank..."
              name="color"
              value={isShowButton && selectedMapping}
              // onChange={(e: any)=> {console.log(e.value)}}
              onChange={(e: any) => { this.onChange(e) }}
              options={BHIM_UPI_QR_Details.map((value: any, id: any) => {
                return {
                  label: value.endpoint.bankName, value, key: id
                }
              })}
            />


          </div>
          {
            !processing ?
              Object.keys(selectedMapping).length > 0 && <Button onClick={proceedBHIMUPIQRRequest} className="primaryButton">Proceed to Pay</Button> :
              <Button onClick={proceedBHIMUPIQRRequest} className="primaryButton">Processing . . . </Button>
          }
        </div>
      </React.Fragment >
    );
  }
}