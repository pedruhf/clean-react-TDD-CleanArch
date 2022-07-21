import { AccountModel } from "@/domain/models";
import { faker } from "@faker-js/faker";

export const mockAccount = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName(),
});
