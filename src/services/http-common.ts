import axios from "axios";
let url: string = "https://stage-securepay.sabpaisa.in/SabPaisa/";
// let url: string = "https://securepay.sabpaisa.in/SabPaisa/";

export default axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json"
    }
});


// Following create axios function is help create common  request in which header content-type='app/json'
const Axios = (baseURL: string) => {
    return axios.create({
        baseURL,
        headers: {
            "Content-type": "application/json"
        }
    });
}

const vpaValidate = Axios('https://vpavalidation.sabpaisa.in/VPA_VALIDATION/');
const binApi = Axios('https://binapi.sabpaisa.in/');
const stageSecurepay = Axios(url)



export {
    vpaValidate,
    stageSecurepay,
    binApi
}