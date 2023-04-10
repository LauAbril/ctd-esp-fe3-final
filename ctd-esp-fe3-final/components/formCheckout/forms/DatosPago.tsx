import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Snackbar, Stack } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../InputText";
import { DatosPagoForm, ValidationSchemaData } from "./DatosPago.types";
import StepperNavigation from "../StepperNavigation";
import useOrder from "../contexto/useOrder";
import { validCard } from "dh-marvel/pages/api/checkout.route";
import router from "next/router";

export type DatosPagoProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

const DatosPago: FC<DatosPagoProps> = ({ activeStep, handleBack, handleNext }) => {
  const { dispatch, state } = useOrder();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false);
  };

  const methods = useForm<DatosPagoForm>({
    resolver: yupResolver(ValidationSchemaData),
    defaultValues: {
      nameOnCard: "Visa",
      number: validCard,
      expDate: "25/07",
      cvc: "789",
    },
  });

  const { setFocus, handleSubmit } = methods;

  const submitBack = () => {
    handleBack();
  };

  const postApiCheckout = async (post: any) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const data = await response.json();
    if (!data.error) {
      router.push({
        pathname: "/confirmacion-compra",
      });
    } else {
      setOpen(true);
      setMessage(data.message);
    }
  };

  const onSubmit = (data: DatosPagoForm) => {
    dispatch({
      type: "SET_CARD",
      payload: data,
    });
    postApiCheckout({ ...state.order, card: data });
  };

  useEffect(() => {
    setFocus("nameOnCard");
  }, []);

  return (
    <Stack>
      <form>
        <FormProvider {...methods}>
          <InputText label="Nombre Tarjeta" name="nameOnCard" />
          <InputText label="Numero de Tarjeta" name="number" />
          <InputText label="exp MM/YY" name="expDate" />
          <InputText label="CVV" name="cvc" />
        </FormProvider>
      </form>

      <StepperNavigation
        activeStep={activeStep}
        handleBack={handleSubmit(submitBack)}
        onNextClick={handleSubmit(onSubmit)}
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default DatosPago;
