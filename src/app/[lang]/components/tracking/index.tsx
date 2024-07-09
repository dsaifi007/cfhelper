"use client";
import UseTranslation from "@/app/hooks/useTranslation";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const ProgressDialog = ({ open, onClose }: any) => {
  const { apisStatus, totalDomains, responseCount } = useSelector(
    (state: any) => state.dnsSlice,
  );
  const t = UseTranslation();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {t?.domainTracking}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography variant="h6">
            {responseCount == 0
              ? "Please wait..."
              : (responseCount / totalDomains.length) * 100 + "% Completed"}
          </Typography>
        </Box>
        <Box mb={2}>
          <LinearProgress
            variant="determinate"
            value={
              responseCount > 0
                ? (responseCount / totalDomains.length) * 100
                : 0
            }
            sx={{ height: 15, borderRadius: 5 }}
          />
        </Box>
        <List>
          {totalDomains?.map((v: any, i: number) => {
            return (
              <Box key={i} border={1} p={2} mb={2} borderColor="grey.300">
                <Typography pt={2} pb={2} variant="h6">
                  {v}
                </Typography>
                <Box
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  mb={1}
                  p={1}
                >
                  <ListItem>
                    <ListItemText primary={`create zone ${v}`} />
                    <Typography variant="body2" sx={{ color: "green" }}>
                      {apisStatus[i]?.step1 ? (
                        <DoneOutlinedIcon color="success" />
                      ) : (
                        <>
                          <ClearOutlinedIcon color="error" />
                          {apisStatus.length > 0 && apisStatus[i]?.message}
                        </>
                      )}
                    </Typography>
                  </ListItem>
                </Box>
                <Box
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  mb={1}
                  p={1}
                >
                  <ListItem>
                    <ListItemText primary={`create DNS record ${v}`} />
                    <Typography
                      variant="body2"
                      sx={{ color: apisStatus[i]?.step1 ? "green" : "red" }}
                    >
                      {apisStatus[i]?.step1 ? (
                        <DoneOutlinedIcon color="success" />
                      ) : (
                        <>
                          <ClearOutlinedIcon color="error" />
                          {apisStatus[i]?.message}
                        </>
                      )}
                    </Typography>
                  </ListItem>
                </Box>
                <Box
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  mb={1}
                  p={1}
                >
                  <ListItem>
                    <ListItemText primary={"create DNS record www"} />
                    <Typography variant="body2" sx={{ color: "green" }}>
                      {apisStatus[i]?.step2 ? (
                        <DoneOutlinedIcon color="success" />
                      ) : (
                        <>
                          <ClearOutlinedIcon color="error" />
                          {apisStatus[i]?.message}
                        </>
                      )}
                    </Typography>
                  </ListItem>
                </Box>
                {apisStatus[i]?.proxied && (
                  <Box
                    border={1}
                    borderColor="grey.300"
                    borderRadius={2}
                    mb={1}
                    p={1}
                  >
                    <ListItem>
                      <ListItemText primary={"ipv6 off"} />
                      <Typography variant="body2" sx={{ color: "green" }}>
                        <DoneOutlinedIcon color="success" />
                      </Typography>
                    </ListItem>
                  </Box>
                )}
                <Box
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  mb={1}
                  p={1}
                >
                  <ListItem>
                    <ListItemText
                      primary={`NS: ${
                        apisStatus[i]?.step2
                          ? apisStatus[i]?.name_servers?.toString()
                          : apisStatus[i]?.message
                      } `}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "green" }}
                    ></Typography>
                  </ListItem>
                </Box>
              </Box>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t?.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgressDialog;
