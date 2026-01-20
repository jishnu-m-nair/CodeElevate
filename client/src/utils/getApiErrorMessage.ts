import { isAxiosError } from 'axios';

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? "Something went wrong";
  }

  if (error instanceof Error) return error.message;

  return 'Unknown error';
}
