import { faker } from "@faker-js/faker";

import { AuthorizeHttpClientDecorator } from "@/main/decorators";
import { GetStorageSpy, HttpClientSpy, mockHttpRequest } from "@/data/test";
import { HttpRequest } from "@/data/protocols/http";
import { mockAccount } from "@/domain/test";

type SutTypes = {
  sut: AuthorizeHttpClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);

  return {
    sut,
    getStorageSpy,
    httpClientSpy,
  };
};

describe('AuthorizeHttpClient Decorator', () => {
  test('Should call GetStorage with correct key', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.request(mockHttpRequest());
    expect(getStorageSpy.key).toBe("account");
  });

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
      headers: {
        field: faker.random.words(),
      },
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
    expect(httpClientSpy.headers).toEqual(httpRequest.headers);
  });

  test('Should add header to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    getStorageSpy.value = mockAccount();
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test('Should merge headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut();
    getStorageSpy.value = mockAccount();
    const headers = JSON.parse(faker.datatype.json());
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
      headers: headers,
    };
    await sut.request(httpRequest);
    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.headers).toEqual({
      ...headers,
      "x-access-token": getStorageSpy.value.accessToken,
    });
  });

  test('Should returns the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    expect(httpResponse).toEqual(httpClientSpy.response);
  });
});
