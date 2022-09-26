import { APP_NAME, BASE_URL, DESCRIPTION } from "./index";
import { NextSeoProps } from "next-seo";

export const NEXT_SEO: NextSeoProps = {
  title: `${APP_NAME} Certificate Verification`,
  description: DESCRIPTION,
  titleTemplate: `%s | Providing you a seamless transition into tech`,
  openGraph: {
    title: `${APP_NAME} Certificate Verification`,
    description: DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}/ds.png`,
        height: 600,
        width: 600,
      },
    ],
  },
};
