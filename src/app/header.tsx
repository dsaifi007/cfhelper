"use client";
import { DEFAULT_LANGUAGES, getLanguage, setLanguage } from "@/utils/constant";
import DiamondIcon from '@mui/icons-material/Diamond';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageIcon from "@mui/icons-material/Language";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, Chip, Grid, Menu, MenuItem, Stack, Switch, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Image from "next/image";
import { useState } from "react";
import CustomButton from "./components/buttons/CustomButton";
const label = { inputProps: { "aria-label": "Color switch demo" } };
const ITEM_HEIGHT = 48;
const Header = () => {
  const [language, setLang] = useState<string>(getLanguage() || "English");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
    setLanguage(event.target.value);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container alignItems="center" >
      <Grid item xs={12} md={4} lg={4} sm={12}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 4, md: 4 }}
          alignItems="center"
          height={{ xs: "auto", sm: 70 }} // Adjust the height for different screen sizes
        >
          <Box position="relative" width={130} height={130}>
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
          <Chip size="medium" sx={{ borderColor: "white", borderRadius: 2, fontSize: 22, fontColor: "yellow", backgroundColor: "#FDB933", color: "white" }} icon={<DiamondIcon style={{ color: "white" }} />} label={<b>PRO</b>} />
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
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ color: "black" }}
          >
            {open ? <KeyboardArrowDownIcon fontSize="large" /> : <KeyboardArrowUpIcon fontSize="large" />}
            <LanguageIcon fontSize="large" />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {DEFAULT_LANGUAGES.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Box borderRight={1} height="24px"></Box>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <CustomButton
            onPress={() => { }}
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
