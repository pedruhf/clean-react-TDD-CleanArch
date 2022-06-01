import { HttpPostClient, httpPostParams, HttpResponse } from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  response: HttpResponse<any>;

  async post(params: httpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    this.response = {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };

    return this.response;
  }
}
