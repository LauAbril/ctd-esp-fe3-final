import * as yup from "yup";

export const ValidationSchemaAdressDirection = yup.object({
    address1: yup.string().required('Direccion requerida'),
    address2: yup.string().optional(),
    city: yup.string().required('Ciudad requerida'),
    state: yup.string().required('Provincia requerida'),
    zipCode: yup.string().required('Codigo postal requerido'),
}).required(); 


export type DireccionEntregaForm = {
        address1: string,
        address2: string | null,
        city: string,
        state: string,
        zipCode: string
  };

