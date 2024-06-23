import { api } from "@/utils/api";
import { updateGlobalLoader } from "../loader/backdropSlice";
import { endpoints } from "@/app/utils/endpoints";
import { updateDns } from "./dnsSlice";
import { Alert } from "@/utils/Alert";
import { PLEASE_WAIT_TEXT } from "@/utils/constant";
import axios from "axios";
import axiosInstance from "@/utils/axios.instance";

export const handleDomains = (domains: string[], values: any) => {
    return async (dispatch: any, getState: any) => {
        for (let index = 0; index < domains.length; index++) {
            await dispatch(getAccountID(domains[index], index, values));
        }
    };
};

export const getAccountID = (domain: string, index: number, formData: any) => {
    return async (dispatch: any, getState: any) => {
        let { apisStatus } = getState().dnsSlice;
        let apis = [...apisStatus];
        if (!apis[index]) {
            apis[index] = {};
        }
        apis = apis.map((api, i) =>
            i === index
                ? { ...api, domainName: domain, step1: PLEASE_WAIT_TEXT, proxied: formData.proxied }
                : api
        );

        try {
            const respData = await axiosInstance.get(endpoints.getAccountId);
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step1: true, }
                    : api
            );
            await dispatch(updateDns({ apisStatus: apis }));
            await dispatch(toAddZone(formData, index, domain));
        } catch (error: any) {
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step1: false, error: error.response.data.errors[0].message }
                    : api
            );
            console.log("error", error);
            await dispatch(updateDns({ apisStatus: apis }));
        }
    };
};

export const toAddZone = (formData: any, index: number, domain: string) => {
    return async (dispatch: any, getState: any) => {
        let { apisStatus } = getState().dnsSlice;
        let apis = [...apisStatus];
        let postData = {
            "name": domain.trim(),
            "jump_start": true
        };

        try {
            const respData = await axiosInstance.post(endpoints.addZone, postData);
            let result = respData.data.result;
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step2: true, name_servers: result.name_servers }
                    : api
            );

            await dispatch(updateDns({ accountID: result.id, apisStatus: apis, zoneId: result.id }));
            await dispatch(toAddRecordForZone(result.id, formData, index));
        } catch (error: any) {
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step2: false, name_servers: [error.response.data.errors[0].message] }
                    : api
            );
            console.log("error", error);
            await dispatch(updateDns({ apisStatus: apis }));
        }
    };
};

export const toAddRecordForZone = (accountID: any, formData: any, index: number) => {
    return async (dispatch: any, getState: any) => {
        let { apisStatus } = getState().dnsSlice;
        let apis = [...apisStatus];
        let postData = {
            "type": "A",
            "name": "www",
            "content": formData.ip,
            "ttl": 3600,
            "proxied": formData.proxied
        };
        let url = endpoints.addZone + "/" + accountID + "/dns_records";

        try {
            const respData = await axiosInstance.post(url, postData);
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step3: true }
                    : api
            );
            await dispatch(updateDns({ dns_record_id: respData.data.result.id, apisStatus: apis }));

            if (formData.dns) {
                dispatch(deleteOldDns());
            }
            if (formData.clearCache) {
                dispatch(clearCache());
            }
            if (formData.ipv6) {
                dispatch(disabledIPv6());
            }
            if (formData.https) {
                dispatch(alwaysUseHttp());
            }

        } catch (error: any) {
            apis = apis.map((api, i) =>
                i === index
                    ? { ...api, step3: false, error: error.response.data.errors[0].message }
                    : api
            );
            console.log("error", error);
            await dispatch(updateDns({ apisStatus: apis }));
        }
    };
};
export const deleteOldDns = () => {
    return (dispatch: any, getState: any) => {
        const { zoneId, dns_record_id } = getState().dnsSlice;
        api.deleteApiCall(
            endpoints.addZone + `/${zoneId}` + "/dns_record_id/" + `/${dns_record_id}`,
            ``,
            (respData: any) => {
                console.log("deleteOldDns succsss", respData)
            },
            (error: any) => {
                console.log("deleteOldDns error", error)
            }
        );
    };
};

export const clearCache = () => {
    return (dispatch: any, getState: any) => {
        const { zoneId, totalDomains } = getState().dnsSlice;
        api.postApiCall(
            endpoints.addZone + `/${zoneId}` + "/purge_cache",
            { hosts: totalDomains },
            (respData: any) => {
                console.log("clearCache succsss", respData)
            },
            (error: any) => {
                console.log("clearCache error", error)
            }
        );
    };
};
export const disabledIPv6 = () => {
    return (dispatch: any, getState: any) => {
        const { zoneId } = getState().dnsSlice;
        api.patchApiCall(
            endpoints.addZone + `/${zoneId}` + "/settings/ipv6",
            { value: "off" },
            (respData: any) => {
                console.log("disabledIPv6 succsss", respData)
            },
            (error: any) => {
                console.log("disabledIPv6 error", error)
            }
        );
    };
};
export const alwaysUseHttp = () => {
    return (dispatch: any, getState: any) => {
        const { zoneId } = getState().dnsSlice;
        api.patchApiCall(
            endpoints.addZone + `/${zoneId}` + "/settings/always_use_https",
            { value: "off" },
            (respData: any) => {
                console.log("alwaysUseHttp succsss", respData)
            },
            (error: any) => {
                console.log("alwaysUseHttp error", error)
            }
        );
    };
};