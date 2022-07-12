import { HttpPostClient, httpPostParams, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<any> {
  response: HttpResponse;

  async post(params: httpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }

    this.response = {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
    return this.response;
  }
}
