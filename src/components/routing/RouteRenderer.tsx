import React from "react";
import {Route} from "react-router-dom";
import {RouteConfig} from "../../routes/types/route.types";
import {ProtectedRoute} from "./ProtectedRoute";
import {InactivityWrapper} from "./InactivityWrapper";

interface RouteRendererProps {
  route: RouteConfig;
}

export const RouteRenderer: React.FC<RouteRendererProps> = ({route}) => {
  const {path, element, isProtected = false, requiredRole, inactivityTimeout, enableInactivityTimer = true} = route;

  // Wrapper para inactividad específica de la ruta
  const ElementWithInactivity = () => (
    <InactivityWrapper timeout={inactivityTimeout} enabled={enableInactivityTimer} excludeRoutes={!enableInactivityTimer ? [path] : []}>
      {element}
    </InactivityWrapper>
  );

  // Si la ruta está protegida, usar ProtectedRoute
  if (isProtected) {
    return (
      <Route
        key={path}
        path={path}
        element={
          <ProtectedRoute requiredRole={requiredRole}>
            <ElementWithInactivity />
          </ProtectedRoute>
        }
      />
    );
  }

  // Ruta pública
  return <Route key={path} path={path} element={<ElementWithInactivity />} />;
};
