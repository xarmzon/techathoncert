import { APP_NAME, EMAIL, MAIN_SITE } from "config";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="max-w-5xl mx-auto p-5 border-t-[1px] border-t-secondary text-center">
      <p>
        New to {APP_NAME}?
        <Link href={MAIN_SITE}>
          <a className="text-accent">
            {" "}
            Learn about Digital Skills Certification
          </a>
        </Link>
        . Have problems or questions about your certification? Please email{" "}
        <Link href={`mailto:${EMAIL}`}>
          <a className="text-accent">{EMAIL}</a>
        </Link>{" "}
      </p>
      <p className="mt-3">
        &copy;{new Date().getFullYear()}{" "}
        <Link href={MAIN_SITE}>
          <a className="text-accent">{APP_NAME} Community</a>
        </Link>{" "}
      </p>
    </footer>
  );
};

export default Footer;
