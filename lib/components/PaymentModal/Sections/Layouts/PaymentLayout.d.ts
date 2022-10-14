import * as React from 'react';
export interface DetailsProps {
    childComp?: React.ReactNode;
    updateState: (arg: number) => void;
    paymentData: {
        [key: string]: any;
    };
}
export interface DetailsState {
}
declare const Details: React.FC<DetailsProps>;
export default Details;
