import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NEXT_SEO } from "config/seo";
import { DefaultSeo } from "next-seo";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...NEXT_SEO} />
      <Toaster
        toastOptions={{
          // position: "bottom-left",
          duration: 8000,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
