import { faker } from "@faker-js/faker";

import { RemoteSaveSurveyResult } from "@/data/usecases";
import { HttpClientSpy, mockRemoveSurveyResult } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { mockSaveSurveyResultParams } from "@/domain/test";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteSaveSurveyResult Usecase', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoveSurveyResult(),
    }
    const saveSurveyResult = mockSaveSurveyResultParams();
    await sut.save(saveSurveyResult);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("put");
    expect(httpClientSpy.body).toEqual(saveSurveyResult);
  });

  test('Should throws AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const loadPromise = sut.save(mockSaveSurveyResultParams());
    await expect(loadPromise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throws UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const loadPromise = sut.save(mockSaveSurveyResultParams());
    await expect(loadPromise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throws UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const loadPromise = sut.save(mockSaveSurveyResultParams());
    await expect(loadPromise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a SurveyResult on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoveSurveyResult();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const httpResponse = await sut.save(mockSaveSurveyResultParams());
    expect(httpResponse).toEqual({
      question: httpResult.question,
      date: new Date(httpResult.date),
      answers: httpResult.answers,
    })
  });
});
