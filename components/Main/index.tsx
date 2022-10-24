import Button from "@components/Button";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { APP_NAME } from "config";
import { api } from "config/api";
import { ICertificate } from "models/certificate.model";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFCertificate from "@components/Certificate/PDFCertificate";

const MainPage: NextPage = () => {
  const [error, setError] = useState<string>("");
  const [menteeID, setMenteeID] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [certImgData, setCertImgData] = useState<string>("");
  const [certificate, setCertificate] = useState<ICertificate>({
    fullName: "Adelola Kayode Samson",
    menteeID: "TM-OLTA120",
    track: "React JS",
    dateIssued: "22/11/2022",
    softSkills: ["Teamwork", "Communication", "Time Management"],
    technicalSkills: ["HTML", "CSS", "JavaScript"],
    trainingName: "Back-End Development",
  });

  const [show, setShow] = useState<boolean>(false);

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    setMenteeID((prev) => e.target.value);
  };

  const action = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShow(false);
    setCertImgData("");
    try {
      const { data } = await api.post<{
        certificate: ICertificate;
      }>("/verify", { menteeID });
      setCertificate((prev) => ({
        ...data.certificate,
      }));
      toast.success(
        `Congratulations ${data.certificate.fullName}, your certificate is valid and your track is ${data.certificate.track}`
      );
      setShow(true);
    } catch (error) {
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
        <section className="bg-grdt p-5 lg:p-8 text-center flex-[1.8] flex flex-col items-center justify-center space-y-5">
          <h1 className="font-techathonMedium text-xl md:text-2xl lg:text-3xl lg:max-w-sm lg:mx-auto text-white tracking-wider">
            {APP_NAME} Certification Verification
          </h1>
          {show && (
            <div className="w-full flex flex-col space-y-5 items-center">
              <PDFDownloadLink
                document={
                  <PDFCertificate
                    fullName={certificate.fullName}
                    menteeID={certificate.menteeID}
                    track={certificate.track}
                    trainingName={certificate.trainingName}
                    technicalSkills={certificate.technicalSkills}
                    softSkills={certificate.softSkills}
                    dateIssued={certificate.dateIssued}
                  />
                }
                fileName={`${APP_NAME}_${certificate.fullName
                  .toLowerCase()
                  .split(" ")
                  .join("_")}_${menteeID}_certificate.pdf`.toUpperCase()}
              >
                {({ blob, url, loading, error }) => {
                  return loading ? (
                    <p className="my-5 text-slate-100 italic">
                      Loading Certificate...
                    </p>
                  ) : error ? (
                    <p className="my-5 text-red-200 italic">
                      Error loading the certificate. Please try again
                    </p>
                  ) : (
                    <>
                      <Button className="bg-gradient-to-b !text-primary py-2 mt-3 from-slate-100 to-slate-300">
                        Download
                      </Button>
                    </>
                  );
                }}
              </PDFDownloadLink>
            </div>
          )}
        </section>
      </div>
      {certImgData && (
        <section
          className={`z-[99999999999999999] fixed flex items-center justify-center inset-0 w-full h-full bg-slate-300/40 backdrop-blur-[4px]`}
        >
          <Button
            className="h-10 w-10 rounded-full absolute top-5 right-5 flex items-center justify-center"
            onClick={() => setShow(false)}
          >
            X
          </Button>
          <div className="w-[95%] max-w-6xl h-[50%]">
            <PDFViewer className="w-full h-full">
              <PDFCertificate
                fullName={certificate.fullName}
                menteeID={certificate.menteeID}
                track={certificate.track}
                trainingName={certificate.trainingName}
                technicalSkills={certificate.technicalSkills}
                softSkills={certificate.softSkills}
                dateIssued={certificate.dateIssued}
              />
            </PDFViewer>
          </div>
        </section>
      )}
    </>
  );
};

export default MainPage;
