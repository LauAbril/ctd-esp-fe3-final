import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DetalleCompra } from "dh-marvel/components/cardConfirmacionCompra/DetalleCompra";
import CardDatosComic from "dh-marvel/components/formCheckout/CardDatosComic";
import useOrder from "dh-marvel/components/formCheckout/contexto/useOrder";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { NextPage } from "next";
'use client'
const OrdenConfirmada: NextPage = () => {
  
  const { state } = useOrder();
  const data = state.order;

  if (typeof window !== 'undefined') {
  let title = localStorage.getItem("title");
  let price = localStorage.getItem("price");
  let path = localStorage.getItem("pathImage");
  let extension = localStorage.getItem("extensionImage");
  let image = path + "." + extension;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{ backgroundColor: "green", width: "100%", textAlign: "center" }}
        variant="h5"
        color="white"
      >
        ¡Que disfrutes tu compra!
      </Typography>
      <Stack spacing={2} alignItems="center">
        <CardDatosComic
          title={String(title)}
          image={String(image)}
          price={Number(price)}
        />
      </Stack>
      <Stack spacing={2} alignItems="center" >
        <DetalleCompra
          name={data.customer.name}
          lastname={data.customer.lastname}
          email={data.customer.email}
          address1={data.customer.address.address1}
          city={data.customer.address.city}
          state={data.customer.address.state}
        />
      </Stack>
    </Box>
  );
}
else{
  return <></>
}
};
(OrdenConfirmada as any).Layout = LayoutCheckout;
export default OrdenConfirmada;