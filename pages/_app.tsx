import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

import { Layout } from "components";
import { theme } from "theme";

import "styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Layout fontClass={inter.className}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ThemeProvider>
  );
}
