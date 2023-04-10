import { NextPage } from "next";
import { Character } from "dh-marvel/features/characters.type";
import { CardCharacter } from "dh-marvel/components/characterCard/Card";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Stack } from "@mui/material";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";

export async function getServerSideProps(req: { query: { id: any } }) {
    const { id } = req.query;
    const character = await getCharacter(id);
    return { props: { character: character } };
  }
  
export interface Props {
  character: Character;
  id: number;
}

const Characters: NextPage<Props> = ({ character }) => {
  return (
    <>
      <BodySingle title={character.name}>
      <Stack spacing={2} alignItems="center">
        <Grid2>
        <CardCharacter
          name={character.name}
          image={character.thumbnail.path + "." + character.thumbnail.extension}
          description={character.description}
        />
        </Grid2>
        </Stack>
      </BodySingle>
    </>
  );
};
export default Characters;
