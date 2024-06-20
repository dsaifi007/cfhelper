"use client";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Grid, Stack, Switch, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CustomButton from "./components/buttons/CustomButton";
const label = { inputProps: { "aria-label": "Color switch demo" } };

const Header = () => {
  return (
    <>
      <Grid container mt={3}>
        <Grid item xs={4} md={4} sm={4} lg={4}>
          <Stack direction={"row"} columnGap={4} height={70}>
            <Image
              src={"/img/logonew.png"}
              alt="Logo"
              width={200} //automatically provided
              height={200} //automatically provided
              style={{
                display: "inline-block", // Ensures the image behaves like an inline-block element
                lineHeight: 0,
                position: "relative",
                bottom: "80px",
              }}
            />

            <Typography variant="h5" gutterBottom>
              Features
            </Typography>
            <Typography variant="h5" gutterBottom>
              Pricing
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4.5} md={4.5} sm={4.5} lg={4.5}></Grid>
        <Grid item xs={1.5} md={1.5} sm={1.5} lg={1.5}>
          <Stack direction={"row"} columnGap={2}>
            <LightModeIcon fontSize="large" />
            <Switch {...label} defaultChecked color="default" />
          </Stack>
        </Grid>
        <Grid item xs={2} md={2} sm={2} lg={2}>
          <Stack direction={"row"} columnGap={3}>
            <LanguageIcon fontSize="large" />
            <Box borderRight={1}></Box>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <CustomButton
              onPress={() => {}}
              style={{ borderRadius: 5, bgcolor: "black" }}
              buttonText="Get Started"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} mt={-2}>
          <Box borderBottom={10} border={2}></Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Header;
