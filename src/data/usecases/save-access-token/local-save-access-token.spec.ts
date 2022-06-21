import { SetStorage } from "@/data/protocols/cache";
import { LocalSaveAccessToken } from "./local-save-access-token";
import { faker } from "@faker-js/faker";

class SetStorageMock implements SetStorage {
  public key: string;
  public value: string;
  async set (key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
  }
}

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken usecase', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.datatype.uuid();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());
    const promise = sut.save(accessToken);
    await expect(promise).rejects.toThrow();
  });
});
