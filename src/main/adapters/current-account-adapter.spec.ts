import { mockAccount } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { setCurrentAccountAdapter as sut} from "./current-account-adapter"

jest.mock("@/infra/cache/local-storage-adapter");

describe('CurrentAccount Adapter', () => {
  test('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccount();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    sut(account);
    expect(setSpy).toHaveBeenCalledWith("account", account);
  });
});
