import { AuthorizeHttpGetClientDecorator } from "@/main/decorators";
import { GetStorageSpy, mockGetRequest } from "@/data/test";

describe('AuthorizeHttpGetClient Decorator', () => {
  test('Should call GetStorage with correct key', async () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    await sut.get(mockGetRequest());
    expect(getStorageSpy.key).toBe("account");
  });
});
