import { LoadSurveyList } from "@/domain/usecases";
import { UnexpectedError } from "@/domain/errors";
import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Model[]>,
  ) {}

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body;
      case HttpStatusCode.noContent: return [];
      default: throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model;
}
