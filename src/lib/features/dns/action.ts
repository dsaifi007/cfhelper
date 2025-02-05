import { endpoints } from "@/app/utils/endpoints";
import axios from "axios";
import { updateDns } from "./dnsSlice";
import { updateGlobalLoader } from "../loader/backdropSlice";
import { api } from "@/utils/api";
import { Alert } from "@/utils/Alert";

export const handleDomains = (domains: any, values: any) => {
  return async (dispatch: any, getState: any) => {
    let { apisStatus } = getState().dnsSlice;
    const apis = [...apisStatus];
    for (let index = 0; index < domains.length; index++) {
      await dispatch(getAccountID(domains[index], index, values));
    }
  };
};

const handleError = (error: any) => {
  return error?.data?.errors?.length > 0
    ? error?.data?.errors.map((v: any) => v.message).toString()
    : "Unknown error";
};

export const getAccountID = (domain: any, index: any, formData: any) => {
  return async (dispatch: any, getState: any) => {
    let { apisStatus } = getState().dnsSlice;
    // apis[index] = { ...apis[index], domainName: domain, step1: false, proxied: formData.proxied, message: "",name_servers:[] }

    try {
      const respData = await axios.get(`/api?email=${formData.email}&apiKey=${formData.apiKey}&endpoint=zones`);
      const result = respData.data.result;

      const apis = [...apisStatus];


      if (respData.data.success == true) {
        apis[index] = { ...apis[index], step1: true, name_servers: [] };
        dispatch(updateDns({ apisStatus: apis }));
        await dispatch(toAddZone(formData, index, domain));
      } else {
        apis[index] = { ...apis[index], step1: false, message: handleError(respData), name_servers: [] };
        dispatch(updateDns({ apisStatus: apis }));
      }

    } catch (error) {
      console.error("Error fetching account ID:", error);
    }
  };
};

export const toAddZone = (formData: any, index: any, domain: any) => {
  return async (dispatch: any, getState: any) => {
    let { apisStatus, responseCount } = getState().dnsSlice;
    const postData = {
      name: domain.trim(),
      jump_start: true,
      email: formData.email,
      apiKey: formData.apiKey,
      endpoint: endpoints.addZone
    };

    try {
      const apis = [...apisStatus];
      const respData = await axios.post("/api", postData);
      const result = respData.data.result;
      console.log("step-1", respData.data.success)

      if (respData.data.success == true) {
        apis[index] = { ...apis[index], step2: true, name_servers: result.name_servers };
        dispatch(updateDns({ accountID: result.id, apisStatus: apis, zoneId: result.id }));
        await dispatch(toAddRecordForZone(result.id, formData, index));
        if (formData.dns) await dispatch(deleteOldDns());
        await dispatch(toAddRecordForZone(result.id, formData, index));

      } else {
        const url = `/api?email=${formData.email}&apiKey=${formData.apiKey}&endpoint=zones`
        const newRes = await axios.get(url);

        const resObject = newRes.data.result.find((v: any) => v.name == domain.trim());
        dispatch(updateDns({ zoneId: resObject.id }));
        // await dispatch(toAddRecordForZone(resObject.id, formData, index));
        if (formData.dns) await dispatch(deleteOldDns());
        await dispatch(checkDnsExist(domain, index, formData));
        //await dispatch(toAddRecordForZone(resObject.id, formData, index));
        apis[index] = { ...apis[index], step2: false, name_servers: [], message: handleError(respData) };
        dispatch(updateDns({ apisStatus: apis, zoneId: resObject.id }));

      }
      if (formData.clearCache) await dispatch(clearCache());
      await dispatch(disabledIPv6());
      await dispatch(alwaysUseHttp());
      dispatch(updateDns({ responseCount: responseCount + 1 }));


    } catch (error) {
      console.error("Error adding zone:", handleError(error));
    }
  };
};



export const checkDnsExist = (domain: any, index: any, formData: any) => {
  return async (dispatch: any, getState: any) => {
    let { zoneId, apisStatus } = getState().dnsSlice;
    try {
      let endpoint = `zones/${zoneId}/dns_records`;

      const respData = await axios.get(`/api?email=${formData.email}&apiKey=${formData.apiKey}&endpoint=${endpoint}`);
      const result = respData.data.result;

      const apis = [...apisStatus];

      if (respData.data.success == true) {
        let result = respData.data.result;//.filter((v: any) => v.zone_name == domain && v.zone_name == "www." + domain);
        console.log("result.length123454321234321", result)
        if (result.length > 0) {
          for (let inde = 0; inde < result.length; inde++) {
            await dispatch(updateZone(formData, result[inde].id, result[inde].name, index));
          }
        } else {
          await dispatch(toAddRecordForZone(zoneId, formData, index));
        }
        // apis[index] = { ...apis[index], step1: true, name_servers: [] };
        //dispatch(updateDns({ apisStatus: apis }));
        // await dispatch(toAddZone(formData, index, domain));
      } else {
        apis[index] = { ...apis[index], step1: false, message: handleError(respData), name_servers: [] };
        dispatch(updateDns({ apisStatus: apis }));
      }

    } catch (error) {
      console.error("Error fetching account ID:", error);
    }
  };
};

export const updateZone = (formData: any, dns_record_id: any, domainname: any, index: any) => {
  return async (dispatch: any, getState: any) => {
    let { zoneId, apisStatus } = getState().dnsSlice;
    const url = `${endpoints.addZone}/${zoneId}/dns_records/${dns_record_id}`;
    const postData = {
      type: "A",
      name: domainname,
      content: formData.ip,
      ttl: 3600,
      proxied: formData.proxied,
      endpoint: url,
      email: formData.email,
      apiKey: formData.apiKey,
      id: dns_record_id
      //zone_id: zoneId
    };
    try {
      //const apis = [...apisStatus];
      const respData = await axios.patch("/api", postData);

      if (respData.data.success) {
        //apis[index] = { ...apis[index], step3: true, message: "" };
        dispatch(updateDns({ dns_record_id: respData.data.result.id }));
      } else {
        //apis[index] = { ...apis[index], step3: false, message: handleError(respData) };
        // dispatch(updateDns({ apisStatus: apis }));
      }

    } catch (error) {
      const apis = [...apisStatus];
      apis[index] = { ...apis[index], step3: false, message: handleError(error), error: handleError(error) };
      console.error("Error adding DNS record:", handleError(error));
      dispatch(updateDns({ apisStatus: apis }));
    }
  };
};


export const toAddRecordForZone = (accountID: any, formData: any, index: any) => {
  return async (dispatch: any, getState: any) => {
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


    const postData1 = {
      type: "A",
      name: "@",
      content: formData.ip,
      ttl: 3600,
      proxied: formData.proxied,
      endpoint: url,
      email: formData.email,
      apiKey: formData.apiKey
    };

    try {
      const apis = [...apisStatus];
      const respData = await axios.post("/api", postData);
      const respData1 = await axios.post("/api", postData1);
      if (respData.data.success) {
        apis[index] = { ...apis[index], step3: true, message: "" };
        dispatch(updateDns({ dns_record_id: respData.data.result.id, apisStatus: apis }));
      } else {
        apis[index] = { ...apis[index], step3: false, message: handleError(respData) };
        dispatch(updateDns({ apisStatus: apis }));
      }




    } catch (error) {
      const apis = [...apisStatus];
      apis[index] = { ...apis[index], step3: false, message: handleError(error), error: handleError(error) };
      console.error("Error adding DNS record:", handleError(error));
      dispatch(updateDns({ apisStatus: apis }));
    }
  };
};

export const deleteOldDns = () => {
  return async (dispatch: any, getState: any) => {
    const { zoneId, dns_record_id, formData } = getState().dnsSlice;
    try {
      const data = {
        headers: {},
        data: {
          // `${endpoints.addZone}/${zoneId}/dns_record_id/${dns_record_id}`,
          endpoint: `${endpoints.addZone}/${zoneId}/dns_records?per_page=50000`,
          email: formData.email,
          apiKey: formData.apiKey,
          zoneId: zoneId
        }
      };
      await axios.delete("/api", data);
    } catch (error) {
      console.error("Error deleting old DNS:", handleError(error));
    }
  };
};

export const clearCache = () => {
  return async (dispatch: any, getState: any) => {
    const { zoneId, totalDomains, formData } = getState().dnsSlice;
    try {
      const postData = {
        hosts: totalDomains,
        endpoint: `${endpoints.addZone}/${zoneId}/purge_cache`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.post("/api", postData);
    } catch (error) {
      console.error("Error clearing cache:", handleError(error));
    }
  };
};

export const disabledIPv6 = () => {
  return async (dispatch: any, getState: any) => {
    const { zoneId, formData } = getState().dnsSlice;
    try {
      const postData = {
        value: formData.ipv6 ? "off" : "on",
        endpoint: `${endpoints.addZone}/${zoneId}/settings/ipv6`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.patch("/api", postData);
    } catch (error) {
      console.error("Error disabling IPv6:", handleError(error));
    }
  };
};

export const alwaysUseHttp = () => {
  return async (dispatch: any, getState: any) => {
    const { zoneId, formData } = getState().dnsSlice;
    try {
      const postData = {
        value: formData.https ? 'on' : "off",
        endpoint: `${endpoints.addZone}/${zoneId}/settings/always_use_https`,
        email: formData.email,
        apiKey: formData.apiKey
      };
      await axios.patch("/api", postData);
    } catch (error) {
      console.error("Error setting always use HTTPS:", handleError(error));
    }
  };
};


export const getAllZones = (values: any, router: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(updateGlobalLoader(true));
      const respData = await axios.get(`/api?email=${values.email}&apiKey=${values.apiKey}&endpoint=zones?per_page=500`);
      const result = respData.data.result;
      dispatch(updateDns({ zonesList: result }));

      dispatch(updateGlobalLoader(false));
      router.push("/domain-removes/domains")
    } catch (error) {
      dispatch(updateGlobalLoader(false));
      console.error("Error fetching account ID:", error);
    }
  };
};

export const removelDomains = (nav: any) => {
  return async (dispatch: any, getState: any) => {
    let { zonesList } = getState().dnsSlice;

    for (let index = 0; index < zonesList.length; index++) {
      console.log("zonesList[index]['id']", zonesList[index]['id']);

      // Await the dispatch call to ensure it completes before moving to the next one
      await dispatch(deleteDomains(zonesList[index]['id']));
    }
    nav.push("/domain-removes");
  };
};

export const deleteDomains = (zoneId: string) => {
  return async (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    const { formData } = getState().dnsSlice;

    try {

      const data = {
        headers: {},
        data: {
          // `${endpoints.addZone}/${zoneId}/dns_record_id/${dns_record_id}`,
          endpoint: `${endpoints.addZone}/${zoneId}`,
          email: formData.email,
          apiKey: formData.apiKey,
          zoneId: zoneId,
          flag: true
        }
      };
      console.log("data11111111111", data)
      // Axios DELETE requests usually use the second argument for config, so it should be:
      await axios.delete("/api", data);

      dispatch(updateGlobalLoader(false));
    } catch (error) {
      console.error("Error deleting old DNS:", handleError(error));
      dispatch(updateGlobalLoader(false));  // Make sure to hide loader on error as well
    }
  };
};

export const getDomainInfo = (values: any, navigate: any) => {
  return (dispatch: any, getState: any) => {
    dispatch(updateGlobalLoader(true));
    api.postApiCall(
      endpoints.getDomainInfo,
      values,
      (respData: any) => {
        dispatch(updateGlobalLoader(false));
        dispatch(updateDns({ domainInfo: respData.data }))
        navigate.push("/domain-status/info");
      },
      (error: any) => {
        Alert(2, error.msg);
        dispatch(updateGlobalLoader(false));
        console.log("eeee", error);

      }
    );
  };
};