import { Button, CardContent, Typography } from "@mui/material";
import router from "next/router";
import { FC } from "react";

type detalleComicProps = {
  title: string;
  price: number;
  oldPrice: number;
  stock: number;
  image?: string;
};

export const CardDetalle: FC<detalleComicProps> = ({
  title,
  price,
  oldPrice,
  stock,
}) => {
  const handleClick = () => {
    router.push({
      pathname: "/checkout",
    });
  };
  return (
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body1" component="div">
        Antes ${oldPrice}
      </Typography>
      <Typography variant="subtitle1" component="div">
        ${price}
      </Typography>
      {stock ? (
        <Button size="small" onClick={handleClick}>
          Comprar
        </Button>
      ) : (
        <Button size="small" disabled>
          Sin stock
        </Button>
      )}
    </CardContent>
  );
};
