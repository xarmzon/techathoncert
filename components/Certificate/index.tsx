import { BASE_URL } from "config";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";

const technical_skills = ["HTML", "CSS", "JavaScript"];
const soft_skills = ["Teamwork", "Communication", "Time Management"];
interface CertificateProps {
  fullName: string;
  userID: string;
  track: string;
  dateIssued: string;
}
const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ fullName, track, dateIssued, userID }, ref) => {
    return (
      <div ref={ref} className="relative w-full">
        <div className="relative w-full">
          <img
            className="mx-auto w-[100%]"
            src="/techathon_certificate_cover.jpg"
          />
          <div className="text-left text-primary absolute left-[5%] top-[8%] w-full px-5 py-2">
            <div className="max-w-[95%]">
              <img src="/logo.png" className="w-28" loading="lazy" />
              <h1 className="my-1 font-techathonMedium text-4xl">
                Certificate of Completion
              </h1>
              <p className="">This is to certify that</p>
              <h3 className="text-2xl my-1 font-techathonMedium">{fullName}</h3>
              <p className="mb-1">has successfully completed</p>
              <h3 className="text-2xl font-techathonMedium">{track}</h3>
              <p className="mb-1">The Programme includes</p>
              <div className="flex justify-between w-[68%]">
                <div className="">
                  <h4 className="font-semibold text-sm">Technical Skills</h4>
                  <ul className="text-sm">
                    {technical_skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <h4 className="font-semibold text-sm">Soft Skills</h4>
                  <ul className="text-sm">
                    {soft_skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm max-w-[85%]">
              <div className="flex flex-col items-center text-center">
                <img src="/signature_founder.png" className="w-20" alt="" />
                <h5 className="mt-[-12px] font-semibold">Onyearizo Wisdom</h5>
                <p className="text-xs mt-[-1px]">
                  Founder/CEO, Techathon Community
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img src="/signature_manager.png" className="w-20" alt="" />
                <h5 className="mt-[-12px] font-semibold">Nkejah Ruth</h5>
                <p className="text-xs mt-[-1px]">
                  Learning Manager, Techathon Community
                </p>
              </div>
            </div>
            <div className="text-xs mt-2 max-w-[90%]">
              <p className="font-semibold">Issued On: {dateIssued}</p>
              <p className=" line-clamp-1">
                Verify this Proof of Completion by visiting{" "}
                <Link href={`${BASE_URL}/${userID}`}>
                  <a className="text-accent">{`${BASE_URL}/${userID}`}</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Certificate;
