import { faker } from "@faker-js/faker";

import { RemoteAddAccount } from "./remote-add-account";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
import {  HttpStatusCode } from "@/data/protocols/http";
import { mockAddAccountParams } from "@/domain/test";
import { HttpClientSpy } from "@/data/test";

type SutTypes = {
  sut: RemoteAddAccount;
  httpClientSpy: HttpClientSpy<RemoteAddAccount.Model>
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAddAccount.Model>()
  const sut = new RemoteAddAccount(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteAddAccount usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("post");
    expect(httpClientSpy.body).toBe(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new EmailInUseError())
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const addPromise = sut.add(mockAddAccountParams());
    await expect(addPromise).rejects.toThrow(new UnexpectedError())
  });

  test('Should return an AddAccount.Model if HttpClient on success', async () => {
    const { sut, httpClientSpy } = makeSut();
    const accountModel = await sut.add(mockAddAccountParams());
    expect(accountModel).toEqual(httpClientSpy.response.body);
  });
});
