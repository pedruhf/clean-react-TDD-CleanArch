import { faker } from "@faker-js/faker";

import { HttpGetClientSpy, mockRemoveSurveyResult } from "@/data/test";
import { RemoteLoadSurveyResult } from "@/data/usecases";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);

  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyResult Usecase', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoveSurveyResult(),
    }
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throws AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const loadPromise = sut.load();
    await expect(loadPromise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throws UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const loadPromise = sut.load();
    await expect(loadPromise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throws UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const loadPromise = sut.load();
    await expect(loadPromise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a SurveyResult on 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockRemoveSurveyResult();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const httpResponse = await sut.load();
    expect(httpResponse).toEqual({
      question: httpResult.question,
      date: new Date(httpResult.date),
      answers: httpResult.answers,
    })
  });
});
