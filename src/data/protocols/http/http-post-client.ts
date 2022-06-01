import { HttpResponse } from "./http-response";

export type httpPostParams = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse;

  post (params: httpPostParams): Promise<HttpResponse>;
}
