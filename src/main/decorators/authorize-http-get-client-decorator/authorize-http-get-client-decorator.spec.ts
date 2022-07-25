import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { GetStorageSpy, mockGetRequest } from "@/data/test";

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);

  return {
    sut,
    getStorageSpy,
  };
};

describe('AuthorizeHttpGetClient Decorator', () => {
  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });
});
