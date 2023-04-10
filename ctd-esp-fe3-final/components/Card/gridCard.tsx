import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { CardComic } from "./card";
import { Comic } from "../../features/card.type";

interface props {
  comics: Comic[];
}

export const GridCard: FC<props> = ({ comics }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {comics.map((comic, index) => (
          <Grid2 xs={12} sm={4} md={4} key={index}>
            <CardComic
              title={comic.title}
              image={comic.thumbnail.path + "." + comic.thumbnail.extension}
              id={comic.id}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
