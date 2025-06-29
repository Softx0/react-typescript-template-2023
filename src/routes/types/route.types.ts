import {ReactElement} from "react";

export interface RouteConfig {
  path: string;
  element: ReactElement;
  isProtected?: boolean;
  requiredRole?: string;
  inactivityTimeout?: number;
  enableInactivityTimer?: boolean;
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
  };
}

export interface RouteGroup {
  name: string;
  routes: RouteConfig[];
}
