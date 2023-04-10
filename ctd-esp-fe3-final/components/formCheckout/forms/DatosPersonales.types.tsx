import * as yup from "yup";

export const ValidationSchemaPersonaldata = yup.object({
    name: yup.string().required("name is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().required("Email is required").email("Email is not valid"),
}).required();

export type DatosPersonalesForm = {
    email: string,
    name: string,
    lastname: string
}