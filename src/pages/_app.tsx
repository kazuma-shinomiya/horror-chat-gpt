import type { AppProps } from "next/app";
import Layout from "src/components/layout";
import "src/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
