import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";
import { toast } from "react-toastify";

import { Layout } from "components";
import { theme } from "theme";

import { fetcher } from "utils";
import "styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        onError: (err) => toast.error(err.response.data.error ?? err.message),
      }}
    >
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <Layout fontClass={inter.className}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
