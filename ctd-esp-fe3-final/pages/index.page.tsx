import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { Comic } from "dh-marvel/features/card.type";
import { GridCard } from "dh-marvel/components/card/gridCard";
import { Box, CircularProgress, Pagination, Stack } from "@mui/material";
import { getComics } from "dh-marvel/services/marvel/marvel.service";
import { useEffect, useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await getComics(0, 12);
  return {
    props: {
      comics: response.data.results,
      total: response.data.total,
    },
  };
};

type props = {
  comics: Comic[];
  total: number;
};

const Index: NextPage<props> = ({ comics, total }) => {
  const [pageComic, setPageComic] = useState<Comic[]>(comics);
  const [page, setPage] = useState(1);
  const limit = 12;
  const [isLoading, setIsLoading] = useState(false);

  const getComicsApi = async () => {
    setIsLoading(true);
    const offset = limit * (page - 1);
    const params = new URLSearchParams();
    params.set("offset", `${offset}`);
    params.set("limit", `${12}`);

    await fetch("/api/comics?" + params.toString())
      .then((res) => res.json())
      .then((data) => {
        setPageComic(data.comics.results);
        return data;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getComicsApi();
  }, [page]);

  return (
    <>
      <Head>
        <title>DH-Marvel</title>
        <meta name="Home" content="Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BodySingle title={"Comics"}>
        <Stack spacing={2} alignItems="center">
          <Pagination
            size="medium"
            count={Math.ceil(total / 12)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
        {isLoading ? (
          <Stack spacing={2} alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <GridCard comics={pageComic} />
        )}

        <Stack spacing={2} alignItems="center">
          <Pagination
            size="medium"
            count={Math.ceil(total / 12)}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </BodySingle>
    </>
  );
};

export default Index;
