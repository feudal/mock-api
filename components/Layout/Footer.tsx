import { Container, Paper, Typography } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Paper
      component="footer"
      sx={{
        py: 3,
        borderRadius: 0,
        color: (theme) => theme.palette.secondary.contrastText,
        backgroundColor: (theme) => theme.palette.secondary.main,
      }}
    >
      <Container>
        <Typography align="center">
          &copy; {new Date().getFullYear()} Mock API - All rights reserved
        </Typography>
      </Container>
    </Paper>
  );
};
