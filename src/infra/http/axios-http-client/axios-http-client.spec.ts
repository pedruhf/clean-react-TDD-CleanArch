import { AxiosHttpClient } from "./axois-http-client";
import { faker } from "@faker-js/faker";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient();
  return sut;
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const sut = makeSut();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
