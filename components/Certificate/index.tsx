import Image from "next/image";
import React, { forwardRef } from "react";

interface CertificateProps {
  fullName: string;
  track: string;
  dateIssued?: string;
}
const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ fullName, track, dateIssued }, ref) => {
    return (
      <div ref={ref} className="relative w-full">
        <div className="relative w-full">
          <img
            className="mx-auto w-[100%] lg:max-w-[80%]"
            src="/techathon_certificate_cover.jpg"
          />
          <div className="text-primary absolute left-[74px] top-4 max-w-[80%] px-5 py-2">
            <img src="/logo.png" className="w-24" loading="lazy" />
            <h1 className="mt-1 font-techathonMedium text-2xl">
              Certificate of Completion
            </h1>
          </div>
        </div>
      </div>
    );
  }
);

export default Certificate;
