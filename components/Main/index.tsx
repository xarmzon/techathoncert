import Loader from "@components/Loader";
import { APP_NAME } from "config";
import { NextPage } from "next";
import React from "react";

const MainPage: NextPage = () => {
  return (
    <>
      {/* <Loader /> */}
      <div className="my-8 xl:my-20 max-w-5xl flex flex-col-reverse md:flex-row mx-auto rounded-lg overflow-hidden shadow-lg backdrop-blur-[2px]">
        <section className="p-5 lg:p-8 text-left flex-1"></section>
        <section className="bg-grdt p-5 lg:p-8 text-center flex-[2]">
          <h1 className="font-techathonMedium text-xl md:text-2xl lg:text-3xl lg:max-w-sm lg:mx-auto text-white tracking-wider">
            {APP_NAME} Certification Verification
          </h1>
        </section>
      </div>
    </>
  );
};

export default MainPage;
