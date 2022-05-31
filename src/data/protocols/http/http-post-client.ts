export type httpPostParams = {
  url: string;
};

export interface HttpPostClient {
  url?: string;
  post (params: httpPostParams): Promise<void>;
}
