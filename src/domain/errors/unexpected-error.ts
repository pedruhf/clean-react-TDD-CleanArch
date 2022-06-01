export class UnexpectedError extends Error {
  constructor () {
    super("Erro inesperado. Tente novamente em instantes");
    this.name = "UnexpectedError";
  }
}
