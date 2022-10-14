import * as React from 'react';
import { isPaymentMethodEnabled } from '../../../helpers/common-helper';
export interface props {
    updateState: (arg: number) => void;
    paymentData: { [key: string]: any }

}

export interface state {
}
export default class OtherMethods extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            submitted: false,
            currentState: 0
        };
    }
    isMappingExists = (mappingId: string) => {
        const { activeMapping } = this.props.paymentData;
        return isPaymentMethodEnabled(mappingId, activeMapping);
    }

    componentDidMount(): void {
        this.props.updateState(54)
    }
    render() {
        return (
            <React.Fragment>
                <div className="activity methods">
                    <div className="form form-collapsible">
                        <div className="form-header">
                            <h3 className="form-heading text-dark">Cash</h3>
                        </div>
                        <div className="flex payMethods">

                            {this.isMappingExists("cash") ?
                                <a onClick={() => this.props.updateState(54)} className="paymentMethod">
                                    <img src="https://s3.amazonaws.com/sabpaisa/cash.svg" alt="" />
                                    <span>Cash</span>
                                </a> : null}
                            {this.isMappingExists("rtgs") ?
                                <a onClick={() => this.props.updateState(51)} className="paymentMethod">
                                    <img src="https://s3.amazonaws.com/sabpaisa/rtgs.svg" alt="" />
                                    <span>E-RTGS </span>
                                </a> : null}
                            {this.isMappingExists("neft_rtgs") ?
                                <a onClick={() => this.props.updateState(52)} className="paymentMethod">
                                    <img src="https://s3.amazonaws.com/sabpaisa/neft.svg" alt="" />
                                    <span>E-NEFT</span>
                                </a> : null}
                            {this.isMappingExists("imps") ?
                                <a onClick={() => this.props.updateState(53)} className="paymentMethod">
                                    <img src="https://s3.amazonaws.com/sabpaisa/imps.svg" alt="" />
                                    <span>E-IMPS</span>
                                </a> : null}
                        </div>
                        <div className="section">
                            <p className="text-dark">How it works</p>
                            <div className="flex-between">
                                <div className="cardWrapper">
                                    <div className="card">
                                        <img src="https://s3.amazonaws.com/sabpaisa/generate.svg" alt="generate" className="image" />
                                        <p className="text text-center text-dark">
                                            Select bank to generate challan
                                        </p>
                                    </div>
                                    <p className="step">Step: 1</p>
                                </div>
                                <div className="cardWrapper">
                                    <div className="card">
                                        <img src="https://s3.amazonaws.com/sabpaisa/print.svg" alt="generate" className="image" />
                                        <p className="text text-center text-dark">
                                            Generate and Print Challan Invoice
                                        </p>
                                    </div>
                                    <p className="step">Step: 2</p>
                                </div>
                                <div className="cardWrapper">
                                    <div className="card">
                                        <img src="https://s3.amazonaws.com/sabpaisa/submit.svg" alt="generate" className="image" />
                                        <p className="text text-center text-dark">
                                            Submit challan and
                                            pay cash at the
                                            nearest bank
                                        </p>
                                    </div>
                                    <p className="step">Step: 3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}