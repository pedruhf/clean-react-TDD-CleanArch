import { Authentication } from "@/domain/usecases";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<RemoteAuthentication.Model>
  ) {}

  async auth (params: Authentication.Params): Promise<RemoteAuthentication.Model> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body;
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError();
      default: case HttpStatusCode.badRequest: throw new UnexpectedError();
    }
  }
}

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}