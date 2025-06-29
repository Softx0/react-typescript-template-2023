import React from "react";
import {RouteConfig} from "../types/route.types";

// Lazy loading para páginas del dashboard
const Dashboard = React.lazy(() => import("../../pages/Dashboard/Dashboard"));

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true,
    inactivityTimeout: 300000, // 5 minutos
    meta: {
      title: "Dashboard Principal",
      description: "Panel principal de la aplicación",
      requiresAuth: true
    }
  }
];
