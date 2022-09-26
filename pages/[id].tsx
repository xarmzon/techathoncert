import Layout from "@pages/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const VerifyPage: NextPage = () => {
  const router = useRouter();

  console.log(router.query);
  return <Layout title="Certificate Verification">VerifyPage</Layout>;
};

export default VerifyPage;
