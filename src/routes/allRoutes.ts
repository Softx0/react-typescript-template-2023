import {RouteGroup} from "./types/route.types";
import {authRoutes} from "./routeConfigs/authRoutes";
import {dashboardRoutes} from "./routeConfigs/dashboardRoutes";

export const routeGroups: RouteGroup[] = [
  {
    name: "authentication",
    routes: authRoutes
  },
  {
    name: "dashboard",
    routes: dashboardRoutes
  }
];

// Función para obtener todas las rutas en un array plano
export const getAllRoutes = () => routeGroups.flatMap((group) => group.routes);

// Función para obtener rutas por grupo
export const getRoutesByGroup = (groupName: string) => {
  const group = routeGroups.find((g) => g.name === groupName);

  return group ? group.routes : [];
};

// Función para buscar una ruta específica
export const findRoute = (path: string) => getAllRoutes().find((route) => route.path === path);
