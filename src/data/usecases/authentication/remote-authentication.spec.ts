import { AccountModel } from "@/domain/models/account-model";
import { AuthenticationParams } from "@/domain/usecases";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";
import { HttpResponse, HttpStatusCode, HttpPostClient, httpPostParams } from "@/data/protocols/http";
import { RemoteAuthentication } from "./remote-authentication";
import { faker } from "@faker-js/faker";

const mockAccount = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});

const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

class HttpPostClientSpy<R> implements HttpPostClient<R> {
  public url?: string;
  public body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: httpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientStub: HttpPostClientSpy<AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientStub = new HttpPostClientSpy<AccountModel>(); 
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

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientStub } = makeSut();
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError())
  });

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientStub } = makeSut();
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError())
  });

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientStub } = makeSut();
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new UnexpectedError())
  });

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientStub } = makeSut();
    const httpResult = mockAccount();
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpResult)
  });
});
