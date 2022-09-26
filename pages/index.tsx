import MainPage from "@components/Main";
import type { NextPage } from "next";
import Layout from "./layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <MainPage />
    </Layout>
  );
};

export default Home;
