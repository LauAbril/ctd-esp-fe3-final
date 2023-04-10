import { createContext, FC, useReducer, useMemo, Dispatch } from "react";
import { PropsWithChildren } from "react";
import { DatosPersonalesForm, DireccionEntregaForm, DatosPagoForm } from "../forms";
import { DatosPersonalesEntrega } from "../forms/customer.types";


export type Order = {
  customer: DatosPersonalesEntrega
  card: DatosPagoForm;
};

export interface OrderState {
  order: Order;
}

export interface OrderContextState {
  state: { order: Order };
  dispatch: Dispatch<OrderActionType>;
}

export const OrderContext =
  createContext<OrderContextState | undefined>(undefined);

type OrderSetCustomerType = {
  type: "SET_CUSTOMER";
  payload: DatosPersonalesForm;
};

type OrderSetCardType = {
  type: "SET_CARD";
  payload: DatosPagoForm;
};

type OrderSetAddressType = {
  type: "SET_ADDRESS";
  payload: DireccionEntregaForm;
};

type OrderActionType =
  | OrderSetCustomerType
  | OrderSetCardType
  | OrderSetAddressType;

const reducer = (state: OrderState, action: OrderActionType) => {
  switch (action.type) {
    case "SET_CUSTOMER":
      return {
        ...state,
        order: {
          ...state.order,
          customer: action.payload,
        },
      };
    case "SET_CARD":
      return {
        ...state,
        order: {
          ...state.order,
          card: action.payload,
        },
      };
    case "SET_ADDRESS":
      return {
        ...state,
        order: {
          ...state.order,
          customer:{ ...state.order.customer, address: action.payload},
        },
      };
    default:
      return state;
  }
};

const initialState: OrderState = {
  order: {
    customer: {} as DatosPersonalesEntrega,
    card: {} as DatosPagoForm,
  },
};

export const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<any>(reducer, initialState);

  const value = useMemo<any>(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
