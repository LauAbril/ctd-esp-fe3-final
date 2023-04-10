import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatosPagoProps } from "../formCheckout/forms/DatosPago";
import { DatosPersonalesProps } from "../formCheckout/forms/DatosPersonales";
import { DireccionEntregaProps } from "../formCheckout/forms/DireccionEntrega";
import StepperForm from "../formCheckout/StepperForm";

const submittedData = {
  email: "test@a.com",
  lastname: "test",
  name: "test",
};

const mockDatosPersonalesForm = jest.fn();
jest.mock("../formCheckout/forms/DatosPersonales", () =>
  jest.fn((props: DatosPersonalesProps) => {
    mockDatosPersonalesForm(props);
    return (
      <div onClick={() => props.handleNext(/*submittedData*/)}>
        DatosPersonales
      </div>
    );
  })
);

const submittedDataAdress = {
  adress1: "test@a.com",
  city: "test",
  state: "test",
};

const mockDireccionEntregaForm = jest.fn();
jest.mock("../formCheckout/forms/DireccionEntrega", () =>
  jest.fn((props: DireccionEntregaProps) => {
    mockDireccionEntregaForm(props);
    return (
      <div onClick={() => props.handleNext(/*submittedDataAdress*/)}>
        DireccionEntrega
      </div>
    );
  })
);

const submittedDataPayout = {
  number: "test@a.com",
  cvc: "test",
  nameOnCard: "test",
  expDate1: "test",
};

const mockDatosPagoForm = jest.fn();
jest.mock("../formCheckout/forms/DatosPago", () =>
  jest.fn((props: DatosPagoProps) => {
    mockDatosPagoForm(props);
    return (
      <div onClick={() => props.handleNext(/*submittedDataPayout*/)}>
        DatosPago
      </div>
    );
  })
);

describe("StepperForm", () => {
  describe("when rendering default form", () => {
    it("should render the step 0 with DatosPersonalesForm", () => {
      render(<StepperForm />);
      const form = screen.getByText("DatosPersonales");
      expect(form).toBeInTheDocument();

      expect(mockDatosPersonalesForm).toBeCalledWith(
        expect.objectContaining({ activeStep: 0 })
      );
    });
  });
  describe("when submitting datos personales form", () => {
    it("should not render DatosPersonalesForm", async () => {
      render(<StepperForm />);
      const form = screen.getByText("DatosPersonales");
      await userEvent.click(form);
      expect(screen.queryByText("DatosPersonales")).not.toBeInTheDocument();
    });
    describe("when submitting direccion entrega form", () => {
      it("should not render DatosPersonales neither DireccionEntrega", async () => {
        render(<StepperForm />);
        const datospersonalesform = screen.getByText("DatosPersonales");
        await userEvent.click(datospersonalesform);

        const direccionentregaform = screen.getByText("DireccionEntrega");
        await userEvent.click(direccionentregaform);

        const datosPagoForm = screen.getByText("DatosPago");
        expect(datosPagoForm).toBeInTheDocument();

        expect(screen.queryByText("DatosPersonales")).not.toBeInTheDocument();
        expect(screen.queryByText("DireccionEntrega")).not.toBeInTheDocument();
      });
    });
  });
});
