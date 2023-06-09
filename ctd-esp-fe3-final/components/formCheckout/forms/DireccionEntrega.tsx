import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import React, { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../InputText";
import {
  DireccionEntregaForm,
  ValidationSchemaAdressDirection,
} from "./DireccionEntrega.types";
import StepperNavigation from "../StepperNavigation";
import useOrder from "../contexto/useOrder";

export type DireccionEntregaProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

const DireccionEntrega: FC<DireccionEntregaProps> = ({
  activeStep,
  handleNext,
  handleBack,
}) => {
  const { dispatch } = useOrder();

  const methods = useForm<DireccionEntregaForm>({
    resolver: yupResolver(ValidationSchemaAdressDirection),
    defaultValues: {
        address1: "Moreno",
        address2: "2",
        city: "Capital Federal",
        state: "BA",
        zipCode: "1400",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: DireccionEntregaForm) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: data,
    });

    handleNext();
  };

  const submitBack = () => {
    handleBack();
  };

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <InputText label="Direccion" name="address1" type="text"/>
          <InputText label="Departamento, piso, etc." name="address2" type="text" />
          <InputText label="Ciudad" name="city" type="text"/>
          <InputText label="Provincia" name="state" type="text"/>
          <InputText label="Cod Postal" name="zipCode" type="text"/>
        </FormProvider>
      </form>

      <StepperNavigation
        activeStep={activeStep}
        onNextClick={handleSubmit(onSubmit)}
        handleBack={handleSubmit(submitBack)}
      />
    </Stack>
  );
};

export default DireccionEntrega;
