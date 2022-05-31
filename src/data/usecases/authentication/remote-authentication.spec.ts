import { HttpPostClient, httpPostParams } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";

class HttpPostClientStub implements HttpPostClient {
  public url?: string;
  async post(params: httpPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub(); 
  const sut = new RemoteAuthentication(url, httpPostClientStub);

  return {
    sut,
    httpPostClientStub,
  };
};

describe('RemoteAuthentication Usecase', () => {
  test('should call httpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);
    await sut.auth();
    expect(httpPostClientStub.url).toBe(url)
  });

  test('should call httpPostClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);
    await sut.auth();
    expect(httpPostClientStub.url).toBe(url)
  });
});
