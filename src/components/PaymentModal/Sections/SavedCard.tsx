import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export interface props {
    updateState: (arg: number) => void;
}

export interface state {
}
export default class SavedCard extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            submitted: false,
            currentState: 0
        };
    }
    render() {
        return (
            <React.Fragment>
                <div className="activity">
                    <div className="form form-collapsible">
                        <div className="form-header">
                            <h3 className="form-heading text-dark">Saved Cards</h3>
                        </div>
                        {/* <FormGroup tag="fieldset">
                            <FormGroup check>
                                <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Option one is this and that—be sure to include why it's great
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                <Input type="radio" name="radio1" />{' '}
                                Option two can be something else and selecting it will deselect option one
                                </Label>
                            </FormGroup>
                            <FormGroup check disabled>
                                <Label check>
                                <Input type="radio" name="radio1" disabled />{' '}
                                Option three is disabled
                                </Label>
                            </FormGroup>
                        </FormGroup> */}
                        <div className="savedCard">
                            <div className="select customRadio">
                                <FormGroup tag="fieldset">
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio1" />{' '}
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                            <div className="cardInfo">
                                <p className="text-dark">State Bank of India</p>
                                <p className="text-dark flex-center"><span>****3309</span> <img src="https://s3.amazonaws.com/sabpaisa/razorpay-with-all-cards-upi-seeklogo.svg" alt="" /></p>
                                <p className="text-dark">Rajiv Shukla</p>
                                <p className="text-dark">Expires 05/2024</p>
                            </div>
                            <button className="delete"><img src="https://s3.amazonaws.com/sabpaisa/delete.svg" alt="" /></button>
                        </div>

                        <div className="savedCard">
                            <div className="select customRadio">
                                <FormGroup tag="fieldset">
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio1" />{' '}
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                            <div className="cardInfo">
                                <p className="text-dark">State Bank of India</p>
                                <p className="text-dark flex-center"><span>****3309</span> <img src="https://s3.amazonaws.com/sabpaisa/razorpay-with-all-cards-upi-seeklogo.svg" alt="" /></p>
                                <p className="text-dark">Rajiv Shukla</p>
                                <p className="text-dark">Expires 05/2024</p>
                            </div>
                            <button className="delete"><img src="https://s3.amazonaws.com/sabpaisa/delete.svg" alt="" /></button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }
}