import "styles/index.scss";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

import { Layout } from "Layout";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout fontClass={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
