import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import { UserCard } from "./UserCard";

const pages = ["Projects", "APIs"];

export const TopBar = () => {
  return (
    <AppBar position="sticky" color="secondary">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Mock API
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            {pages.map((page) => (
              <Button
                href={`/${page.toLowerCase()}`}
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <UserCard />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
