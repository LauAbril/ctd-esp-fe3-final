import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "../StepperNavigation";
import {
  DatosPersonalesForm,
  ValidationSchemaPersonaldata,
} from "./DatosPersonales.types";
import InputText from "../InputText";
import useOrder from "../contexto/useOrder";

export type DatosPersonalesProps = {
  activeStep: number;
  handleNext: () => void;
};

const DatosPersonales: FC<DatosPersonalesProps> = ({
  activeStep,
  handleNext,
}) => {
  const { dispatch } = useOrder();

  const methods = useForm<DatosPersonalesForm>({
    resolver: yupResolver(ValidationSchemaPersonaldata),
    defaultValues: {
      name: "Pepe",
      lastname: "Rodriguez",
      email: "peperodriguez@gmail.com",
    },
  });
  const { setFocus, handleSubmit } = methods;

  const onSubmit = (data: DatosPersonalesForm) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: data,
    });

    handleNext();
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  return (
    <Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <InputText name="name" label="Name" type="text"/>
          <InputText name="lastname" label="LastName" type="text"/>
          <InputText name="email" label="Email" type="text"/>
        </FormProvider>
      </form>
      <StepperNavigation
        activeStep={activeStep}
        handleBack={() => console.log("do nothing")}
        onNextClick={handleSubmit(onSubmit)}
      />
    </Stack>
  );
};

export default DatosPersonales;
