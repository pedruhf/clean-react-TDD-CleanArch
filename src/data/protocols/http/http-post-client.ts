export type httpPostParams = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  url?: string;
  body?: object;

  post (params: httpPostParams): Promise<void>;
}
