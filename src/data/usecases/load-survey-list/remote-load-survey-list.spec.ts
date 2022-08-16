import { faker } from "@faker-js/faker";

import { RemoteLoadSurveyList } from "./remote-load-survey-list";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";
import { HttpClientSpy, mockRemoteSurveyList } from "@/data/test";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Model[]>();
  const sut = new RemoteLoadSurveyList(url, httpClientSpy);
  
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyList Usecase', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe("get");
  });

  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    }
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of SurveyModels if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteSurveyList();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([
      {
        id: httpResult[0].id,
        question: httpResult[0].question,
        date: new Date(httpResult[0].date),
        didAnswer: httpResult[0].didAnswer,
      },
      {
        id: httpResult[1].id,
        question: httpResult[1].question,
        date: new Date(httpResult[1].date),
        didAnswer: httpResult[1].didAnswer,
      },
      {
        id: httpResult[2].id,
        question: httpResult[2].question,
        date: new Date(httpResult[2].date),
        didAnswer: httpResult[2].didAnswer,
      },
    ]);
  });

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }
    const surveyList = await sut.loadAll();
    expect(surveyList).toEqual([]);
  });
});
