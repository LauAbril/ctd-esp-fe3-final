export type DatosPersonalesEntrega = {
  email: string;
  name: string;
  lastname: string;
  address: {
    address1: string;
    address2: string | null;
    city: string;
    state: string;
    zipCode: string;
  };
};
