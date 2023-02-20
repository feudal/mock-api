import { Grid, CircularProgress } from "@mui/material";
import React from "react";

export const Loader = () => {
  return (
    <Grid
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={100} />
    </Grid>
  );
};
