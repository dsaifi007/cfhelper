import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
export default function GlobalLoader() {
  const { globalLoader } = useSelector(
    (state: RootState) => state.globalLoaderSlice,
  );
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={globalLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
