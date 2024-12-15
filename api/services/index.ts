/**
 * SetTimeout assíncrono
 * @param timeout Temo em milisegundos
 * @param handler Função a executar (optional)
 */
export const asyncTimeout = (timeout: number, handler?: () => void) => {
  new Promise((resolve) => {
    setTimeout(() => {
      if (handler) handler();
      resolve(null);
    }, timeout);
  });
};

export const returnErrorMessage = (error: unknown): string => {
  let errorMessage = "";
  if (typeof error === "string") {
    errorMessage = error.toUpperCase();
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
};
