import "styles/index.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

import { Layout } from "Layout";
import { MockApiProvider } from "context";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MockApiProvider>
      <Layout fontClass={inter.className}>
        <Component {...pageProps} />
      </Layout>
    </MockApiProvider>
  );
}
