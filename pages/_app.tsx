import type { AppProps } from "next/app";
import { NEXT_SEO } from "config/seo";
import { DefaultSeo } from "next-seo";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO} />

      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
