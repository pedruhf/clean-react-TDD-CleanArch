import { faker } from "@faker-js/faker";

import { AddAccount } from "@/domain/usecases";

export const mockAccount = (): AddAccount.Model => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
});

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};