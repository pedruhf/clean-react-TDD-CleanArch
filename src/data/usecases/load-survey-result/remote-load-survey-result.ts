import { HttpGetClient } from "@/data/protocols/http"

export class RemoteLoadSurveyResult {
  constructor (
    private readonly url: string,
    private readonly HttpGetClient: HttpGetClient,
  ) {}
  
  async load (): Promise<void> {
    await this.HttpGetClient.get({ url: this.url });
  }
}