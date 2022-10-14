import React from "react";
import "../../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export interface PaymentModalProps {
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
declare const PaymentModal: ({ isOpen, onClick, additionalClass }: PaymentModalProps) => JSX.Element;
export default PaymentModal;
