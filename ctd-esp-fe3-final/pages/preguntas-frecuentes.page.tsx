import PreguntasFrecuentes from "dh-marvel/components/preguntas-frecuentes/preguntasFrecuentes";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PreguntasFrecuentesType, preguntasFrecuentesData } from "../components/preguntas-frecuentes/preguntasFrecuentesData";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      preguntasFrecuentesData,
    },
  };
};

type Props = {
  preguntasFrecuentesData: PreguntasFrecuentesType[];
};

const PreguntasFrecuentesPage: NextPage<Props> = ({ preguntasFrecuentesData }) => {
  return (
    <>
      <Head>
        <title>Preguntas frecuentes</title>
        <meta name="preguntasFrecuentes" content="Preguntas frecuentes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title="Preguntas frecuentes">
        {preguntasFrecuentesData?.length
          ? preguntasFrecuentesData?.map((data) => <PreguntasFrecuentes key={data.id} data={data} />)
          : null}
      </BodySingle>
    </>
  );
};

export default PreguntasFrecuentesPage;
