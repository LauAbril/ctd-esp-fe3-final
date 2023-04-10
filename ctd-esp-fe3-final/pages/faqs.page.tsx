import Faqs from "dh-marvel/components/faqs/faqs";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { FaqsType, faqsData } from "../components/faqs/faqsData";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      faqsData,
    },
  };
};

type Props = {
  faqsData: FaqsType[];
};

const FaqsPage: NextPage<Props> = ({ faqsData }) => {
  return (
    <>
      <Head>
        <title>Preguntas frecuentes</title>
        <meta name="faqs" content="Preguntas frecuentes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title="Preguntas frecuentes">
        {faqsData?.length
          ? faqsData?.map((data) => <Faqs key={data.id} data={data} />)
          : null}
      </BodySingle>
    </>
  );
};

export default FaqsPage;
