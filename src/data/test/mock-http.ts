import { faker } from "@faker-js/faker";

import { HttpGetClient, HttpGetParams, httpPostParams, HttpResponse, HttpStatusCode } from "@/data/protocols/http";

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
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
