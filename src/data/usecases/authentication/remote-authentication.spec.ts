import { AuthenticationParams } from "@/domain/usecases/authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { HttpResponse, HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpPostClient, httpPostParams } from "@/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

class HttpPostClientStub implements HttpPostClient {
  public url?: string;
  body?: object;
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent,
  };

  async post(params: httpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
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

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientStub } = makeSut();
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError())
  });
});
