import * as React from 'react';

const fixedTwo = (num:any) =>(num?.toFixed(2) ||"0.00");

export interface DetailsProps {
  childComp?: React.ReactNode;
  updateState: (arg: number) => void;
  paymentData: { [key: string]: any };

}

export interface DetailsState {
}
const Details: React.FC<DetailsProps> = (props) => {
  const { childComp } = props;
  const { amountBean, activeMapping, alertMessage, amountType, channelId, clientCode, clientId, clientLogo, clientName, clientTxnid, donationFlag, donationList, giftCardFlag, isClientLogoFlag, isCommercialFlag, isPartnerBankLogo, isVpaVerify, message, partnerBankLogo, payerEmail, payerMobNumber, payerName, requestAmount, spTxnId } = props.paymentData;
  // const { actualAmount, amountFlag, amountMessage, convCharge, endPointChargse, gst, paidAmount } = amountBean;
  
  return (
    <React.Fragment>
      <div id="sdkPopup">
        <div className="popupHeader">
          <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
          <span>Checkout</span>
        </div>
        <div className="popupBody">
          <h2 className="sectionHeading-large text-blue">Review & Pay</h2>
          {/* Card holding all payment related information */}
          <div className="clippedCard">
            <div className="clientDetails">
              <div className="client">
                <h3 className="text-white partnerName" id="clientName">{payerName}</h3>
              </div>
              <div className="clientInfo">
                <div className="field">
                  <p className="parameter">Client Code</p>
                  <p className="value">{clientCode}</p>
                </div>
                <div className="field">
                  <p className="parameter">Email ID</p>
                  <p className="value">{payerEmail}</p>
                </div>
                <div className="field">
                  <p className="parameter">Phone</p>
                  <p className="value">{payerMobNumber}</p>
                </div>
              </div>
            </div>
            {amountBean && Object.keys(amountBean).length ?

              <div className="flex amountDetails">
                <div className="dataTable">
                  <div className="field">
                    <p className="parameter">Bill Amount</p>
                    <p className="value">{fixedTwo(amountBean.actualAmount) + " " + amountBean.amountType}</p>
                  </div>
                  <div className="field">
                    <p className="parameter">MDR</p>
                    <p className="value">{fixedTwo(amountBean.endPointChargse) + " " + amountBean.amountType}</p>
                  </div>
                  <div className="field">
                    <p className="parameter">Applicable tax</p>
                    <p className="value">{fixedTwo(amountBean.gst) + " " + amountBean.amountType}</p>
                  </div>
                  <div className="field">
                    <p className="parameter">Convenience Fee</p>
                    <p className="value">{fixedTwo(amountBean.convCharge) + " " + amountBean.amountType}</p>
                  </div>
                </div>
              </div>
              : null}
            {amountBean && Object.keys(amountBean).length ?
              <div className="totalRow">
                <p>Total Amount</p>
                <p>{amountBean ? (fixedTwo(+amountBean.paidAmount) + " " + amountBean.amountType) : "-"}</p>
              </div>
              : null}
          </div>


          {/* Back to all payment modes */}
          <div className="buttonWrapper">
            <a className="changeMode" onClick={() => props.updateState(1)}>
              <img src={"https://s3.amazonaws.com/sabpaisa/arrow_back_ios_new.svg"} alt="arrow left" />
              <span>Change Mode of Payment</span>
            </a>
          </div>

          {childComp}

        </div>
      </div>
    </React.Fragment>
  );
};

export default Details;