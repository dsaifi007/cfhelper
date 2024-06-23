export const setToken = (token: any) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("access_token", token);
}
export const getToken = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("access_token");
}

export const setAuthEmail = (auth_email: string) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("auth_email", auth_email);
}
export const getAuthEmail = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("auth_email");
}

export const PLEASE_WAIT_TEXT = "Please wait...";