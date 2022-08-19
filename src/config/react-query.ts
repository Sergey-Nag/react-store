export const RQ_CONFIG = {
  defaultOptions: {
    queries: {
      suspense: false,
      enabled: true,
      retry: 0,
      staleTime: 1000,
      cacheTime: 1000,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: true,
      useErrorBoundary: false
    }
  }
};

export const RQ_KEY = {
  LOGIN_USER: 'LOGIN_USER',
};