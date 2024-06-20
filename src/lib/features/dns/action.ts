import { api } from "@/utils/api";
import { updateGlobalLoader } from "../loader/backdropSlice";
import { endpoints } from "@/app/utils/endpoints";
import { updateDns } from "./dnsSlice";
import { Alert } from "@/utils/Alert";


export const getAccountID = () => {
    return (dispatch: any, getState: any) => {
        // dispatch(updateGlobalLoader(true));
        api.getApiCall(
            endpoints.getAccountId,
            ``,
            (respData: any) => {
                //dispatch(updateGlobalLoader(false));
                // dispatch(
                //     updateDns({
                //         accountID: respData.data.result[0].id,
                //     })
                // );
                dispatch(toAddZone());
            },
            (error: any) => {
                dispatch(updateGlobalLoader(false));
                let { data } = error;
                Alert(2, data?.message || data?.responseMsg);
            }
        );
    };
};

export const toAddZone = () => {
    return (dispatch: any, getState: any) => {
        //const { formData, accountID } = getState.dnsSlice;
        let postData = {
            "name": "examsdasdapl2111.com",
            "jump_start": true
        }
        api.postApiCall(
            endpoints.addZone,
            postData,
            (respData: any) => {
                // dispatch(updateGlobalLoader(false));

                dispatch(
                    updateDns({
                        accountID: respData.data.result.id,
                    })
                );
                dispatch(toAddRecordForZone());
            },
            (error: any) => {
                dispatch(updateGlobalLoader(false));
                let { data } = error;
                Alert(2, data?.message || data?.responseMsg);
            }
        );
    };
};


export const toAddRecordForZone = () => {
    return (dispatch: any, getState: any) => {
        const { formData, accountID } = getState().dnsSlice;
        let postData = {
            "type": "A",
            "name": "www",
            "content": formData.ip,
            "ttl": 3600,
            "proxied": formData.proxied
        }
        api.postApiCall(
            endpoints.addZone + "/" + accountID + "/dns_records",
            postData,
            (respData: any) => {
                // dispatch(updateGlobalLoader(false));
                dispatch(
                    updateDns({
                        zoneId: respData.data.result.id,
                    })
                );
            },
            (error: any) => {
                dispatch(updateGlobalLoader(false));
                let { data } = error;
                Alert(2, data?.message || data?.responseMsg);
            }
        );
    };
};