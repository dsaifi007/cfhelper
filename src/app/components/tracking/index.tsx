import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  LinearProgress,
  Box,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseIcon from "@mui/icons-material/Close";

const ProgressDialog = ({ open, onClose }: any) => {
  const tasks = [
    "create zone testing123456.xyz",
    "create DNS record testing123456.xyz",
    "create DNS record www",
    "ipv6 off",
    "NS: annabel.ns.cloudflare.com, sonny.ns.cloudflare.com",
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Domain Tracking
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
          <Typography variant="h6">100% Complete</Typography>
        </Box>
        <Box mb={2}>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ height: 15, borderRadius: 5 }}
          />
        </Box>
        <List>
          <Box border={1} p={2} mb={2} borderColor="grey.300">
            <Typography pt={2} pb={2} variant="h6">
              100% Complete
            </Typography>
            {tasks.map((task, index) => (
              <Box
                key={index}
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                mb={1}
                p={1}
              >
                <ListItem>
                  <ListItemText primary={task} />
                  <Typography variant="body2" sx={{ color: "green" }}>
                    <DoneOutlinedIcon color="success" />
                    <ClearOutlinedIcon color="error" />
                  </Typography>
                </ListItem>
              </Box>
            ))}
          </Box>

          <Box border={1} mb={2} p={2} borderColor="grey.300">
            <Typography pt={2} pb={2} variant="h6">
              100% Complete
            </Typography>
            {tasks.map((task, index) => (
              <Box
                key={index}
                border={1}
                borderColor="grey.300"
                borderRadius={2}
                mb={1}
                p={1}
              >
                <ListItem>
                  <ListItemText primary={task} />
                  <Typography variant="body2" sx={{ color: "green" }}>
                    <DoneOutlinedIcon color="success" />
                    <ClearOutlinedIcon color="error" />
                  </Typography>
                </ListItem>
              </Box>
            ))}
          </Box>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Tracking = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Show Progress
      </Button>
      <ProgressDialog open={open} onClose={handleClose} />
    </div>
  );
};

export default Tracking;
