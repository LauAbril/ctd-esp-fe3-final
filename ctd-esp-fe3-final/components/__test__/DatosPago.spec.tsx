import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  OrderProvider,
  OrderState,
} from "../formCheckout/contexto/OrderContext";
import useOrder from "../formCheckout/contexto/useOrder";
import { DatosPago } from "../formCheckout/forms";
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
          <button onClick={props.onNextClick}>Comprar</button>
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
      card: {
        nameOnCard: "Visa",
          number: "4242424242424242",
          expDate: "25/07",
          cvc: "789",
      },
    },
  } as OrderState,
  dispatch: mockDispatch,
});

describe("DatosPagoForm", () => {
  describe("when rendering submitting form", () => {
    it("should hit the dispatch", async () => {
      const mockHandleNext = jest.fn();
      render(
        <OrderProvider>
          <DatosPago
            activeStep={0}
            handleNext={mockHandleNext}
            handleBack={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </OrderProvider>
      );

      userEvent.type(screen.getByRole("textbox", { name: "CVV" }), "345");
      userEvent.type(
        screen.getByRole("textbox", { name: "exp MM/YY" }),
        "11/23"
      );

      userEvent.click(screen.getByRole("button", { name: "Comprar" }));

      await waitFor(() => {
        expect(mockHandleNext).toBeCalled();
      });
      expect(mockDispatch).toBeCalledWith({
        payload: {
          nameOnCard: "Visa",
          number: "4242424242424242",
          expDate: "25/07",
          cvc: "789",
        },
        type: "SET_CARD",
      });
    });
  });
});
