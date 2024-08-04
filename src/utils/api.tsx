import { Alert } from "./Alert";
import request from "./axios.instance";

/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const postApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  request
    .post(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error?.response?.data);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api url parameter
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const getApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  request
    .get(endPoint + params, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error.response.data);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */
const deleteApiCall = (
  endPoint: string,
  params: string = "",
  successCallback: Function,
  errorCallback: Function,
) => {
  request
    .delete(endPoint + params, {})
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error.response.data);
    });
};

/**
 *
 * @param endPoint api end point
 * @param params api request data
 * @param successCallback function for handle success response
 * @param errorCallback function for handle error response
 */

const patchApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  request
    .patch(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error.response.data);
    });
};
/**
 *
 * @param endPoint api end point
 * @param params request data
 * @param successCallback function for handle success response
 * @param errorCallback  function for handle error response
 */
const putApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCallback: Function,
) => {
  request
    .put(endPoint, params)
    .then((response: any) => {
      successCallback(response);
    })
    .catch((error: any) => {
      errorCallback(error.response.data);
    });
};

/**
 * export all function
 */
export const api = {
  putApiCall,
  getApiCall,
  postApiCall,
  patchApiCall,
  deleteApiCall,
};
