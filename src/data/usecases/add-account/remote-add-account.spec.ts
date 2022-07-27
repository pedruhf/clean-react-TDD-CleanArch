import { faker } from "@faker-js/faker";

import { RemoteAddAccount } from "./remote-add-account";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import { HttpPostClient, httpPostParams, HttpResponse, HttpStatusCode } from "@/data/protocols/http";
import { mockAddAccountParams } from "@/domain/test";

class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };
  async post(params: httpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return this.response;
  }
}

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<RemoteAddAccount.Model>
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount usecase', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toBe(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new EmailInUseError())
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should return an AddAccount.Model if HttpPostClient on success', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const accountModel = await sut.add(mockAddAccountParams());
    expect(accountModel).toEqual(httpPostClientSpy.response.body);
  });
});
