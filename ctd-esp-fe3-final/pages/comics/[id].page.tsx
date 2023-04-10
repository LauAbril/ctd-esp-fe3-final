import { Comic } from "dh-marvel/features/card.type";
import { NextPage } from "next";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { CardDescription } from "dh-marvel/components/comicsID/cardDescription";
import { CardDetalle } from "dh-marvel/components/comicsID/cardDetalle";
import { CardImage } from "dh-marvel/components/comicsID/cardImage";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import character from "dh-marvel/test/mocks/character";
import { useEffect } from "react";

export async function getServerSideProps(req: { query: { id: any } }) {
  const { id } = req.query;
  const res = await getComic(id);
  return { props: { data: res } };
}

interface comicIDProps {
  data: Comic;
}

const ComicId: NextPage<comicIDProps> = ({ data }) => {

  if (!data) {
    return <></>;
  }
  
  localStorage.setItem("title", data.title);
  localStorage.setItem("price", String(data.price));
  localStorage.setItem("pathImage", data.thumbnail.path);
  localStorage.setItem("extensionImage", data.thumbnail.extension);

  return (
    <>
      <Box>
        <BodySingle title={data.title}>
          <Stack spacing={2} alignItems="center">
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid>
                <CardImage
                  title={data.title}
                  image={data.thumbnail.path + "." + data.thumbnail.extension}
                />
              </Grid>
              <Grid>
                <CardDetalle
                  title={data.title}
                  price={data.price}
                  oldPrice={data.oldPrice}
                  stock={data.stock}
                />
              </Grid>
            </Grid>
          </Stack>
          <Box>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardDescription
                id={character.id}
                description={data.description}
                available={data.characters.available}
                characters={
                  data.characters.available ? data.characters.items : null
                }
              />
            </Grid>
          </Box>
        </BodySingle>
      </Box>
    </>
  );
};

export default ComicId;
