import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

import { Layout } from "Layout";
import "styles/index.scss";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Layout fontClass={inter.className}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
