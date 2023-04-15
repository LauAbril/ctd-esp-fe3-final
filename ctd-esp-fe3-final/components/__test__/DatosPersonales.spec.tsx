import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  OrderProvider,
  OrderState,
} from "../formCheckout/contexto/OrderContext";
import useOrder from "../formCheckout/contexto/useOrder";
import { DatosPersonales } from "../formCheckout/forms";
import { StepperNavigationProps } from "../formCheckout/StepperNavigation";

const mockStepperNavigationProps = jest.fn();
jest.mock("../formCheckout/StepperNavigation", () =>
  jest.fn((props: StepperNavigationProps) => {
    mockStepperNavigationProps(props);
    return (
      <div>
        StepperNavigation: {props.activeStep}
        <div>
          <button onClick={props.handleBack}>Anterior</button>
          <button onClick={props.onNextClick}>Siguiente</button>
        </div>
      </div>
    );
  })
);

jest.mock("../formCheckout/contexto/useOrder");
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>;
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
  state: {
    order: {
      customer: {
        email: "customer@example.com",  
        name: "customer",
        lastname: "test",
      },
    },
  } as OrderState,
  dispatch: mockDispatch,
});

describe("DatosPersonalesForm", () => {
  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <DatosPersonales
            activeStep={0}
            handleNext={mockHandleNext}
          />
        </OrderProvider>
      );

      userEvent.type(
        screen.getByRole("textbox", { name: "Email" }),
        "customer@example.com"
      );
      userEvent.type(screen.getByRole("textbox", { name: "LastName" }), "cust");

      userEvent.click(screen.getByRole("button", { name: "Siguiente" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
            name: "Pepe",
            lastname: "Rodriguez",
            email: "peperodriguez@gmail.com",
        },
        type: "SET_CUSTOMER",
      });
    });
  });
});