import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const Listing = () => {
  const { zonesList } = useSelector((state: any) => state.dnsSlice);
  return (
    <Paper elevation={1}>
      <List>
        {zonesList.length > 0 ? (
          zonesList.map((v: any) => (
            <ListItem sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemText
                primary={v.name}
                secondary={v.name_servers.toString()}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No Data Found" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default Listing;
