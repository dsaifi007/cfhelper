import { Box, Typography } from "@mui/material";
import { getDictionary } from "../dictionaries";
import RootLayout from "../layout";
import Header from "../header";

const Headers = async ({ params: { lang } }: any) => {
  const dict = await getDictionary(lang); // en

  return (
    <RootLayout>
      <Header t={dict} lang={lang} />
    </RootLayout>
  );
};

export default Headers;
