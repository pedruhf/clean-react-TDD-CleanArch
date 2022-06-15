export class InvalidFieldError extends Error {
  constructor (protected readonly fieldName: string) {
    super(`O campo ${fieldName} está invalido`);
    this.name = "InvalidFieldError";
  }
}
