import { AccountModel } from "@/domain/models";
import { AddAccountParams } from "@/domain/usecases";
import { HttpPostClient, httpPostParams, HttpResponse } from "@/data/protocols/http";
import { RemoteAddAccount } from "./remote-add-account";
import { faker } from "@faker-js/faker";

const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

class HttpPostClientSpy implements HttpPostClient<AddAccountParams, AccountModel> {
  url?: string;
  body?: AddAccountParams;
  response: HttpResponse<AccountModel>;
  async post(params: httpPostParams<AddAccountParams>): Promise<HttpResponse<AccountModel>> {
    this.url = params.url;
    return;
  }
}

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClient<AddAccountParams, AccountModel>
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount usecase', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });
});
