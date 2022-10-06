import Button from "@components/Button";
import Certificate from "@components/Certificate";
import CertificateWrapper from "@components/Certificate/CertificateWrapper";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { APP_NAME } from "config";
import { api } from "config/api";
import useHTMLToImage from "hooks/useHTMLToImage";
import { NextPage } from "next";
import React, { useRef, ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const MainPage: NextPage = () => {
  const [error, setError] = useState<string>("");
  const [menteeID, setMenteeID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const elRef = useRef<HTMLDivElement>(null);
  const { convert, imageData } = useHTMLToImage({ ref: elRef });

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    setMenteeID((prev) => e.target.value);
  };

  const action = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/verify", { menteeID });
      console.log(data);
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      const err = error as any;
      const apiError = err.response?.data?.msg;
      if (apiError) {
        toast.error(apiError);
      } else {
        toast.error(err.message || "An Error Occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className={`z-[-99999999999] top-[80px] left-1/2 -translate-x-1/2 fixed w-[700px] ${
          loading ? "block" : "hidden"
        }`}
      >
        <Certificate
          ref={elRef}
          fullName="Adelola Kayode Samson"
          userID="TECH-03-4323232323"
          track="Frontend Development"
          dateIssued="September 6, 2022"
        />
      </div>

      {loading && <Loader />}
      <div className="my-8 xl:my-20 max-w-5xl flex flex-col-reverse md:flex-row mx-auto rounded-lg overflow-hidden shadow-lg backdrop-blur-[2px]">
        <section className="bg-white/40 p-5 lg:p-8 text-left flex-1 bg-cert_badge_g bg-left-top bg-no-repeat grid place-items-center bg-[length:10%_35%] sm:bg-[length:6%_30%] md:bg-[length:15%_25%] lg:bg-[length:65px_150px]">
          <div className="w-full">
            <h3 className="mb-5 text-center text-sm xl:text-base">
              Please enter the identification number for the certificate you are
              verifying.
            </h3>
            <form
              onSubmit={action}
              className="w-full flex flex-col space-y-5 mt-5"
            >
              <Input
                required
                type="text"
                value={menteeID}
                placeholder="Mentee Identification Number"
                error={error}
                onChange={update}
              />
              <Button disabled={loading} type="submit">
                Verify
              </Button>
            </form>
          </div>
        </section>
        <section className="bg-grdt p-5 lg:p-8 text-center flex-[1.8]">
          <h1 className="font-techathonMedium text-xl md:text-2xl lg:text-3xl lg:max-w-sm lg:mx-auto text-white tracking-wider">
            {APP_NAME} Certification Verification
          </h1>
          <CertificateWrapper>
            {imageData && (
              <img src={imageData} className="md:max-w-[80%] md:mx-auto" />
            )}
          </CertificateWrapper>
        </section>
      </div>
    </>
  );
};

export default MainPage;
