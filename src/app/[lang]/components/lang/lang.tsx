import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { DEFAULT_LANGUAGES, getLangImage } from "@/utils/constant";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function LangMenu({ lang }: any) {
  const navigation = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Typography fontSize={18} sx={{ textTransform: "capitalize" }}>
              {langCode?.newcode}
            </Typography>
            &emsp;
            <Image src={getLangImage(lang)} alt={lang} width={32} height={32} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <>
          {DEFAULT_LANGUAGES.map((option: any) => (
            <MenuItem
              key={option.name}
              selected={option.name === lang}
              value={option.name}
              onClick={(e) => changeLanguage(e, option.code)}
            >
              <Image
                src={option.img}
                width={18}
                height={18}
                alt={option.name}
              />
              &nbsp;
              {option.name}
            </MenuItem>
          ))}
        </>
      </Menu>
    </React.Fragment>
  );
}
