import { FC } from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Stack, Typography } from "@mui/material";

type propsCharacter = {
  name: string;
  image: string;
  description: string;
};
export const CardCharacter: FC<propsCharacter> = ({
  name,
  image,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 380, textAlign:'center'}}>
      <Stack spacing={2} alignItems="center">
        <CardMedia
          component="img"
          sx={{ width: 210, objectFit: "contain" }}
          height="200"
          image={image}
          alt={name}
        />
      </Stack>
      <CardContent>
        <Typography  variant="subtitle1" color="text.primary">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.primary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
