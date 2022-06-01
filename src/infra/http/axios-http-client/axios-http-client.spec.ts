import { AxiosHttpClient } from "./axois-http-client";
import { faker } from "@faker-js/faker";
import axios from "axios";
import { httpPostParams } from "@/data/protocols/http";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockPostRequest = (): httpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
});

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient();
  return sut;
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb post', async () => {
    const sut = makeSut();
    const request = mockPostRequest();
    await sut.post({ url: request.url });
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
