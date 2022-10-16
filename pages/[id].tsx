import Layout from "@pages/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@components/Button";
import Input from "@components/Input";
import Loader from "@components/Loader";
import { APP_NAME } from "config";
import { api } from "config/api";
import { ICertificate } from "models/certificate.model";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFCertificate from "@components/Certificate/PDFCertificate";

const VerifyPage: NextPage = () => {
  const router = useRouter();
  const [menteeID, setMenteeID] = useState<string>(
    () => (router.query?.id as string) || ""
  );
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    const action = async () => {
      !loading && setLoading(true);
      setShow(false);
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

    if (menteeID) {
      action();
    }
  }, [menteeID]);

  useEffect(() => {
    !menteeID && setMenteeID(() => (router.query?.id as string) || "");
  }, [router.query]);

  console.log(router.query);
  return (
    <Layout title="Certificate Verification">
      {loading && <Loader />}
      <section className="bg-grdt p-5 lg:p-8 text-center flex flex-col space-y-8">
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
                if (!loading && !error && blob) {
                  let reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    // console.log(reader.result);
                  };
                }

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
                    {/* <img
                          src={blob}
                          className="md:max-w-[80%] md:mx-auto"
                        /> */}
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
    </Layout>
  );
};

export default VerifyPage;
