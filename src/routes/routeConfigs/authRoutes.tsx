import React from "react";
import {RouteConfig} from "../types/route.types";

// Importamos el componente de Login existente
const Login = React.lazy(() => import("../../pages/Login/Login"));

export const authRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Login />,
    isProtected: false,
    enableInactivityTimer: false,
    meta: {
      title: "Iniciar Sesión",
      description: "Página de autenticación",
      requiresAuth: false
    }
  },
  {
    path: "/login",
    element: <Login />,
    isProtected: false,
    enableInactivityTimer: false,
    meta: {
      title: "Iniciar Sesión",
      description: "Página de autenticación",
      requiresAuth: false
    }
  },
  {
    path: "*",
    element: <Login />,
    isProtected: false,
    enableInactivityTimer: false,
    meta: {
      title: "Iniciar Sesión",
      description: "Página de autenticación - Ruta no encontrada",
      requiresAuth: false
    }
  }
];
