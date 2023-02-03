interface ErrorDetails {
  attr: string;
  detail: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      error?: ErrorDetails & { list?: ErrorDetails[] };
    };
  };
}

function getFieldErrorsListFromResponse(res?: ErrorResponse): ErrorDetails[] {
  if (res?.response?.data?.error?.attr) return [res.response.data.error];
  return res?.response?.data?.error?.list || [];
}

export function setFormFieldErrors<T extends string = string>(
  error: unknown,
  setError: (name: T, options: { message: string }) => void
) {
  getFieldErrorsListFromResponse(error as ErrorResponse).forEach(
    ({ attr, detail }) => {
      setError(attr as T, { message: detail });
    }
  );
}

export function getErrorsByField(res?: any) {
  const errorArray = getFieldErrorsListFromResponse(res);
  return errorArray.reduce((acc, { attr, detail }) => {
    acc[attr] = detail;
    return acc;
  }, {} as Record<string, string>);
}

export function getErrorMessageFromResponse(error: ErrorResponse) {
  if (error.response?.data?.error?.attr || error.response?.data?.error?.list) {
    // expected form fields to be handled individually
    return null;
  }

  return error.response?.data?.error?.detail || 'Something went wrong!';
}
