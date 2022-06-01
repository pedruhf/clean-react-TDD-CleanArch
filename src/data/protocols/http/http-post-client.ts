import { HttpResponse } from ".";

export type httpPostParams<T> = {
  url: string;
  body?: T;
};

export interface HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R>;

  post (params: httpPostParams<T>): Promise<HttpResponse<R>>;
}
