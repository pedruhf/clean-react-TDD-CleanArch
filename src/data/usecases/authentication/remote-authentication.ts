import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models/account-model";
import { UnexpectedError, InvalidCredentialsError } from "@/domain/errors";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
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
