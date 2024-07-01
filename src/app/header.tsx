"use client";
import Image from "next/image";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Grid, Stack, Switch, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CustomButton from "./components/buttons/CustomButton";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const Header = () => {
  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4, md: 4 }}
          alignItems="center"
          height={{ xs: "auto", sm: 70 }} // Adjust the height for different screen sizes
        >
          <Box position="relative" width={150} height={150}>
            <Image
              src={"/img/logonew.png"}
              alt="Logo"
              layout="fill"
              objectFit="contain"
              style={{ display: "inline-block" }}
            />
          </Box>
          <Typography variant="h5" gutterBottom>
            Features
          </Typography>
          <Typography variant="h5" gutterBottom>
            Pricing
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent={{ xs: "center", md: "flex-end" }}
        >
          <LightModeIcon fontSize="large" />
          <Switch {...label} defaultChecked color="default" />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-end" }}
        >
          <LanguageIcon fontSize="large" />
          <Box borderRight={1} height="24px"></Box>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <CustomButton
            onPress={() => {}}
            style={{ borderRadius: 5, backgroundColor: "black" }}
            buttonText="Get Started"
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Box borderBottom={2}></Box>
      </Grid>
    </Grid>
  );
};

export default Header;
