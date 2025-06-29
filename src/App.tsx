import React, {Suspense} from "react";
import {Provider} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import {ProtectedRoute} from "./components/routing/ProtectedRoute";
import {InactivityWrapper} from "./components/routing/InactivityWrapper";
import {getAllRoutes} from "./routes/allRoutes";
import store from "./redux/store";
import "./index.css";

// Componente interno para usar hooks de router
const AppContent: React.FC = () => {
  const allRoutes = getAllRoutes();

  return (
    <div className="App">
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }>
        <Routes>
          {allRoutes.map((route) => {
            const {path, element, isProtected = false, requiredRole, inactivityTimeout, enableInactivityTimer = true} = route;

            // Wrapper para inactividad específica de la ruta
            const ElementWithInactivity = (
              <InactivityWrapper timeout={inactivityTimeout} enabled={enableInactivityTimer} excludeRoutes={!enableInactivityTimer ? [path] : []}>
                {element}
              </InactivityWrapper>
            );

            // Si la ruta está protegida, usar ProtectedRoute
            if (isProtected) {
              return <Route key={path} path={path} element={<ProtectedRoute requiredRole={requiredRole}>{ElementWithInactivity}</ProtectedRoute>} />;
            }

            // Ruta pública
            return <Route key={path} path={path} element={ElementWithInactivity} />;
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

const App: React.FC = () => (
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

export default App;
