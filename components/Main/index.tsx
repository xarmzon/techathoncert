import { NextPage } from "next";
import React from "react";

const MainPage: NextPage = () => {
  return (
    <main
      className={`py-5 px-5 container bg-circuit_bg bg-center bg-contain min-h-[70vh]`}
    >
      <section className="top">top</section>
      <section className="form">form</section>
    </main>
  );
};

export default MainPage;
