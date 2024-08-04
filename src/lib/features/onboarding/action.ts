import { api } from "@/utils/api";
import { updateGlobalLoader } from "../loader/backdropSlice";
import { endpoints } from "@/app/utils/endpoints";
import { Alert } from "@/utils/Alert";
import { setAccessToken } from "@/utils/constant";

export const signupUser = (values: any, navigate: any) => {
    return (dispatch: any, getState: any) => {
        dispatch(updateGlobalLoader(true));
        api.postApiCall(
            endpoints.signup,
            values,
            (respData: any) => {
                dispatch(updateGlobalLoader(false));
                Alert(1, respData?.data?.msg);
                navigate.push("/login");
            },
            (error: any) => {
                dispatch(updateGlobalLoader(false));
                console.log("eeee", error);
                let { data } = error;
                Alert(2, error.msg);
            }
        );
    };
};
export const loginUser = (values: any, navigate: any) => {
    return (dispatch: any, getState: any) => {
        dispatch(updateGlobalLoader(true));
        api.postApiCall(
            endpoints.login,
            values,
            (respData: any) => {
                dispatch(updateGlobalLoader(false));
                Alert(1, respData?.data?.msg);
                setAccessToken(respData?.data?.data);
                navigate.push("/dashboard");
            },
            (error: any) => {
                Alert(2, error.msg);
                dispatch(updateGlobalLoader(false));
                console.log("eeee", error);

            }
        );
    };
};
export const sendLinkForgotPaasword = (values: any, navigate: any) => {
    return (dispatch: any, getState: any) => {
        dispatch(updateGlobalLoader(true));
        api.postApiCall(
            endpoints.forgotPassword,
            values,
            (respData: any) => {
                dispatch(updateGlobalLoader(false));
                Alert(1, respData?.data?.msg);
                navigate.push("/login");
            },
            (error: any) => {
                Alert(2, error.msg);
                dispatch(updateGlobalLoader(false));
                console.log("eeee", error);

            }
        );
    };
};

export const resetPasswordAPI = (values: any, navigate: any) => {
    return (dispatch: any, getState: any) => {
        dispatch(updateGlobalLoader(true));
        api.postApiCall(
            endpoints.resetPassword,
            values,
            (respData: any) => {
                dispatch(updateGlobalLoader(false));
                Alert(1, respData?.data?.msg);
                navigate.push("/login");
            },
            (error: any) => {
                Alert(2, error.msg);
                dispatch(updateGlobalLoader(false));
                console.log("eeee", error);

            }
        );
    };
};