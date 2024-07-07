import { Box, Typography } from "@mui/material";

const Notfound = () => {
  return (
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
  );
};

export default Notfound;
