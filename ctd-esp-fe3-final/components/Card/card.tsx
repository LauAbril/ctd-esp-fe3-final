import { FC } from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

type propsComic = {
  title: string;
  image: string;
  id: number;
};
export const CardComic: FC<propsComic> = ({ title, image, id }) => {
  return (
    <Card sx={{ maxWidth: 380 }}>
      <Stack spacing={2} alignItems="center">
        <CardMedia
          component="img"
          sx={{ width: 210, objectFit: "contain" }}
          height="200"
          image={image}
          alt={title}
        />
      </Stack>
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Compra en 1 click</Button>
        <Link href={`/comics/${id}`}>
          <Button size="small">Ver Detalle</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
