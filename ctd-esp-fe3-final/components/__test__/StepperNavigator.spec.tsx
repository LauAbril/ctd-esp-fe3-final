import { render, screen } from "@testing-library/react";
import { DatosPersonalesForm } from "../formCheckout/forms";
import StepperNavigation, { StepperNavigationProps } from "../formCheckout/StepperNavigation";


const submittedData: DatosPersonalesForm = {
  email: "test@a.com",
  lastname: "test",
  name: "test",
};

const mockFormProps = jest.fn();

const stepperProps: StepperNavigationProps = {
  activeStep: 0,
  handleBack: mockFormProps,
  onNextClick: mockFormProps,
};

describe("StepperNavigation", () => {
  describe("when rendering default form", () => {
    it("should render button siguiente", () => {
      render(<StepperNavigation {...stepperProps} />);
      const btnNext = screen.getByRole("button", {
        name: /Siguiente/i,
      });
      expect(btnNext).toBeInTheDocument();
    });
  });
});