import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NEXT_SEO } from "config/seo";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO} />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
