import Header from "@components/Header";
import React, { ReactNode } from "react";
import { NextSeo } from "next-seo";
interface ILayout {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: ILayout) => {
  return (
    <>
      {title && <NextSeo title={title} />}
      <Header />
      {children}
      {/* footer */}
    </>
  );
};

export default Layout;
