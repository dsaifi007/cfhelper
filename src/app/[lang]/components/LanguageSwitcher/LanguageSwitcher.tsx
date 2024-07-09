"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const LanguageSwitcher = () => {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale) {
      setLocale(storedLocale);
      router.push(`/${storedLocale}${window.location.pathname}`);
    }
  }, []);

  const changeLanguage = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    setLocale(newLocale);
    router.push(`/${newLocale}${window.location.pathname}`);
  };

  return (
    <div>
      <Button onClick={() => changeLanguage("en")}>English</Button>
      <Button onClick={() => changeLanguage("fr")}>Français</Button>
      <Button onClick={() => changeLanguage("de")}>Deutsch</Button>
    </div>
  );
};

export default LanguageSwitcher;
