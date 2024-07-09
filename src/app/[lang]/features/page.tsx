import { Box, Typography } from "@mui/material";
import { getDictionary } from "../dictionaries";
import RootLayout from "../layout";
import Headers from "../headers/page";
import Header from "../header";

const Page = async ({ params: { lang } }: any) => {
  const dict = await getDictionary(lang); // en

  return (
    <>
      <Header t={dict} lang={lang} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography
          variant="h2"
          alignItems={"center"}
          display={"flex"}
          gutterBottom
        >
          Coming Soon
        </Typography>
      </Box>
    </>
  );
};

export default Page;
