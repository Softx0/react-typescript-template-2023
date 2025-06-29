import React, {ReactNode} from "react";
import {useInactivityTimer} from "../../hooks/useInactivityTimer";
import {useAuth} from "../../context/AuthContext";
import {config} from "../../config/env";

interface InactivityWrapperProps {
  children: ReactNode;
  timeout?: number;
  enabled?: boolean;
  excludeRoutes?: string[];
}

export const InactivityWrapper: React.FC<InactivityWrapperProps> = ({
  children,
  timeout,
  enabled = config.features.enableInactivityTimer,
  excludeRoutes = ["/login"]
}) => {
  const {logout} = useAuth();
  const currentPath = window.location.pathname;

  const shouldEnableTimer = enabled && !excludeRoutes.includes(currentPath);

  const handleInactivity = () => {
    console.log("User inactive, logging out...");
    logout();
  };

  useInactivityTimer({
    onInactive: handleInactivity,
    timeout,
    enabled: shouldEnableTimer
  });

  return <>{children}</>;
};
