import { render, screen } from "@testing-library/react";
import InputText from "dh-marvel/components/formCheckout/InputText";
import { FC, PropsWithChildren, ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function renderWithReactHookForm(
  ui: ReactElement,
  { defaultValues = {} } = {}
) {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    const methods = useForm({ defaultValues });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
  };
}

describe("ControlledTextInput", () => {
  describe("when rendering default", () => {
    it("should render a textbox", () => {
      renderWithReactHookForm(<InputText name="name" label="name" />);
      const textbox = screen.getByRole("textbox", { name: "name" });
      expect(textbox).toBeInTheDocument();
      expect(textbox).toHaveValue("");
    });
    it("should render the default value", () => {
      renderWithReactHookForm(<InputText name="name" label="name" />, {
        defaultValues: { name: "TestUser" },
      });
      const textbox = screen.getByRole("textbox", { name: "name" });
      expect(textbox).toHaveValue("TestUser");
    });
  });
});
