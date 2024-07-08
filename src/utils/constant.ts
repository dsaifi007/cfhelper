export const setToken = (token: any) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("access_token", token);
}
export const getToken = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("access_token");
}

export const getLanguageCode = () => {
    if (typeof window !== 'undefined')
        return localStorage.getItem("lang") || "en";
}
export const setLanguageCode = (lang: string) => {
    if (typeof window !== 'undefined')
        return localStorage.setItem("lang", lang);
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

export const DEFAULT_LANGUAGES = [{ name: "English", img: "/icons/eng.png", code: "en", newcode: "ENG" }, { name: "Русский", img: "/icons/du.png", code: "ru", newcode: "Pyc" }, { name: "Українська", img: "/icons/ukr.png", code: "uk", newcode: "УKP" }]; //, { code: "de", name: "Deutsche", img: "/icons/ru.png" }

export const getLangImage = (lang: string) => {
    switch (lang) {
        case "en":
            return "/icons/eng.png";
        case "ru":
            return "/icons/du.png";
        case "uk":
            return "/icons/ukr.png";
        case "de":
            return "/icons/ru.png";
        default:
            return "/icons/eng.png";
    }


}