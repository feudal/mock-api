import { ThemeProvider } from "@mui/material/styles";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";
import { toast } from "react-toastify";

import { Layout } from "components";
import { theme } from "theme";

import { CustomError } from "types";
import "styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const fetcher = async (url: RequestInfo | URL) => {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error: CustomError = new Error(
        "An error occurred while fetching the data."
      );
      // Attach extra info to the error object.
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return res.json();
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        onError: (err) => toast.error(err.message),
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
