import { Box, Stack } from "@mui/material";
import StepperForm from "dh-marvel/components/formCheckout/StepperForm";
import CardDatosComic from "dh-marvel/components/formCheckout/CardDatosComic";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { NextPage } from "next";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useEffect } from "react";
import router from "next/router";

const CheckoutPage: NextPage = () => {


  let title = localStorage.getItem("title");
  let price = localStorage.getItem("price");
  let path = localStorage.getItem("pathImage");
  let extension = localStorage.getItem("extensionImage");
  let image = path + "." + extension;

 if(!title){
  return <></>
 }

  useEffect(() =>{
    if(!title){
      router.push("./")
    }
  },[title])

  return (
    <BodySingle title={`Checkout: ${title}`}>
      <Box sx={{ width: "100%" }}>
        <Stack direction="row" spacing={8}>
            <StepperForm/>
          <CardDatosComic
            title={String(title)}
            image={String(image)}
            price={Number(price)}
          />
        </Stack>
      </Box>
    </BodySingle>
  );
}
(CheckoutPage as any).Layout = LayoutCheckout;

export default CheckoutPage;
