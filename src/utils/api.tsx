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
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
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
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
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
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
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
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
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
      if (!navigator.onLine) {
        Alert(2, "No internet connection");
        return;
      }
      if (error.code === "ECONNABORTED") {
        let payload = {
          data: {
            statusCode: 408,
          },
        };
        errorCallback(payload);
      } else if (error.response) {
        errorCallback(error.response);
      } else if (!error.response) {
        let payload = {
          data: {
            statusCode: "",
            message: "Please try again later",
          },
        };
        errorCallback(payload);
      }
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
