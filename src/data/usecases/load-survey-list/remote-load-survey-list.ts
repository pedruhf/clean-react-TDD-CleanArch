import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/usecases";
import { UnexpectedError } from "@/domain/errors";
import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async loadAll (): Promise<void> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break;
      default: throw new UnexpectedError();
    }
  }
}