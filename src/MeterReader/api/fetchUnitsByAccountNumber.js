import axiosConfig from '../../Config/axiosConfig';

export const fetchUnitsByAccountNumber = async (query) => {
    const responce = axiosConfig.get("/meter-readings", {
        params : {
            account_no: query
        }
    });
    return responce;
}


export const fetchAccountsByAccountNumber = async (query) => {
    const responce = axiosConfig.get("/account", {
        params : {
            mobile_number: '',
            account_number: query
        }
    });
    return responce;
}