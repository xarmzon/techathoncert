import Header from "@components/Header";
import React, { ReactNode } from "react";
import { NextSeo } from "next-seo";
import Footer from "@components/Footer";
interface ILayout {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: ILayout) => {
  return (
    <>
      {title && <NextSeo title={title} />}
      <Header />
      <div className="w-full mt-10 py-5 px-5 bg-circuit_bg bg-center bg-contain overflow-x-hidden min-h-[calc(100vh-128px-16px)] grid place-items-center">
        <div className="w-full overflow-x-hidden">{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
