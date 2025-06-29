import React, {createContext, useContext, useReducer, ReactNode, useEffect} from "react";
import {baseReducer, BaseState, BaseAction} from "./BaseContext";
import {User} from "../types";

interface AuthState extends BaseState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

interface AuthAction extends BaseAction {
  type: "SET_USER" | "LOGOUT" | "SET_TOKEN" | "SET_LOADING" | "SET_ERROR" | "CLEAR_ERROR";
}

interface AuthContextValue {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
  error: null
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: Boolean(action.payload),
        loading: false
      };
    case "SET_TOKEN":
      return {...state, token: action.payload};
    case "LOGOUT":
      return {
        ...initialState
      };
    default:
      return baseReducer(state, action);
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      dispatch({type: "SET_TOKEN", payload: token});
      // Aquí validarías el token con el backend
    }
  }, []);

  const login = async (email: string, _password: string): Promise<void> => {
    try {
      dispatch({type: "SET_LOADING", payload: true});

      // Simulación de login con mock
      const mockResponse = {
        user: {id: "1", email, name: "Usuario Test", role: "user"},
        token: "mock-jwt-token-encrypted"
      };

      localStorage.setItem("authToken", mockResponse.token);
      dispatch({type: "SET_TOKEN", payload: mockResponse.token});
      dispatch({type: "SET_USER", payload: mockResponse.user});
    } catch (error) {
      dispatch({type: "SET_ERROR", payload: "Error en el login"});
    }
  };

  const logout = (): void => {
    localStorage.removeItem("authToken");
    dispatch({type: "LOGOUT"});
  };

  const refreshToken = async (): Promise<void> => {
    // Implementar refresh token logic
  };

  return <AuthContext.Provider value={{state, login, logout, refreshToken}}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
