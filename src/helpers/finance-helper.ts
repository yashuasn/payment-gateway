import { CardFeeCalculation } from "../services/Models/sabpaisa-payment-types";
import sabpaisaService from "../services/sabpaisa-service";

const makeApiReqCardFeeCalculation = (data: CardFeeCalculation) => {
    const payload = data;
    sabpaisaService.cardFeeCalculation(payload)
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })

}
export { makeApiReqCardFeeCalculation };
