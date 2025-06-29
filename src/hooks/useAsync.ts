import {useState, useEffect, useCallback} from "react";

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAsyncReturn<T> extends UseAsyncState<T> {
  execute: () => Promise<void>;
  reset: () => void;
}

export const useAsync = <T>(asyncFunction: () => Promise<T>, immediate = true): UseAsyncReturn<T> => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: immediate,
    error: null
  });

  const execute = useCallback(async (): Promise<void> => {
    setState((prev) => ({...prev, loading: true, error: null}));

    try {
      const result = await asyncFunction();

      setState({data: result, loading: false, error: null});
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  }, [asyncFunction]);

  const reset = useCallback((): void => {
    setState({data: null, loading: false, error: null});
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {...state, execute, reset};
};
