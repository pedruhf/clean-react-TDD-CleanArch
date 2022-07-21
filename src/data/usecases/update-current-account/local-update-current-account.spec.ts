import { SetStorage } from "@/data/protocols/cache";
import { LocalUpdateCurrentAccount } from "./local-update-current-account";
import { faker } from "@faker-js/faker";
import { UnexpectedError } from "@/domain/errors";
import { mockAccount } from "@/domain/test";

class SetStorageMock implements SetStorage {
  public key: string;
  public value: string;
  set (key: string, value: any): void {
    this.key = key;
    this.value = value;
  }
}

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
};

describe('LocalUpdateCurrentAccount usecase', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccount();
    await sut.save(account);
    expect(setStorageMock.key).toBe("account");
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockImplementation(() => { throw new Error() });
    const promise = sut.save(mockAccount());
    await expect(promise).rejects.toThrow();
  });

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
