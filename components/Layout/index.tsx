import { ToastContainer } from "react-toastify";
import React, { PropsWithChildren } from "react";
import { Container, Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Footer } from "./Footer";
import { TopBar } from "./TopBar";

import "react-toastify/dist/ReactToastify.min.css";

export interface LayoutProps {
  fontClass: string;
}

export const Layout = ({
  fontClass,
  children,
  ...props
}: PropsWithChildren<LayoutProps>) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated" && router.pathname !== "/login")
    router.push("/login");

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignContent={"stretch"}
        sx={{
          minHeight: "100vh",
          backgroundColor: (theme) => theme.palette.grey[200],
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.grey[200]),
        }}
        {...props}
      >
        <TopBar />

        <Container
          component="main"
          sx={{
            height: "100%",
            flexGrow: 1,
            py: 3,
          }}
        >
          {children}
        </Container>

        <Footer />
      </Grid>

      <ToastContainer position="top-right" limit={1} />
    </>
  );
};
