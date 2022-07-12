import { HttpResponse } from ".";

export type httpPostParams = {
  url: string;
  body?: any;
};

export interface HttpPostClient<R = any> {
  post (params: httpPostParams): Promise<HttpResponse<R>>;
}
