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
export const setLanguage = (language: string) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("language", language);
}
export const getLanguage = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("language") || "English";
}
export const PLEASE_WAIT_TEXT = "Please wait...";

export const DEFAULT_LANGUAGES = [{ name: "English", img: "/icons/eng.png", code: "en" }, { name: "Russion", img: "/icons/ru.png", code: "ru" }, { name: "Ukrain", img: "/icons/ukr.png", code: "uk" }, { code: "de", name: "Deutsch", img: "/icons/du.png" }];