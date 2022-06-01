import { httpPostParams } from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient {
  async post(params: httpPostParams<any>): Promise<void> {
    await axios(params.url);
    return Promise.resolve();
  }
}
