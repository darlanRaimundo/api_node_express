/**
 * SetTimeout assíncrono
 * @param timeout Temo em milisegundos
 * @param handler Função a executar (optional)
 */
export const asyncTimeout = (timeout: number, handler?: () => void) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (handler) handler()
      resolve(null)
    }, timeout)
  })