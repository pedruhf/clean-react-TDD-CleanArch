import { faker } from "@faker-js/faker";

import { RemoteSaveSurveyResult } from "@/data/usecases";
import { HttpClientSpy, mockRemoveSurveyResult } from "@/data/test";
import { HttpStatusCode } from "@/data/protocols/http";
import { mockSaveSurveyResultParams } from "@/domain/test";

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
});
