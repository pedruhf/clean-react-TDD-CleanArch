import { HttpPostClient, httpPostParams, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  response: HttpResponse<any>;

  async post(params: httpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;
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
