import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";

type comicIDProps = {
  description: string;
  characters: any;
  available: number;
  id: number;
};

export const CardDescription: FC<comicIDProps> = ({
  description,
  characters,
  available,
}) => {
  const traerId = (url: string) => {
    const splitUrl = url.split("/");
    return splitUrl[splitUrl.length - 1];
  };

  return (
    <>
      <Accordion sx={{ width: "100%", flexShrink: 0, marginTop: 5}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Descripción</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "whitesmoke" }}>
          {description ? (
            <Typography>{description}</Typography>
          ) : (
            <Typography>Sin descripcion disponible</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      {available ? (
        <Accordion sx={{ width: "100%", flexShrink: 0, marginTop: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Personajes</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "whitesmoke" }}>
            {characters.map((item: any, index:any) => {
              return (
                <Link key={index} href={`/personajes/${traerId(item.resourceURI)}`}>
                  {item.name}
                </Link>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ) : null}
    </>
  );
};
