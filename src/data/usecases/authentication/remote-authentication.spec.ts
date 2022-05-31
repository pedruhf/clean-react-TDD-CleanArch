import { HttpPostClient } from "../../protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

class HttpPostClientStub implements HttpPostClient {
  public url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}

describe('RemoteAuthentication Usecase', () => {
  test('should call httpClient with correct URL', async () => {
    const httpPostClientStub = new HttpPostClientStub(); 
    const url = "any_url";
    const sut = new RemoteAuthentication(url, httpPostClientStub);
    await sut.auth();
    expect(httpPostClientStub.url).toBe(url)
  });
});
