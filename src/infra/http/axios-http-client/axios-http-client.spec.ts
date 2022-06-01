import { httpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: JSON.parse(faker.datatype.json()),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const mockPostRequest = (): httpPostParams<any> => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
});

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient();
  return sut;
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const sut = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  });
});
