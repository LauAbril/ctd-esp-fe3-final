import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC } from "react";
import { PreguntasFrecuentesType } from "./preguntasFrecuentesData";
interface Props {
  data: PreguntasFrecuentesType;
}

const PreguntasFrecuentes: FC<Props> = ({ data }) => {
  return (
    <div key={data.id}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "whitesmoke" }}>
          <Typography>{data.answer}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default PreguntasFrecuentes;
