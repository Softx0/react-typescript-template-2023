import {useEffect, useRef, useCallback} from "react";
import {config} from "../config/env";

interface UseInactivityTimerOptions {
  onInactive: () => void;
  timeout?: number;
  enabled?: boolean;
  events?: string[];
}

export const useInactivityTimer = ({
  onInactive,
  timeout = config.features.defaultInactivityTime,
  enabled = true,
  events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
}: UseInactivityTimerOptions) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (enabled) {
      timeoutRef.current = setTimeout(() => {
        onInactive();
      }, timeout);
    }
  }, [onInactive, timeout, enabled]);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      return;
    }

    // Iniciar el timer
    resetTimer();

    // Agregar event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      // Limpiar timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Remover event listeners
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [enabled, handleActivity, resetTimer, events]);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {resetTimer, clearTimer};
};
