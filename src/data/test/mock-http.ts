import { faker } from "@faker-js/faker";

import { HttpGetClient, HttpGetParams, httpPostParams, HttpResponse, HttpStatusCode } from "@/data/protocols/http";

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    return this.response;
  }
}

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: JSON.parse(faker.datatype.json()),
});

export const mockPostRequest = (): httpPostParams => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
});
