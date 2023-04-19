import * as yup from "yup";

export const ValidationSchemaData = yup.object({
    nameOnCard: yup.string().required('Nombre requerido'),
    number: yup.string().required('Numero requerido'),
    expDate: yup.string().required('Fecha de expiración requerida'),
    cvc: yup.string().required('CVC requerido'),
}).required(); 

export type DatosPagoForm = {
    number: string,
    cvc: string,
    expDate: string,
    nameOnCard: string
  };