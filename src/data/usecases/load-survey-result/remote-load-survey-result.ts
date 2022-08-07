import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http"
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient,
  ) {}
  
  async load (): Promise<void> {
    const httpResponse = await this.HttpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break; 
      case HttpStatusCode.forbidden: throw new AccessDeniedError();
      default: throw new UnexpectedError();
    }
  }
}