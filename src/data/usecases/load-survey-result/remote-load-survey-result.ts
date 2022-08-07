import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http"
import { AccessDeniedError } from "@/domain/errors";

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient,
  ) {}
  
  async load (): Promise<void> {
    const httpResponse = await this.HttpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break; 
      default: throw new AccessDeniedError();
    }
  }
}