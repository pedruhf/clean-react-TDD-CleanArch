import { UnexpectedError } from "@/domain/errors";
import { mockAccount } from "@/domain/test";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from "./current-account-adapter"

jest.mock("@/infra/cache/local-storage-adapter");

describe('CurrentAccount Adapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccount();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith("account", account);
  });

  test('Should throw UnexpectedError if account is not provided', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrow(new UnexpectedError())
  });

  test('Should call LocalStorageAdapter.get with correct key', () => {
    const account = mockAccount();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, "get").mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith("account");
    expect(result).toEqual(account);
  });
});
