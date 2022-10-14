import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export interface PaymentInitModalProps {
  /**
   * Is this the principal call to action on the page?
   */
  isOpen?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  title: string;
  /**
   * Optional click handler
   */
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  additionalClass?: string;
};

/**
 * Primary UI component for user interaction
 */
const PaymentInitModal = ({
  isOpen = true,
  onClick,
  additionalClass
}: PaymentInitModalProps) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={onClick} className={additionalClass}>
        {/* <ModalHeader toggle={onClick}>{title}</ModalHeader> */}
        <ModalBody id="overlay">
          <div id="sdkPopup">
            <div className="popupHeader">
              <img src="https://s3.amazonaws.com/sabpaisa/lock.svg" alt="" />
              <span>Checkout</span>
            </div>
            <div className="popupBody">
              <div>
                <div className="clippedCard flex">
                  <div className="profileSection">
                    <img src="https://s3.amazonaws.com/sabpaisa/placeholder.svg" alt="profile" className="profilePicture" />
                    <h6 className="beneficiaryName text-white">Indian institute of Technology</h6>
                  </div>
                  <div className="metaSection">
                    <h2 className="partnerName text-white">Rajiv Shukla</h2>
                    <p className="text-white">Client Code - <strong>SP9IIU98</strong></p>
                    <h3 className="text-white amount"><img src="https://s3.amazonaws.com/sabpaisa/currency_rupee.svg" alt="rupee icon" /><span id="amount">558967.20</span></h3>
                  </div>
                </div>
                <div className="activity">
                  <div className="form form-collapsible">
                    <div className="form-header">
                      <h3 className="form-heading text-blue">Contact Information</h3>
                    </div>
                    <form action="">
                      <label >Email ID</label>
                      <a className="input inputWithIcon">
                        <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/mail.svg" alt="" /></span>
                        <input type="text" id="client_code" />
                      </a>
                      <label >Phone</label>
                      <a className="input inputWithIcon">
                        <span className="inputIcon"><img src="https://s3.amazonaws.com/sabpaisa/settings_phone.svg" alt="" /></span>
                        <input type="text" id="fName" />
                      </a>
                    </form>
                  </div>
                </div>
              </div>
              <a href="#" className="primaryButton">Continue</a>

              <div className="credits">
                <div className="text-center flex-center">
                  <img src="https://s3.amazonaws.com/sabpaisa/security.svg" alt="secure" />
                  <p>This payment is secured by SabPaisa</p>
                </div>
                <p className="text-center">By proceeding, you agree to our <a href="https://sabpaisa.in/privacy-policy">Terms & Privacy</a></p>
                <div className="partners">
                  <img src="https://s3.amazonaws.com/sabpaisa/paymentauth.svg" alt="partners" />
                </div>
                <div className="text-center">
                  <p className="text-small">Powered by</p>
                  <img src="https://s3.amazonaws.com/sabpaisa/sabpaisa-logo.svg" alt="sabpaisa logo" className="clientlogo" />
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default PaymentInitModal;
