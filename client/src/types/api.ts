

export type ApiErrorSource = {
  path: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errorSources: ApiErrorSource[];
  err?: unknown; 
  stack?: string | null;
};
