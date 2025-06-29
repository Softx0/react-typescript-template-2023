import React, {createContext, useContext} from "react";

export interface BaseState {
  loading: boolean;
  error: string | null;
}

export interface BaseAction {
  type: string;
  payload?: any;
}

export interface BaseContextValue<T extends BaseState> {
  state: T;
  dispatch: React.Dispatch<BaseAction>;
}

export const createAppContext = <T extends BaseState>() => {
  const Context = createContext<BaseContextValue<T> | undefined>(undefined);

  const useAppContext = (): BaseContextValue<T> => {
    const context = useContext(Context);

    if (!context) {
      throw new Error("useAppContext must be used within a Provider");
    }

    return context;
  };

  return {Context, useAppContext};
};

export const baseReducer = <T extends BaseState>(state: T, action: BaseAction): T => {
  switch (action.type) {
    case "SET_LOADING":
      return {...state, loading: action.payload};
    case "SET_ERROR":
      return {...state, error: action.payload, loading: false};
    case "CLEAR_ERROR":
      return {...state, error: null};
    default:
      return state;
  }
};
