import { CardMedia } from "@mui/material";
import { FC } from "react";

type imageComicProps = {
  title: string;
  image: string;
};

export const CardImage: FC<imageComicProps> = ({ title, image }) => {
  return <CardMedia component="img"  height="194" image={image} alt={title} />;
};
