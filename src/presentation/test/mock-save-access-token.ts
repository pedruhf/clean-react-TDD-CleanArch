import { AccountModel } from "@/domain/models";
import { UpdateCurrentAccount } from "@/domain/usecases";

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  public account: AccountModel;

  async save (account: AccountModel): Promise<void> {
    this.account = account;
  }
}
