import { SaveAccessToken } from "@/domain/usecases";

export class SaveAccessTokenMock implements SaveAccessToken {
  public accessToken: string;

  async save (accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}
