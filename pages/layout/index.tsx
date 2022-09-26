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
      <div className="w-full mt-16 py-5 px-5 bg-circuit_bg bg-center bg-contain overflow-x-hidden min-h-[calc(100vh-128px-16px)]">
        {children}
      </div>
      {/* footer */}
    </>
  );
};

export default Layout;
