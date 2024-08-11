"use client";
import {
  DEFAULT_LANGUAGES,
  getLangImage,
  getLanguageCode,
  setLanguageCode,
} from "@/utils/constant";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTranslations } from "next-intl";
import {
  Box,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomButton from "./components/buttons/CustomButton";
import { getDictionary } from "./dictionaries";
import LangMenu from "./components/lang/lang";
const label = { inputProps: { "aria-label": "Color switch demo" } };
const ITEM_HEIGHT = 48;
const Header = async ({ t, lang }: any) => {
  // const dict = await getDictionary(lang);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigation = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    console.log("open", open);
    if (open) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
    //setLanguage(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (e: any, locale: string) => {
    navigation.push(`/${locale}`);
    setAnchorEl(null);
  };

  const langCode = DEFAULT_LANGUAGES.find((v: any) => v.code == lang);

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={7} lg={7} sm={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 8, md: 8 }}
          alignItems="center"
          height={{ xs: "auto", sm: 70 }} // Adjust the height for different screen sizes
        >
          <Box
            position="relative"
            width={130}
            height={130}
            className="showHandCursor"
            onClick={() => navigation.push("/")}
          >
            <Image
              src={"/img/logonew.png"}
              alt="Logo"
              layout="fill"
              objectFit="contain"
              style={{ display: "inline-block" }}
            />
          </Box>

          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/features")}
            gutterBottom
          >
            {t.feature}
            {/* {dict.features}features */}
          </Typography>
          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/features")}
            gutterBottom
          >
            {t.pricing}
          </Typography>
          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/domain-removes")}
            gutterBottom
          >
            {t.removeZones}
          </Typography>
          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/domain-status")}
            gutterBottom
          >
            {t.domainStatus}
          </Typography>
          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/features")}
            gutterBottom
          >
            {t.aiGenDomain}
          </Typography>
        </Stack>
      </Grid>

      <Grid item xs={12} md={2} lg={2} sm={12}>
        <Stack
          direction="row"
          spacing={3}
          justifyContent={{ xs: "center", md: "flex-end" }}
        >
          <LightModeIcon fontSize="large" />
          <Switch {...label} defaultChecked color="default" />
          {/* <Chip
            size="medium"
            sx={{
              borderColor: "white",
              borderRadius: 2,
              fontSize: 22,
              fontColor: "yellow",
              backgroundColor: "#FDB933",
              color: "white",
            }}
            className="showHandCursor"
            onClick={() => navigation.push("/comingsoon")}
            icon={<DiamondIcon style={{ color: "white" }} />}
            label={<b>PRO</b>}
          /> */}
        </Stack>
      </Grid>

      <Grid item xs={12} md={3} lg={3} sm={12}>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-end" }}
        >
          <LangMenu lang={lang} />
          <div></div>

          <Box borderRight={1} height="24px"></Box>
          <Typography
            variant="h6"
            className="showHandCursor"
            onClick={() => navigation.push("/login")}
            gutterBottom
          >
            {t.login}
          </Typography>
          <CustomButton
            className="showHandCursor"
            onPress={() => navigation.push("/signup")}
            style={{ borderRadius: 5, backgroundColor: "black" }}
            buttonText={t?.getStarted}
          />
        </Stack>
      </Grid>

      <Grid xs={12} pt={0}>
        <Box borderBottom={1}></Box>
      </Grid>
    </Grid>
  );
};

export default Header;
