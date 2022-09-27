import React, { ReactNode } from "react";

interface CertificateWrapperProps {
  children: ReactNode;
}
const CertificateWrapper = ({ children }: CertificateWrapperProps) => {
  return <div className="mt-8 w-full">{children}</div>;
};

export default CertificateWrapper;
