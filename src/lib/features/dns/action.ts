import { api } from "@/utils/api";
import { updateGlobalLoader } from "../loader/backdropSlice";
import { endpoints } from "@/app/utils/endpoints";
import { updateDns } from "./dnsSlice";
import { Alert } from "@/utils/Alert";
import { PLEASE_WAIT_TEXT } from "@/utils/constant";
import axios from "axios";
import axiosInstance from "@/utils/axios.instance";

export const handleDomains = (domains:any, values:any) => {
  return async (dispatch:any, getState:any) => {
    let { apisStatus } = getState().dnsSlice;
    const apis = [...apisStatus];
    for (let index = 0; index < domains.length; index++) {
      console.log("index",index);
      await dispatch(getAccountID(domains[index], index, values));
    }
  };
};

const handleError = (error:any) => {
  return error?.data?.errors?.length > 0
    ? error?.data?.errors.map((v:any) => v.message).toString()
    : "Unknown error";
};

export const getAccountID = (domain:any, index:any, formData:any) => {
  return async (dispatch:any, getState:any) => {
    let { apisStatus } = getState().dnsSlice;
   // apis[index] = { ...apis[index], domainName: domain, step1: false, proxied: formData.proxied, message: "",name_servers:[] }

    try {
      const respData = await axios.get(`api?email=${formData.email}&apiKey=${formData.apiKey}`);
      const result = respData.data.result;

      const apis = [...apisStatus];
      if (respData.data.success == true) {
        apis[index] = {  step1: true, message: "",name_servers:[] };
        await dispatch(toAddZone(formData, index, domain));
      } else {
        
        apis[index] = {  step1: false, message: handleError(respData),name_servers:[] };
      }
      dispatch(updateDns({ apisStatus: apis }));
    } catch (error) {
      console.error("Error fetching account ID:", error);
    }
  };
};

export const toAddZone = (formData:any, index:any, domain:any) => {
  return async (dispatch:any, getState:any) => {
    let { apisStatus } = getState().dnsSlice;
    const postData = {
      name: domain.trim(),
      jump_start: true,
      email: formData.email,
      apiKey: formData.apiKey,
      endpoint: endpoints.addZone
    };

    try {
      const apis = [...apisStatus];
      const respData = await axios.post("api", postData);
      const result = respData.data.result;

      if (respData.data.success == true) {
        apis[index] = { ...apis[index], step2: true, name_servers: result.name_servers };
        dispatch(updateDns({ accountID: result.id, apisStatus: apis, zoneId: result.id }));
        await dispatch(toAddRecordForZone(result.id, formData, index));
      } else {
        apis[index] = { ...apis[index], step2: false, name_servers: [], message: handleError(respData) };
        dispatch(updateDns({ apisStatus: apis }));
      }
    } catch (error) {
      console.error("Error adding zone:", handleError(error));
    }
  };
};

export const toAddRecordForZone = (accountID:any, formData:any, index:any) => {
  return async (dispatch:any, getState:any) => {
    let { apisStatus } = getState().dnsSlice;
    const url = `${endpoints.addZone}/${accountID}/dns_records`;
    const postData = {
      type: "A",
      name: "www",
      content: formData.ip,
      ttl: 3600,
      proxied: formData.proxied,
      endpoint: url,
      email: formData.email,
      apiKey: formData.apiKey
    };

    try {
      const apis = [...apisStatus];
      const respData = await axios.post("api", postData);
      if (respData.data.success) {
        apis[index] = { ...apis[index], step3: true, message: "" };
        dispatch(updateDns({ dns_record_id: respData.data.result.id, apisStatus: apis }));
      } else {
        apis[index] = { ...apis[index], step3: false, message: handleError(respData) };
        dispatch(updateDns({ apisStatus: apis }));
      }

      if (formData.dns) dispatch(deleteOldDns());
      if (formData.clearCache) dispatch(clearCache());
      if (formData.ipv6) dispatch(disabledIPv6());
      if (formData.https) dispatch(alwaysUseHttp());

    } catch (error) {
      apis[index] = { ...apis[index], step3: false, message: handleError(error), error: handleError(error) };
      console.error("Error adding DNS record:", handleError(error));
      dispatch(updateDns({ apisStatus: apis }));
    }
  };
};

export const deleteOldDns = () => {
  return async (dispatch:any, getState:any) => {
    const { zoneId, dns_record_id, formData } = getState().dnsSlice;
    try {
      const data = {
        headers: {},
        data: {
          endpoint: `${endpoints.addZone}/${zoneId}/dns_record_id/${dns_record_id}`,
          email: formData.email,
          apiKey: formData.apiKey
        }
      };
      await axios.delete("api", data);
    } catch (error) {
      console.error("Error deleting old DNS:", handleError(error));
    }
  };
};

export const clearCache = () => {
  return async (dispatch:any, getState:any) => {
    const { zoneId, totalDomains, formData } = getState().dnsSlice;
    try {
      const postData = {
        hosts: totalDomains,
        endpoints: `${endpoints.addZone}/${zoneId}/purge_cache`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.post("api", postData);
    } catch (error) {
      console.error("Error clearing cache:", handleError(error));
    }
  };
};

export const disabledIPv6 = () => {
  return async (dispatch:any, getState:any) => {
    const { zoneId, formData } = getState().dnsSlice;
    try {
      const postData = {
        value: "off",
        endpoints: `${endpoints.addZone}/${zoneId}/settings/ipv6`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.patch("api", postData);
    } catch (error) {
      console.error("Error disabling IPv6:", handleError(error));
    }
  };
};

export const alwaysUseHttp = () => {
  return async (dispatch:any, getState:any) => {
    const { zoneId, formData } = getState().dnsSlice;
    try {
      const postData = {
        value: "off",
        endpoints: `${endpoints.addZone}/${zoneId}/settings/always_use_https`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.patch("api", postData);
    } catch (error) {
      console.error("Error setting always use HTTPS:", handleError(error));
    }
  };
};
