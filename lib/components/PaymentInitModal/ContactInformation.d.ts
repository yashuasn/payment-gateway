import React from "react";
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
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    additionalClass?: string;
}
/**
 * Primary UI component for user interaction
 */
declare const PaymentInitModal: ({ isOpen, onClick, additionalClass }: PaymentInitModalProps) => JSX.Element;
export default PaymentInitModal;
