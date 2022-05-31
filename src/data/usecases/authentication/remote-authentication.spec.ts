import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

class HttpPostClientStub implements HttpPostClient {
  public url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClient;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpPostClientStub = new HttpPostClientStub(); 
  const sut = new RemoteAuthentication(url, httpPostClientStub);

  return {
    sut,
    httpPostClientStub,
  };
};

describe('RemoteAuthentication Usecase', () => {
  test('should call httpClient with correct URL', async () => {
    const url = "any_url";
    const { sut, httpPostClientStub } = makeSut();
    await sut.auth();
    expect(httpPostClientStub.url).toBe(url)
  });
});
