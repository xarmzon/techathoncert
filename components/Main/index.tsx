import Loader from "@components/Loader";
import { APP_NAME } from "config";
import { NextPage } from "next";
import React, { ChangeEvent, FormEvent, useState } from "react";

const MainPage: NextPage = () => {
  const [idNumber, setIdNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mentee, setMentee] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const update = (e: ChangeEvent<HTMLInputElement>) => {
    setIdNumber((prev) => e.target.value);
  };
  const action = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="my-8 xl:my-20 max-w-5xl flex flex-col-reverse md:flex-row mx-auto rounded-lg overflow-hidden shadow-lg backdrop-blur-[2px]">
        <section className="p-5 lg:p-8 text-left flex-1">
          <h3 className="text-center text-sm xl:text-base">
            Please enter the identification number for the certificate you are
            verifying.
          </h3>
          <form
            onSubmit={action}
            className="w-full flex flex-col space-y-5 mt-5"
          >
            <input
              required
              type="text"
              placeholder="Identification Number"
              className={`w-full py-3 rounded-md border-[1px] ${
                error.length
                  ? "border-red-600 text-red-600 focus:ring-red-500"
                  : "border-slate-200 focus:ring-secondary text-primary-dark"
              } focus:border-transparent focus:outline-none duration-500`}
              onChange={update}
            />
            <button
              disabled={loading}
              type="submit"
              className="px-5 py-3 rounded-md bg-grdt text-white disabled:cursor-not-allowed"
            >
              Verify
            </button>
          </form>
        </section>
        <section className="bg-grdt p-5 lg:p-8 text-center flex-[1.8]">
          <h1 className="font-techathonMedium text-xl md:text-2xl lg:text-3xl lg:max-w-sm lg:mx-auto text-white tracking-wider">
            {APP_NAME} Certification Verification
          </h1>
        </section>
      </div>
    </>
  );
};

export default MainPage;
