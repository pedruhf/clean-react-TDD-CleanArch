import { LocalStorageAdapter } from "./local-storage-adapter";
import "jest-localstorage-mock";
import { faker } from "@faker-js/faker";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorage Adapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = JSON.parse(faker.datatype.json());
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('Should call localStorage.removeItem if value is falsy', () => {
    const sut = makeSut();
    const key = faker.database.column();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should call localStorage.getItem with correct key', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.datatype.json();
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(value);
    const obj = sut.get(key);
    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(obj).toEqual(JSON.parse(value));
  });
});
