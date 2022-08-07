import { faker } from "@faker-js/faker";

import { HttpGetClientSpy } from "@/data/test";
import { RemoteLoadSurveyResult } from "@/data/usecases";

describe('RemoteLoadSurveyResult Usecase', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const url = faker.internet.url();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
