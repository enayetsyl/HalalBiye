export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

export type TErrorSources = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type Gender = 'Male' | 'Female' | 'Other';

/**
 * Type for the “profileData” argument
 * (all user fields except email & password)
 */
export type TProfileData = {
  name?: string;
  age?: number;
  gender?: Gender;
  religion?: string;
  location?: string;
  height?: number;
  education?: string;
  occupation?: string;
}