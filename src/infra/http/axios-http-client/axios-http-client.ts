import { HttpGetParams, HttpPostClient, httpPostParams, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient implements HttpPostClient<any> {
  response: HttpResponse;

  async post(params: httpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (error) {
      axiosResponse = error.response;
    }

    this.response = {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
    return this.response;
  }
  
  async get(params: HttpGetParams): Promise<void> {
    await axios.get(params.url);
  }
}
