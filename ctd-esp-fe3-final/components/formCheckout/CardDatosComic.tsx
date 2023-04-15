import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { FC } from "react";

export interface Data {
  title: string;
  image: string;
  price: number; 
}
const CardDatosComic:FC<Data> = ({image, title, price}) => {
  return (
    <Card sx={{ maxWidth: 380, marginBottom: 5, marginTop: 3 }}>
      <Stack>
        <CardMedia
          component="img"
          sx={{ width: 200, objectFit: "contain" }}
          height="200"
          image={image}
          alt={title}
        />
      </Stack>
      <CardContent>
      <Typography variant="subtitle2" color="text.primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.primary">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default CardDatosComic;
