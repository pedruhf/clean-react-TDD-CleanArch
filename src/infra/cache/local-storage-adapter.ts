import { GetStorage, SetStorage } from "@/data/protocols/cache";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    if (!value) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  get (key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
