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
            const respData = await axios.get("api?email=" + formData.email + "&apiKey=" + formData.apiKey);
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
            // await dispatch(updateDns({ apisStatus: apis }));
        }
    };
};

export const toAddZone = (formData: any, index: number, domain: string) => {
    return async (dispatch: any, getState: any) => {
        let { apisStatus } = getState().dnsSlice;
        let apis = [...apisStatus];
        let postData = {
            "name": domain.trim(),
            "jump_start": true,
            "email": formData.email,
            "apiKey": formData.apiKey,
            "endpoint": endpoints.addZone
        };

        try {
            const respData = await axios.post("api", postData); //endpoints.addZone
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
        let url = endpoints.addZone + "/" + accountID + "/dns_records";
        let postData = {
            "type": "A",
            "name": "www",
            "content": formData.ip,
            "ttl": 3600,
            "proxied": formData.proxied,
            "endpoint": endpoints.addZone + "/" + accountID + "/dns_records",
            "email": formData.email,
            "apiKey": formData.apiKey
        };
        try {
            const respData = await axios.post("api", postData);
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
    return async (dispatch: any, getState: any) => {
        const { zoneId, dns_record_id, formData } = getState().dnsSlice;
        try {
            let data = {
                headers: {},
                data: {
                    "endpoint": endpoints.addZone + `/${zoneId}` + "/dns_record_id/" + `/${dns_record_id}`,
                    "email": formData.email,
                    "apiKey": formData.apiKey
                }
            }
            const respData = await axios.delete("api", data);
        } catch (error: any) {
            console.log("error", error);
        }
    };
};

export const clearCache = () => {
    return async (dispatch: any, getState: any) => {
        const { zoneId, totalDomains, formData } = getState().dnsSlice;
        try {
            let postData = {
                "hosts": totalDomains,
                "endpoints": endpoints.addZone + `/${zoneId}` + "/purge_cache",
                "email": formData.email,
                "apiKey": formData.apiKey
            };
            const respData = await axios.post("api", postData);
        } catch (error: any) {
            console.log("error", error);

        }
    };
};
export const disabledIPv6 = () => {
    return async (dispatch: any, getState: any) => {
        const { zoneId, formData } = getState().dnsSlice;
        try {
            let postData = {
                "value": "off",
                "endpoints": endpoints.addZone + `/${zoneId}` + "/settings/ipv6",
                "email": formData.email,
                "apiKey": formData.apiKey
            };
            const respData = await axios.patch("api", postData);
        } catch (error: any) {
            console.log("error", error);

        }
    };
};
export const alwaysUseHttp = () => {
    return async (dispatch: any, getState: any) => {
        const { zoneId, formData } = getState().dnsSlice;
        try {
            let postData = {
                "value": "off",
                "endpoints": endpoints.addZone + `/${zoneId}` + "/settings/always_use_https",
                "email": formData.email,
                "apiKey": formData.apiKey
            };
            const respData = await axios.patch("api", postData);
        } catch (error: any) {
            console.log("error", error);

        }

    };
};