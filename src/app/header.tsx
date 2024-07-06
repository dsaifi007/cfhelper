"use client";
import { DEFAULT_LANGUAGES, getLanguage, setLanguage } from "@/utils/constant";
import DiamondIcon from "@mui/icons-material/Diamond";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LanguageIcon from "@mui/icons-material/Language";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
  Box,
  Chip,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import language from "./icons/language.png";
import { useState } from "react";
import CustomButton from "./components/buttons/CustomButton";
import { useRouter } from "next/navigation";
const label = { inputProps: { "aria-label": "Color switch demo" } };
const ITEM_HEIGHT = 48;
const Header = () => {
  const [language, setLang] = useState<string>(getLanguage() || "eng");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigation = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    //setLanguage(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (e: any, locale: string) => {
    setAnchorEl(null);
    navigation.push(`/${locale}`);
  };
  console.log("language", language);
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4, md: 4 }}
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
            Features
          </Typography>
          <Typography
            variant="h5"
            className="showHandCursor"
            onClick={() => navigation.push("/comingsoon")}
            gutterBottom
          >
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
          <Chip
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
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: "center", md: "flex-end" }}
        >
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ color: "black" }}
          >
            {open ? (
              <KeyboardArrowDownIcon fontSize="large" />
            ) : (
              <KeyboardArrowUpIcon fontSize="large" />
            )}
            <Image
              src={"/icons/lang2.png"}
              alt="language"
              width={30}
              height={30}
            />
            {/* <LanguageIcon fontSize="large" /> */}
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {DEFAULT_LANGUAGES.map((option) => (
              <MenuItem
                key={option.name}
                selected={option.name === "Pyxis"}
                value={option.name}
                onClick={(e) => changeLanguage(e, option.code)}
              >
                <Image
                  src={option.img}
                  width={16}
                  height={16}
                  alt={option.name}
                />
                &nbsp;
                {option.name}
              </MenuItem>
            ))}
          </Menu>
          <Box borderRight={1} height="24px"></Box>
          <Typography
            variant="h6"
            className="showHandCursor"
            onClick={() => navigation.push("/comingsoon")}
            gutterBottom
          >
            Login
          </Typography>
          <CustomButton
            className="showHandCursor"
            onPress={() => navigation.push("/comingsoon")}
            style={{ borderRadius: 5, backgroundColor: "black" }}
            buttonText="Get Started"
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
