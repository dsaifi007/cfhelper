"use client";

import { getLanguageCode } from "@/utils/constant";
import { useEffect, useState } from "react";

const UseTranslation = () => {
    const [data, setData] = useState<any>()
    let lang = getLanguageCode() || "en";
    const language = async () => {
        await fetch(`/locales/${lang}/translations.json`)
            .then((res: any) => res.json())
            .then((res: any) => setData(res))
            .catch((err: any) => console.log("err", err));
    }
    useEffect(() => {
        language();
    }, [lang]);
    return data;
}

export default UseTranslation;