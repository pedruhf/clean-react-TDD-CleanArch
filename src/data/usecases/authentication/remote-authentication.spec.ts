import { HttpPostClient, httpPostParams } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/usecases/authentication";

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

class HttpPostClientStub implements HttpPostClient {
  public url?: string;
  body?: object;

  async post(params: httpPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
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
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientStub } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientStub.url).toBe(url)
  });

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientStub } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientStub.body).toEqual(authenticationParams);
  });
});
