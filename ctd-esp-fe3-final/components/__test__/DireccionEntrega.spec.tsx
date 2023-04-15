import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  OrderProvider,
  OrderState,
} from "../formCheckout/contexto/OrderContext";
import useOrder from "../formCheckout/contexto/useOrder";
import { DireccionEntrega } from "../formCheckout/forms";
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
        address: {
          address1: "Moreno",
          state: "BA",
          city: "Capital Federal",
          address2: "2",
          zipCode: "1400",
        },
      },
    },
  } as OrderState,
  dispatch: mockDispatch,
});

describe("DireccionEntregaForm", () => {
  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <DireccionEntrega
            activeStep={0}
            handleNext={mockHandleNext}
            handleBack={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </OrderProvider>
      );

      userEvent.type(
        screen.getByRole("textbox", { name: "Direccion" }),
        "Moreno 1458"
      );
      userEvent.type(screen.getByRole("textbox", { name: "Ciudad" }), "Capital Federal");

      userEvent.click(screen.getByRole("button", { name: "Siguiente" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          address1: "Moreno",
          state: "BA",
          city: "Capital Federal",
          address2: "2",
          zipCode: "1400",
        },
        type: "SET_ADDRESS",
      });
    });
  });
});
